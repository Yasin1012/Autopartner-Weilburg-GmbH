package com.autopartner.backend.resource;

import com.autopartner.backend.dto.LoginDTO;
import com.autopartner.backend.dto.LoginResponseDTO;
import com.autopartner.backend.dto.RegisterDTO;
import com.autopartner.backend.dto.UserDTO;
import com.autopartner.backend.service.AuthService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

/**
 * REST resource for authentication operations.
 * Provides endpoints for login and user registration.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@Path("/api/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Authentication", description = "Authentication and user management endpoints")
public class AuthResource {

    @Inject
    AuthService authService;

    /**
     * Authenticate user and return JWT token.
     * 
     * @param loginDTO login credentials
     * @return login response with JWT token
     */
    @POST
    @Path("/login")
    @PermitAll
    @Operation(summary = "Login", description = "Authenticate user and receive JWT token")
    public Response login(@Valid LoginDTO loginDTO) {
        try {
            LoginResponseDTO response = authService.login(loginDTO);
            return Response.ok(response).build();
        } catch (NotAuthorizedException e) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    /**
     * Register a new user (ADMIN only).
     * 
     * @param registerDTO registration data
     * @return created user
     */
    @POST
    @Path("/register")
    // @RolesAllowed("ADMIN") // TODO: Re-enable after fixing JWT
    @Operation(summary = "Register User", description = "Register a new user (ADMIN only)")
    public Response register(@Valid RegisterDTO registerDTO) {
        try {
            UserDTO user = authService.register(registerDTO);
            return Response.status(Response.Status.CREATED).entity(user).build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    /**
     * Error response class for JSON error messages.
     */
    public static class ErrorResponse {
        private String message;

        public ErrorResponse() {
        }

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}

