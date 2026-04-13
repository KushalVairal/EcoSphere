package com.ecosphere.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

public class AuthDtos {

    @Data
    public static class LoginRequest {
        @NotBlank
        private String username;
        @NotBlank
        private String password;
    }

    @Data
    public static class RegisterRequest {
        @NotBlank
        @Size(min = 3, max = 30)
        private String username;

        @NotBlank
        private String email;

        @NotBlank
        @Size(min = 6)
        private String password;
    }

    @Data
    public static class UserDto {
        private Long id;
        private String username;
        private String email;
    }

    @Data
    public static class AuthResponse {
        private String token;
        private UserDto user;

        public AuthResponse(String token, UserDto user) {
            this.token = token;
            this.user = user;
        }
    }
}
