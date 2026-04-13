package com.ecosphere.infrastructure.persistence.jpa;

import com.ecosphere.infrastructure.persistence.entity.WatchlistEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface JpaWatchlistRepository extends JpaRepository<WatchlistEntity, Long> {
    List<WatchlistEntity> findByUserId(Long userId);
    Optional<WatchlistEntity> findByUserIdAndIsoCode(Long userId, String isoCode);
}
