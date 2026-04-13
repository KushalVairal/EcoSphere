package com.ecosphere.application.service;

import com.ecosphere.application.dto.AuthDtos;
import com.ecosphere.domain.exception.UserAlreadyExistsException;
import com.ecosphere.domain.model.User;
import com.ecosphere.domain.repository.UserRepository;
import com.ecosphere.infrastructure.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthDtos.AuthResponse register(AuthDtos.RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new UserAlreadyExistsException("Username", req.getUsername());
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new UserAlreadyExistsException("Email", req.getEmail());
        }

        User user = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .build();

        User saved = userRepository.save(user);
        log.info("New user registered: {}", saved.getUsername());

        String token = jwtTokenProvider.generateToken(saved.getUsername());
        return buildResponse(token, saved);
    }

    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest req) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
        );

        User user = userRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new IllegalStateException("User disappeared after authentication"));

        String token = jwtTokenProvider.generateToken(auth.getName());
        log.info("User logged in: {}", req.getUsername());
        return buildResponse(token, user);
    }

    private AuthDtos.AuthResponse buildResponse(String token, User user) {
        AuthDtos.UserDto userDto = new AuthDtos.UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        return new AuthDtos.AuthResponse(token, userDto);
    }
}
