package com.ecosphere;

import com.ecosphere.application.dto.AuthDtos;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class EcoSphereIntegrationTest {

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper om;

    @Test
    void healthEndpointReturnsUp() throws Exception {
        mvc.perform(get("/api/health"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.status").value("UP"));
    }

    @Test
    void registerAndLoginFlow() throws Exception {
        // Register
        AuthDtos.RegisterRequest reg = new AuthDtos.RegisterRequest();
        reg.setUsername("testuser");
        reg.setEmail("test@ecosphere.app");
        reg.setPassword("password123");

        MvcResult regResult = mvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(om.writeValueAsString(reg)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.token").isNotEmpty())
            .andExpect(jsonPath("$.user.username").value("testuser"))
            .andReturn();

        // Login with same credentials
        AuthDtos.LoginRequest login = new AuthDtos.LoginRequest();
        login.setUsername("testuser");
        login.setPassword("password123");

        mvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(om.writeValueAsString(login)))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    void countriesEndpointReturnsSeededData() throws Exception {
        mvc.perform(get("/api/countries"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$").isArray())
           .andExpect(jsonPath("$[0].isoCode").isNotEmpty())
           .andExpect(jsonPath("$[0].co2Emissions").isNumber());
    }

    @Test
    void countryMetricsEndpointReturnsCorrectCountry() throws Exception {
        mvc.perform(get("/api/countries/USA/metrics"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.isoCode").value("USA"))
           .andExpect(jsonPath("$.name").value("United States"))
           .andExpect(jsonPath("$.co2Emissions").value(14.44));
    }

    @Test
    void watchlistRequiresAuthentication() throws Exception {
        mvc.perform(get("/api/users/me/watchlist"))
           .andExpect(status().isUnauthorized());
    }

    @Test
    void unknownCountryReturns404() throws Exception {
        mvc.perform(get("/api/countries/XYZ/metrics"))
           .andExpect(status().isNotFound())
           .andExpect(jsonPath("$.error").isNotEmpty());
    }
}
