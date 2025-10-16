package com.autopartner.backend.dto;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for User responses.
 * Excludes password for security.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
public class UserDTO {

    private Long id;
    private String username;
    private String role;
    private LocalDateTime createdAt;

    // Constructors
    public UserDTO() {
    }

    public UserDTO(Long id, String username, String role, LocalDateTime createdAt) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

