package com.autopartner.backend.repository;

import com.autopartner.backend.model.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;

/**
 * Repository for User entity using Panache.
 * Provides database access methods for user management.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {

    /**
     * Find a user by username.
     * 
     * @param username the username to search for
     * @return Optional containing the user if found, empty otherwise
     */
    public Optional<User> findByUsername(String username) {
        return find("username", username).firstResultOptional();
    }

    /**
     * Check if a username already exists.
     * 
     * @param username the username to check
     * @return true if username exists, false otherwise
     */
    public boolean existsByUsername(String username) {
        return count("username", username) > 0;
    }
}

