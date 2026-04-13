package com.ecosphere.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SustainabilityMetric {
    private Long id;
    private String isoCode;
    private Integer year;
    private Double co2Emissions;           // tonnes per capita
    private Double renewablePercentage;    // % of total energy
    private Double forestArea;             // % of land area
    private Long   population;
    private Double gdpPerCapita;           // USD
}
