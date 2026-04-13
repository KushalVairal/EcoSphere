package com.ecosphere.application.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

public class WatchlistDtos {

    @Data
    public static class AddRequest {
        @NotBlank
        private String isoCode;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WatchlistResponse {
        private List<String> isoCodes;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WatchlistItemDto {
        private String isoCode;
        private Instant addedAt;
    }
}
