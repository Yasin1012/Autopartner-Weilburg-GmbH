package com.autopartner.backend.dto;

/**
 * Data Transfer Object for login responses.
 * Contains JWT token and user role information.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
public class LoginResponseDTO {

    private String token;
    private String role;
    private String username;

    // Constructors
    public LoginResponseDTO() {
    }

    public LoginResponseDTO(String token, String role, String username) {
        this.token = token;
        this.role = role;
        this.username = username;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

