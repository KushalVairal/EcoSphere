package com.ecosphere.infrastructure.persistence;

import com.ecosphere.domain.model.*;
import com.ecosphere.domain.repository.*;
import com.ecosphere.infrastructure.persistence.jpa.*;
import com.ecosphere.infrastructure.persistence.mapper.EntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@RequiredArgsConstructor
class CountryRepositoryAdapter implements CountryRepository {
    private final JpaCountryRepository jpa;
    private final EntityMapper mapper;

    @Override public List<Country> findAll() {
        return jpa.findAll().stream().map(mapper::toDomain).toList();
    }
    @Override public Optional<Country> findByIsoCode(String iso) {
        return jpa.findByIsoCode(iso).map(mapper::toDomain);
    }
    @Override public Country save(Country c) {
        return mapper.toDomain(jpa.save(mapper.toEntity(c)));
    }
}

@Repository
@RequiredArgsConstructor
class MetricRepositoryAdapter implements MetricRepository {
    private final JpaMetricRepository jpa;
    private final EntityMapper mapper;

    @Override public Optional<SustainabilityMetric> findLatestByIsoCode(String iso) {
        return jpa.findLatestByIsoCode(iso).map(mapper::toDomain);
    }
    @Override public List<SustainabilityMetric> findAllLatest() {
        return jpa.findAllLatest().stream().map(mapper::toDomain).toList();
    }
    @Override public SustainabilityMetric save(SustainabilityMetric m) {
        return mapper.toDomain(jpa.save(mapper.toEntity(m)));
    }
}

@Repository
@RequiredArgsConstructor
class UserRepositoryAdapter implements UserRepository {
    private final JpaUserRepository jpa;
    private final EntityMapper mapper;

    @Override public Optional<User> findByUsername(String u) {
        return jpa.findByUsername(u).map(mapper::toDomain);
    }
    @Override public Optional<User> findByEmail(String e) {
        return jpa.findByEmail(e).map(mapper::toDomain);
    }
    @Override public boolean existsByUsername(String u) { return jpa.existsByUsername(u); }
    @Override public boolean existsByEmail(String e)    { return jpa.existsByEmail(e); }
    @Override public User save(User u) {
        return mapper.toDomain(jpa.save(mapper.toEntity(u)));
    }
}

@Repository
@RequiredArgsConstructor
class WatchlistRepositoryAdapter implements WatchlistRepository {
    private final JpaWatchlistRepository jpa;
    private final EntityMapper mapper;

    @Override public List<WatchlistItem> findByUserId(Long uid) {
        return jpa.findByUserId(uid).stream().map(mapper::toDomain).toList();
    }
    @Override public Optional<WatchlistItem> findByUserIdAndIsoCode(Long uid, String iso) {
        return jpa.findByUserIdAndIsoCode(uid, iso).map(mapper::toDomain);
    }
    @Override public WatchlistItem save(WatchlistItem w) {
        return mapper.toDomain(jpa.save(mapper.toEntity(w)));
    }
    @Override public void delete(WatchlistItem w) {
        jpa.deleteById(w.getId());
    }
}
