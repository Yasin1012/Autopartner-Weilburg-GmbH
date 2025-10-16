package com.autopartner.backend;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.greaterThan;

/**
 * Integration tests for vehicle endpoints.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@QuarkusTest
public class VehicleResourceTest {

    @Test
    public void testGetAllVehiclesEndpoint() {
        given()
                .when()
                .get("/api/vehicles")
                .then()
                .statusCode(200)
                .body("size()", greaterThan(0));
    }

    @Test
    public void testGetVehicleByIdEndpoint() {
        given()
                .when()
                .get("/api/vehicles/1")
                .then()
                .statusCode(200)
                .body("id", is(1))
                .body("model", is("BMW 320d"));
    }

    @Test
    public void testGetVehicleByIdNotFound() {
        given()
                .when()
                .get("/api/vehicles/9999")
                .then()
                .statusCode(404);
    }
}

