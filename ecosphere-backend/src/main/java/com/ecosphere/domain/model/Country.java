package com.ecosphere.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Country {
    private Long id;
    private String isoCode;   // e.g. "USA"
    private String name;
    private Double lat;
    private Double lon;
}
