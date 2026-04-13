package com.ecosphere.infrastructure.persistence.jpa;

import com.ecosphere.infrastructure.persistence.entity.CountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface JpaCountryRepository extends JpaRepository<CountryEntity, Long> {
    Optional<CountryEntity> findByIsoCode(String isoCode);
    boolean existsByIsoCode(String isoCode);
}
