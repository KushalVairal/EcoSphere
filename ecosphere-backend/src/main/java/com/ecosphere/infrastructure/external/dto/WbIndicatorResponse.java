package com.ecosphere.infrastructure.external.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

/**
 * The World Bank API returns a 2-element JSON array:
 *   [ { "page": 1, "total": 50, ... },  [ { "country": {...}, "value": 1.23, ... }, ... ] ]
 *
 * We model both elements and pick [1] for the data rows.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class WbIndicatorResponse {

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CountryRef {
        private String id;
        private String value;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DataPoint {
        private CountryRef country;
        @JsonProperty("countryiso3code")
        private String countryIso3Code;
        private String date;          // "2022" or "2022Q1"
        private Double value;         // null when World Bank has no data
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PageInfo {
        private int page;
        private int pages;
        private int total;
        @JsonProperty("per_page")
        private String perPage;
    }
}
