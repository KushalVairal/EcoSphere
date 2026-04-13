package com.ecosphere.application.port;

import com.ecosphere.domain.model.SustainabilityMetric;
import java.util.List;

/**
 * Port (interface) for fetching sustainability data from an external provider.
 * The application layer depends only on this interface — not on the World Bank
 * client implementation in the infrastructure layer.
 */
public interface ExternalDataPort {
    /**
     * Fetch the latest sustainability metrics for all supported countries.
     * Returns whatever the external provider has; callers should handle empty lists gracefully.
     */
    List<SustainabilityMetric> fetchLatestMetrics();

    /**
     * Fetch metrics for a single country by ISO-3 code.
     */
    SustainabilityMetric fetchMetricsForCountry(String isoCode);
}
