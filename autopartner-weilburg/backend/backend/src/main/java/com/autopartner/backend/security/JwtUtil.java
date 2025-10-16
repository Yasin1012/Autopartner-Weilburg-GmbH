package com.autopartner.backend.security;

import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.util.Arrays;
import java.util.HashSet;

/**
 * Utility class for JWT token generation.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@ApplicationScoped
public class JwtUtil {

    @ConfigProperty(name = "jwt.duration", defaultValue = "86400")
    Long duration;

    @ConfigProperty(name = "jwt.issuer", defaultValue = "https://autopartner-weilburg.de")
    String issuer;

    /**
     * Generate a JWT token for a user.
     * 
     * @param username the username
     * @param role the user role
     * @return the generated JWT token
     */
    public String generateToken(String username, String role) {
        return Jwt.issuer(issuer)
                .upn(username)
                .groups(new HashSet<>(Arrays.asList(role)))
                .expiresIn(duration)
                .sign();
    }

    /**
     * Generate a JWT token with custom duration.
     * 
     * @param username the username
     * @param role the user role
     * @param durationInSeconds custom duration in seconds
     * @return the generated JWT token
     */
    public String generateToken(String username, String role, long durationInSeconds) {
        return Jwt.issuer(issuer)
                .upn(username)
                .groups(new HashSet<>(Arrays.asList(role)))
                .expiresIn(durationInSeconds)
                .sign();
    }
}

