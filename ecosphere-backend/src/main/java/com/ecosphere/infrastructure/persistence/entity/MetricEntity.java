package com.ecosphere.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "metrics")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MetricEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "iso_code", nullable = false, length = 3)
    private String isoCode;

    @Column(name = "`year`", nullable = false)   // ← YAHAN BACKTICKS ADD KARO
    private Integer year;

    @Column(name = "co2_emissions")
    private Double co2Emissions;

    @Column(name = "renewable_percentage")
    private Double renewablePercentage;

    @Column(name = "forest_area")
    private Double forestArea;

    @Column(name = "population")
    private Long population;

    @Column(name = "gdp_per_capita")
    private Double gdpPerCapita;
}
