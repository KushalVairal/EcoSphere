package com.ecosphere.infrastructure.web;

import com.ecosphere.application.dto.CountryMetricDto;
import com.ecosphere.application.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
@RequiredArgsConstructor
public class CountryController {

    private final CountryService countryService;

    /** Returns all countries with their latest sustainability metrics. */
    @GetMapping
    public ResponseEntity<List<CountryMetricDto>> getAllCountries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }

    /**
     * Returns a single country with its latest metrics.
     * isoCode is case-insensitive — "usa", "USA", "Usa" all work.
     */
    @GetMapping("/{isoCode}/metrics")
    public ResponseEntity<CountryMetricDto> getCountryMetrics(
            @PathVariable String isoCode) {
        return ResponseEntity.ok(countryService.getCountryMetrics(isoCode));
    }
}
