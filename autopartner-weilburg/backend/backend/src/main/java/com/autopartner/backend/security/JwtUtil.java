package com.autopartner.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

/**
 * Utility class for JWT token generation using JJWT.
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

    @ConfigProperty(name = "jwt.secret")
    String secret;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Generate a JWT token for a user.
     * 
     * @param username the username
     * @param role the user role
     * @return the generated JWT token
     */
    public String generateToken(String username, String role) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + (duration * 1000));

        return Jwts.builder()
                .subject(username)
                .claim("upn", username)
                .claim("groups", List.of(role))
                .issuer(issuer)
                .issuedAt(now)
                .expiration(expiration)
                .signWith(getSigningKey())
                .compact();
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
        Date now = new Date();
        Date expiration = new Date(now.getTime() + (durationInSeconds * 1000));

        return Jwts.builder()
                .subject(username)
                .claim("upn", username)
                .claim("groups", List.of(role))
                .issuer(issuer)
                .issuedAt(now)
                .expiration(expiration)
                .signWith(getSigningKey())
                .compact();
    }
}

