package com.ecosphere.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The shape returned for both GET /api/countries and GET /api/countries/{isoCode}/metrics.
 * Field names intentionally match the frontend's mockData.js so zero changes needed there.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CountryMetricDto {
    private Long   id;
    private String isoCode;
    private String name;
    private Double lat;
    private Double lon;
    private Double co2Emissions;
    private Double renewablePercentage;
    private Double forestArea;
    private Long   population;
    private Double gdpPerCapita;
}
