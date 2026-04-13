package com.ecosphere.domain.repository;

import com.ecosphere.domain.model.SustainabilityMetric;
import java.util.List;
import java.util.Optional;

public interface MetricRepository {
    Optional<SustainabilityMetric> findLatestByIsoCode(String isoCode);
    List<SustainabilityMetric> findAllLatest();
    SustainabilityMetric save(SustainabilityMetric metric);
}
