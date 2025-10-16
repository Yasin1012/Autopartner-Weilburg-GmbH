package com.autopartner.backend.config;

import jakarta.ws.rs.core.Application;
import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.enums.SecuritySchemeType;
import org.eclipse.microprofile.openapi.annotations.info.Contact;
import org.eclipse.microprofile.openapi.annotations.info.Info;
import org.eclipse.microprofile.openapi.annotations.security.SecurityScheme;
import org.eclipse.microprofile.openapi.annotations.servers.Server;

/**
 * OpenAPI configuration for Swagger UI.
 * Configures API documentation and JWT security scheme.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@OpenAPIDefinition(
        info = @Info(
                title = "Autopartner Weilburg API",
                version = "1.0.0",
                description = "REST API for Autopartner Weilburg GmbH vehicle management system",
                contact = @Contact(
                        name = "Autopartner Weilburg Support",
                        email = "us@autopartner-weilburg.de"
                )
        ),
        servers = {
                @Server(url = "http://localhost:8080", description = "Development Server"),
                @Server(url = "https://autopartner-weilburg.de", description = "Production Server")
        }
)
@SecurityScheme(
        securitySchemeName = "jwt",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class OpenAPIConfig extends Application {
}

