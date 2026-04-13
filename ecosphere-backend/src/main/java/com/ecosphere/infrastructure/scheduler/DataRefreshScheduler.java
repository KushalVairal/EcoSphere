package com.ecosphere.infrastructure.scheduler;

import com.ecosphere.application.port.ExternalDataPort;
import com.ecosphere.domain.model.SustainabilityMetric;
import com.ecosphere.domain.repository.MetricRepository;
import com.ecosphere.infrastructure.persistence.jpa.JpaMetricRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataRefreshScheduler {

    private final ExternalDataPort   externalDataPort;
    private final MetricRepository   metricRepository;
    private final JpaMetricRepository jpaMetricRepository;

    /**
     * Runs once per day at 02:00 UTC (configurable via scheduler.cron).
     * Fetches the latest World Bank data and saves any new year rows.
     */
    @Scheduled(cron = "${scheduler.cron}")
    public void refreshMetrics() {
        log.info("Starting scheduled data refresh from World Bank API");
        try {
            List<SustainabilityMetric> fresh = externalDataPort.fetchLatestMetrics();
            int saved = 0;
            for (SustainabilityMetric m : fresh) {
                if (m.getYear() == null || m.getIsoCode() == null) continue;
                // Only insert if we don't already have this year's data
                boolean exists = jpaMetricRepository
                        .existsByIsoCodeAndYear(m.getIsoCode(), m.getYear());
                if (!exists) {
                    metricRepository.save(m);
                    saved++;
                }
            }
            log.info("Data refresh complete — {} new metric rows saved", saved);
        } catch (Exception e) {
            log.error("Data refresh failed", e);
        }
    }
}
