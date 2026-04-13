package com.ecosphere.application.service;

import com.ecosphere.domain.model.User;
import com.ecosphere.domain.model.WatchlistItem;
import com.ecosphere.domain.repository.UserRepository;
import com.ecosphere.domain.repository.WatchlistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final UserRepository      userRepository;

    /** Returns the list of ISO codes on the user's watchlist. */
    public List<String> getWatchlist(String username) {
        Long userId = resolveUserId(username);
        return watchlistRepository.findByUserId(userId).stream()
                .map(WatchlistItem::getIsoCode)
                .toList();
    }

    /** Adds a country to the watchlist (idempotent — no error if already present). */
    public void add(String username, String isoCode) {
        Long userId = resolveUserId(username);
        boolean alreadyPresent = watchlistRepository
                .findByUserIdAndIsoCode(userId, isoCode.toUpperCase())
                .isPresent();
        if (!alreadyPresent) {
            watchlistRepository.save(WatchlistItem.builder()
                    .userId(userId)
                    .isoCode(isoCode.toUpperCase())
                    .addedAt(Instant.now())
                    .build());
            log.debug("Added {} to watchlist for {}", isoCode, username);
        }
    }

    /** Removes a country from the watchlist (silent no-op if not present). */
    public void remove(String username, String isoCode) {
        Long userId = resolveUserId(username);
        watchlistRepository.findByUserIdAndIsoCode(userId, isoCode.toUpperCase())
                .ifPresent(item -> {
                    watchlistRepository.delete(item);
                    log.debug("Removed {} from watchlist for {}", isoCode, username);
                });
    }

    private Long resolveUserId(String username) {
        return userRepository.findByUsername(username)
                .map(User::getId)
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found: " + username));
    }
}
