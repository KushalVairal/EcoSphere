package com.ecosphere.infrastructure.security;

import com.ecosphere.infrastructure.persistence.jpa.JpaUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final JpaUserRepository jpaUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return jpaUserRepository.findByUsername(username)
                .map(entity -> new User(
                        entity.getUsername(),
                        entity.getPasswordHash(),
                        List.of()   // No roles for now — extend with GrantedAuthority if needed
                ))
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}
