package com.ecosphere.infrastructure.config;

import com.ecosphere.domain.model.Country;
import com.ecosphere.domain.model.SustainabilityMetric;
import com.ecosphere.domain.repository.CountryRepository;
import com.ecosphere.infrastructure.persistence.jpa.JpaCountryRepository;
import com.ecosphere.infrastructure.persistence.jpa.JpaMetricRepository;
import com.ecosphere.domain.repository.MetricRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Runs once on startup.
 * Seeds the 15 countries and their baseline metrics so the frontend works
 * immediately, even before the first World Bank scheduler run.
 *
 * Values match frontend/src/mockData.js exactly — no frontend changes needed.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final JpaCountryRepository jpaCountryRepo;
    private final JpaMetricRepository  jpaMetricRepo;
    private final CountryRepository    countryRepository;
    private final MetricRepository     metricRepository;

    @Override
    public void run(String... args) {
        if (jpaCountryRepo.count() > 0) {
            log.info("DataSeeder: data already present, skipping.");
            return;
        }
        log.info("DataSeeder: seeding countries and baseline metrics…");
        seedCountries();
        seedMetrics();
        log.info("DataSeeder: done.");
    }

    private void seedCountries() {
        List<Country> countries = List.of(
            c("USA","United States",    37.09, -95.71),
            c("CHN","China",            35.86, 104.19),
            c("IND","India",            20.59,  78.96),
            c("DEU","Germany",          51.16,  10.45),
            c("BRA","Brazil",          -14.24, -51.93),
            c("NOR","Norway",           60.47,   8.47),
            c("AUS","Australia",       -25.27, 133.77),
            c("RUS","Russia",           61.52, 105.31),
            c("CAN","Canada",           56.13,-106.34),
            c("JPN","Japan",            36.20, 138.25),
            c("GBR","United Kingdom",   55.37,  -3.43),
            c("FRA","France",           46.22,   2.21),
            c("ZAF","South Africa",    -30.55,  22.93),
            c("NZL","New Zealand",     -40.90, 174.88),
            c("SWE","Sweden",           60.12,  18.64)
        );
        countries.forEach(countryRepository::save);
    }

    private void seedMetrics() {
        List<SustainabilityMetric> metrics = List.of(
            m("USA", 14.44, 21.0, 33.9, 331_000_000L, 63530.0),
            m("CHN",  7.38, 29.0, 23.0,1_412_000_000L,12556.0),
            m("IND",  1.89, 38.0, 24.3,1_393_000_000L, 2277.0),
            m("DEU",  7.72, 46.0, 32.7,  83_200_000L, 50794.0),
            m("BRA",  2.25, 83.0, 59.4, 214_000_000L,  7519.0),
            m("NOR",  7.02, 98.0, 33.2,   5_400_000L, 89090.0),
            m("AUS", 15.22, 29.0, 17.4,  25_690_000L, 55060.0),
            m("RUS", 11.44, 20.0, 49.8, 144_100_000L, 12195.0),
            m("CAN", 14.33, 67.0, 38.2,  38_010_000L, 52051.0),
            m("JPN",  8.73, 21.0, 68.5, 125_700_000L, 40113.0),
            m("GBR",  5.31, 43.0, 13.1,  67_220_000L, 46344.0),
            m("FRA",  4.56, 24.0, 31.4,  67_390_000L, 44995.0),
            m("ZAF",  8.17, 14.0,  7.6,  59_310_000L,  6001.0),
            m("NZL",  6.55, 84.0, 38.4,   5_084_000L, 44061.0),
            m("SWE",  3.69, 65.0, 68.7,  10_350_000L, 56217.0)
        );
        metrics.forEach(metricRepository::save);
    }

    private Country c(String iso, String name, double lat, double lon) {
        return Country.builder().isoCode(iso).name(name).lat(lat).lon(lon).build();
    }

    private SustainabilityMetric m(String iso,
                                   double co2, double renewable,
                                   double forest, long pop, double gdp) {
        return SustainabilityMetric.builder()
                .isoCode(iso).year(2022)
                .co2Emissions(co2)
                .renewablePercentage(renewable)
                .forestArea(forest)
                .population(pop)
                .gdpPerCapita(gdp)
                .build();
    }
}
