package com.ecosphere.infrastructure.external;

import com.ecosphere.application.port.ExternalDataPort;
import com.ecosphere.infrastructure.external.dto.WbIndicatorResponse;
import com.ecosphere.domain.model.SustainabilityMetric;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
public class WorldBankApiClient implements ExternalDataPort {

    // World Bank indicator codes
    private static final String CO2         = "EN.ATM.CO2E.PC";   // CO2 per capita (t)
    private static final String RENEWABLE   = "EG.FEC.RNEW.ZS";   // Renewable energy %
    private static final String FOREST      = "AG.LND.FRST.ZS";   // Forest area %
    private static final String POPULATION  = "SP.POP.TOTL";       // Total population
    private static final String GDP_CAPITA  = "NY.GDP.PCAP.CD";    // GDP per capita (USD)

    // The 15 countries we support — must match isoCode seeds in DataSeeder
    private static final List<String> SUPPORTED_ISO3 = List.of(
        "USA","CHN","IND","DEU","BRA","NOR","AUS","RUS","CAN","JPN",
        "GBR","FRA","ZAF","NZL","SWE"
    );

    private final RestTemplate restTemplate;
    private final String baseUrl;

    public WorldBankApiClient(
            @Value("${worldbank.api.base-url}") String baseUrl) {
        this.restTemplate = new RestTemplate();
        this.baseUrl = baseUrl;
    }

    @Override
    public List<SustainabilityMetric> fetchLatestMetrics() {
        log.info("Fetching latest sustainability metrics from World Bank API");

        Map<String, Double> co2Map    = fetchIndicator(CO2);
        Map<String, Double> renMap    = fetchIndicator(RENEWABLE);
        Map<String, Double> forMap    = fetchIndicator(FOREST);
        Map<String, Double> popMap    = fetchIndicator(POPULATION);
        Map<String, Double> gdpMap    = fetchIndicator(GDP_CAPITA);

        int year = Calendar.getInstance().get(Calendar.YEAR) - 2; // WB data is ~2yr behind

        return SUPPORTED_ISO3.stream()
                .map(iso -> SustainabilityMetric.builder()
                        .isoCode(iso)
                        .year(year)
                        .co2Emissions(co2Map.get(iso))
                        .renewablePercentage(renMap.get(iso))
                        .forestArea(forMap.get(iso))
                        .population(popMap.containsKey(iso) ? popMap.get(iso).longValue() : null)
                        .gdpPerCapita(gdpMap.get(iso))
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public SustainabilityMetric fetchMetricsForCountry(String isoCode) {
        // For a single country, we still call the bulk fetch and filter
        // (WB doesn't make single-country single-indicator cheaper to call)
        return fetchLatestMetrics().stream()
                .filter(m -> m.getIsoCode().equalsIgnoreCase(isoCode))
                .findFirst()
                .orElse(null);
    }

    /**
     * Fetches one indicator for all supported countries.
     * Returns a map of ISO3 code → latest non-null value.
     */
    private Map<String, Double> fetchIndicator(String indicator) {
        String isoList = String.join(";", SUPPORTED_ISO3);
        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl)
                .pathSegment("country", isoList, "indicator", indicator)
                .queryParam("format", "json")
                .queryParam("per_page", "100")
                .queryParam("mrv", "5")   // most recent 5 years — gives us a non-null fallback
                .build()
                .toUriString();

        try {
            ResponseEntity<List<Object>> resp = restTemplate.exchange(
                    url, HttpMethod.GET, null,
                    new ParameterizedTypeReference<>() {}
            );

            if (resp.getBody() == null || resp.getBody().size() < 2) {
                log.warn("Unexpected response structure for indicator {}", indicator);
                return Map.of();
            }

            // Element [1] is the array of data points
            Object rawData = resp.getBody().get(1);
            if (!(rawData instanceof List<?> dataList)) {
                return Map.of();
            }

            // Walk data points and keep the most recent non-null value per country
            Map<String, Double> result = new HashMap<>();
            com.fasterxml.jackson.databind.ObjectMapper om = new com.fasterxml.jackson.databind.ObjectMapper();

            for (Object item : dataList) {
                try {
                    WbIndicatorResponse.DataPoint dp =
                            om.convertValue(item, WbIndicatorResponse.DataPoint.class);
                    if (dp.getValue() == null) continue;
                    String iso = dp.getCountryIso3Code();
                    if (iso == null || iso.isBlank()) continue;
                    // Only store if we haven't seen a more recent value yet
                    result.putIfAbsent(iso.toUpperCase(), dp.getValue());
                } catch (Exception e) {
                    log.debug("Skipping unparseable data point: {}", e.getMessage());
                }
            }
            log.debug("Fetched indicator {} — {} values", indicator, result.size());
            return result;

        } catch (RestClientException e) {
            log.error("World Bank API call failed for indicator {}: {}", indicator, e.getMessage());
            return Map.of();
        }
    }
}
