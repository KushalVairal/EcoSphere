package com.ecosphere;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EcoSphereApplication {
    public static void main(String[] args) {
        SpringApplication.run(EcoSphereApplication.class, args);
    }
}
