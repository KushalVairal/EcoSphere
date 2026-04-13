package com.ecosphere.application.service;

import com.ecosphere.application.dto.CountryMetricDto;
import com.ecosphere.domain.exception.CountryNotFoundException;
import com.ecosphere.domain.model.Country;
import com.ecosphere.domain.model.SustainabilityMetric;
import com.ecosphere.domain.repository.CountryRepository;
import com.ecosphere.domain.repository.MetricRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CountryService {

    private final CountryRepository countryRepository;
    private final MetricRepository  metricRepository;

    /** Returns all countries merged with their latest metric. */
    public List<CountryMetricDto> getAllCountries() {
        return countryRepository.findAll().stream()
                .map(c -> merge(c, metricRepository.findLatestByIsoCode(c.getIsoCode()).orElse(null)))
                .toList();
    }

    /** Returns one country + its latest metric, or throws CountryNotFoundException. */
    public CountryMetricDto getCountryMetrics(String isoCode) {
        Country country = countryRepository.findByIsoCode(isoCode.toUpperCase())
                .orElseThrow(() -> new CountryNotFoundException(isoCode));
        SustainabilityMetric metric = metricRepository.findLatestByIsoCode(country.getIsoCode())
                .orElse(null);
        return merge(country, metric);
    }

    private CountryMetricDto merge(Country c, SustainabilityMetric m) {
        return CountryMetricDto.builder()
                .id(c.getId())
                .isoCode(c.getIsoCode())
                .name(c.getName())
                .lat(c.getLat())
                .lon(c.getLon())
                // metric fields default to null/0 when no data yet
                .co2Emissions(m != null ? m.getCo2Emissions() : null)
                .renewablePercentage(m != null ? m.getRenewablePercentage() : null)
                .forestArea(m != null ? m.getForestArea() : null)
                .population(m != null ? m.getPopulation() : null)
                .gdpPerCapita(m != null ? m.getGdpPerCapita() : null)
                .build();
    }
}
