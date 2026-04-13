package com.ecosphere.infrastructure.persistence.jpa;

import com.ecosphere.infrastructure.persistence.entity.MetricEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JpaMetricRepository extends JpaRepository<MetricEntity, Long> {

    /** Latest metric row for a single country (highest year). */
    @Query("SELECT m FROM MetricEntity m WHERE m.isoCode = :isoCode ORDER BY m.year DESC")
    List<MetricEntity> findTopByIsoCode(@Param("isoCode") String isoCode, Pageable pageable);

    default Optional<MetricEntity> findLatestByIsoCode(String isoCode) {
        List<MetricEntity> results = findTopByIsoCode(isoCode,
                org.springframework.data.domain.PageRequest.of(0, 1));
        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
    }

    /** One latest row per country — used for the country list endpoint. */
    @Query("""
        SELECT m FROM MetricEntity m
        WHERE m.year = (
            SELECT MAX(m2.year) FROM MetricEntity m2 WHERE m2.isoCode = m.isoCode
        )
    """)
    List<MetricEntity> findAllLatest();

    boolean existsByIsoCodeAndYear(String isoCode, int year);
}
