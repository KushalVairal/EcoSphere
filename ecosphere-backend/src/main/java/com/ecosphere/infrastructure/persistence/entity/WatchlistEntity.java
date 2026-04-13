package com.ecosphere.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "watchlist", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "iso_code"})
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WatchlistEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "iso_code", nullable = false, length = 3)
    private String isoCode;

    @Column(name = "added_at", nullable = false)
    private Instant addedAt;
}
