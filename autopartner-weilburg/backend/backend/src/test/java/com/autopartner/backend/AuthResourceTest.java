package com.autopartner.backend;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;

/**
 * Integration tests for authentication endpoints.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@QuarkusTest
public class AuthResourceTest {

    @Test
    public void testLoginEndpointReturns401ForInvalidUser() {
        // This test just verifies that authentication is working
        // Testing with a user that doesn't exist
        given()
                .contentType(ContentType.JSON)
                .body("{\"username\":\"nonexistent\",\"password\":\"test\"}")
                .when()
                .post("/api/auth/login")
                .then()
                .statusCode(401);
    }

    @Test
    public void testLoginEndpointWithMissingUsername() {
        // Test validation - missing username should return 400
        given()
                .contentType(ContentType.JSON)
                .body("{\"password\":\"somepassword\"}")
                .when()
                .post("/api/auth/login")
                .then()
                .statusCode(400);
    }

    @Test
    public void testLoginEndpointWithMissingPassword() {
        // Test validation - missing password should return 400
        given()
                .contentType(ContentType.JSON)
                .body("{\"username\":\"someuser\"}")
                .when()
                .post("/api/auth/login")
                .then()
                .statusCode(400);
    }
}

