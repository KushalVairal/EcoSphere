package com.ecosphere.domain.repository;

import com.ecosphere.domain.model.Country;
import java.util.List;
import java.util.Optional;

public interface CountryRepository {
    List<Country> findAll();
    Optional<Country> findByIsoCode(String isoCode);
    Country save(Country country);
}
