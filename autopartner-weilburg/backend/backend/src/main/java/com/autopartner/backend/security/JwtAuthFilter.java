package com.autopartner.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.Priority;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.ext.Provider;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.List;

/**
 * JWT Authentication Filter using JJWT.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@Provider
@Priority(Priorities.AUTHENTICATION)
@ApplicationScoped
public class JwtAuthFilter implements ContainerRequestFilter {

    @ConfigProperty(name = "jwt.secret")
    String secret;

    @ConfigProperty(name = "jwt.issuer")
    String issuer;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        String path = requestContext.getUriInfo().getPath();
        
        // Skip authentication for public endpoints
        if (path.contains("/auth/") || 
            path.contains("/openapi") || 
            path.contains("/swagger") ||
            path.contains("/q/")) {
            return;
        }

        String authHeader = requestContext.getHeaderString("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // Allow unauthenticated access - let @RolesAllowed handle it
            return;
        }

        try {
            String token = authHeader.substring(7);
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .requireIssuer(issuer)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            final String username = claims.get("upn", String.class);
            @SuppressWarnings("unchecked")
            final List<String> groups = claims.get("groups", List.class);

            SecurityContext securityContext = new SecurityContext() {
                @Override
                public Principal getUserPrincipal() {
                    return new Principal() {
                        @Override
                        public String getName() {
                            return username;
                        }
                    };
                }

                @Override
                public boolean isUserInRole(String role) {
                    return groups != null && groups.contains(role);
                }

                @Override
                public boolean isSecure() {
                    return "https".equals(requestContext.getUriInfo().getRequestUri().getScheme());
                }

                @Override
                public String getAuthenticationScheme() {
                    return "Bearer";
                }
            };

            requestContext.setSecurityContext(securityContext);
        } catch (Exception e) {
            // Invalid token - but don't abort, let the endpoint decide
            System.err.println("JWT validation failed: " + e.getMessage());
        }
    }
}

