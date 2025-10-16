package com.autopartner.backend.util;

import at.favre.lib.crypto.bcrypt.BCrypt;
import jakarta.enterprise.context.ApplicationScoped;

/**
 * Utility class for password hashing and verification using BCrypt.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@ApplicationScoped
public class PasswordUtil {

    private static final int BCRYPT_COST = 12;

    /**
     * Hash a plain text password using BCrypt.
     * 
     * @param plainPassword the plain text password
     * @return the hashed password
     */
    public String hashPassword(String plainPassword) {
        return BCrypt.withDefaults().hashToString(BCRYPT_COST, plainPassword.toCharArray());
    }

    /**
     * Verify a plain text password against a hashed password.
     * 
     * @param plainPassword the plain text password
     * @param hashedPassword the hashed password
     * @return true if the password matches, false otherwise
     */
    public boolean verifyPassword(String plainPassword, String hashedPassword) {
        BCrypt.Result result = BCrypt.verifyer().verify(plainPassword.toCharArray(), hashedPassword);
        return result.verified;
    }
}

