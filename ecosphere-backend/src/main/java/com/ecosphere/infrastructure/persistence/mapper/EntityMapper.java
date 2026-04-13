package com.ecosphere.infrastructure.persistence.mapper;

import com.ecosphere.domain.model.*;
import com.ecosphere.infrastructure.persistence.entity.*;
import org.springframework.stereotype.Component;

@Component
public class EntityMapper {

    // ── Country ──────────────────────────────────────────────────────────────

    public Country toDomain(CountryEntity e) {
        if (e == null) return null;
        return Country.builder()
                .id(e.getId())
                .isoCode(e.getIsoCode())
                .name(e.getName())
                .lat(e.getLat())
                .lon(e.getLon())
                .build();
    }

    public CountryEntity toEntity(Country d) {
        return CountryEntity.builder()
                .id(d.getId())
                .isoCode(d.getIsoCode())
                .name(d.getName())
                .lat(d.getLat())
                .lon(d.getLon())
                .build();
    }

    // ── Metric ───────────────────────────────────────────────────────────────

    public SustainabilityMetric toDomain(MetricEntity e) {
        if (e == null) return null;
        return SustainabilityMetric.builder()
                .id(e.getId())
                .isoCode(e.getIsoCode())
                .year(e.getYear())
                .co2Emissions(e.getCo2Emissions())
                .renewablePercentage(e.getRenewablePercentage())
                .forestArea(e.getForestArea())
                .population(e.getPopulation())
                .gdpPerCapita(e.getGdpPerCapita())
                .build();
    }

    public MetricEntity toEntity(SustainabilityMetric d) {
        return MetricEntity.builder()
                .id(d.getId())
                .isoCode(d.getIsoCode())
                .year(d.getYear())
                .co2Emissions(d.getCo2Emissions())
                .renewablePercentage(d.getRenewablePercentage())
                .forestArea(d.getForestArea())
                .population(d.getPopulation())
                .gdpPerCapita(d.getGdpPerCapita())
                .build();
    }

    // ── User ─────────────────────────────────────────────────────────────────

    public User toDomain(UserEntity e) {
        if (e == null) return null;
        return User.builder()
                .id(e.getId())
                .username(e.getUsername())
                .email(e.getEmail())
                .passwordHash(e.getPasswordHash())
                .build();
    }

    public UserEntity toEntity(User d) {
        return UserEntity.builder()
                .id(d.getId())
                .username(d.getUsername())
                .email(d.getEmail())
                .passwordHash(d.getPasswordHash())
                .build();
    }

    // ── Watchlist ─────────────────────────────────────────────────────────────

    public WatchlistItem toDomain(WatchlistEntity e) {
        if (e == null) return null;
        return WatchlistItem.builder()
                .id(e.getId())
                .userId(e.getUserId())
                .isoCode(e.getIsoCode())
                .addedAt(e.getAddedAt())
                .build();
    }

    public WatchlistEntity toEntity(WatchlistItem d) {
        return WatchlistEntity.builder()
                .id(d.getId())
                .userId(d.getUserId())
                .isoCode(d.getIsoCode())
                .addedAt(d.getAddedAt())
                .build();
    }
}
