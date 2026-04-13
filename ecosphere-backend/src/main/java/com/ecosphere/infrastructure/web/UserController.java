package com.ecosphere.infrastructure.web;

import com.ecosphere.application.dto.WatchlistDtos;
import com.ecosphere.application.service.WatchlistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users/me")
@RequiredArgsConstructor
public class UserController {

    private final WatchlistService watchlistService;

    /** GET /api/users/me/watchlist — returns list of ISO codes */
    @GetMapping("/watchlist")
    public ResponseEntity<List<String>> getWatchlist(
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(watchlistService.getWatchlist(principal.getUsername()));
    }

    /** POST /api/users/me/watchlist — body: { "isoCode": "DEU" } */
    @PostMapping("/watchlist")
    public ResponseEntity<Map<String, Boolean>> addToWatchlist(
            @AuthenticationPrincipal UserDetails principal,
            @Valid @RequestBody WatchlistDtos.AddRequest request) {
        watchlistService.add(principal.getUsername(), request.getIsoCode());
        return ResponseEntity.ok(Map.of("success", true));
    }

    /** DELETE /api/users/me/watchlist/{isoCode} */
    @DeleteMapping("/watchlist/{isoCode}")
    public ResponseEntity<Void> removeFromWatchlist(
            @AuthenticationPrincipal UserDetails principal,
            @PathVariable String isoCode) {
        watchlistService.remove(principal.getUsername(), isoCode);
        return ResponseEntity.noContent().build();
    }
}
