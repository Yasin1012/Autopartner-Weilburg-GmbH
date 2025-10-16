package com.autopartner.backend.service;

import com.autopartner.backend.dto.LoginDTO;
import com.autopartner.backend.dto.LoginResponseDTO;
import com.autopartner.backend.dto.RegisterDTO;
import com.autopartner.backend.dto.UserDTO;
import com.autopartner.backend.model.User;
import com.autopartner.backend.repository.UserRepository;
import com.autopartner.backend.security.JwtUtil;
import com.autopartner.backend.util.PasswordUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotAuthorizedException;

/**
 * Service for authentication and user management.
 * Handles login, registration, and user operations.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@ApplicationScoped
public class AuthService {

    @Inject
    UserRepository userRepository;

    @Inject
    PasswordUtil passwordUtil;

    @Inject
    JwtUtil jwtUtil;

    /**
     * Authenticate a user and generate JWT token.
     * 
     * @param loginDTO login credentials
     * @return login response with JWT token
     * @throws NotAuthorizedException if credentials are invalid
     */
    public LoginResponseDTO login(LoginDTO loginDTO) {
        User user = userRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(() -> new NotAuthorizedException("Invalid username or password"));

        if (!passwordUtil.verifyPassword(loginDTO.getPassword(), user.getPassword())) {
            throw new NotAuthorizedException("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        return new LoginResponseDTO(token, user.getRole().name(), user.getUsername());
    }

    /**
     * Register a new user (ADMIN only operation).
     * 
     * @param registerDTO registration data
     * @return created user DTO
     * @throws BadRequestException if username already exists
     */
    @Transactional
    public UserDTO register(RegisterDTO registerDTO) {
        if (userRepository.existsByUsername(registerDTO.getUsername())) {
            throw new BadRequestException("Username already exists");
        }

        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setPassword(passwordUtil.hashPassword(registerDTO.getPassword()));
        user.setRole(User.Role.valueOf(registerDTO.getRole()));

        userRepository.persist(user);

        return new UserDTO(user.getId(), user.getUsername(), user.getRole().name(), user.getCreatedAt());
    }

    /**
     * Get user by username.
     * 
     * @param username the username
     * @return user DTO
     * @throws BadRequestException if user not found
     */
    public UserDTO getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException("User not found"));

        return new UserDTO(user.getId(), user.getUsername(), user.getRole().name(), user.getCreatedAt());
    }
}

