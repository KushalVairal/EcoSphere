package com.ecosphere.domain.repository;

import com.ecosphere.domain.model.WatchlistItem;
import java.util.List;
import java.util.Optional;

public interface WatchlistRepository {
    List<WatchlistItem> findByUserId(Long userId);
    Optional<WatchlistItem> findByUserIdAndIsoCode(Long userId, String isoCode);
    WatchlistItem save(WatchlistItem item);
    void delete(WatchlistItem item);
}
