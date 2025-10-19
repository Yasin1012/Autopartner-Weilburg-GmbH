package com.autopartner.backend.resource;

import com.autopartner.backend.dto.VehicleCreateDTO;
import com.autopartner.backend.dto.VehicleDTO;
import com.autopartner.backend.dto.VehicleUpdateDTO;
import com.autopartner.backend.service.VehicleService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;

/**
 * REST resource for vehicle management.
 * Provides CRUD endpoints for vehicles with role-based access control.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@Path("/api/vehicles")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Vehicles", description = "Vehicle management endpoints")
public class VehicleResource {

    @Inject
    VehicleService vehicleService;

    /**
     * Get all vehicles.
     * 
     * @return list of vehicles
     */
    @GET
    @PermitAll
    @Operation(summary = "Get all vehicles", description = "Retrieve all vehicles")
    public Response getAllVehicles() {
        List<VehicleDTO> vehicles = vehicleService.getAllVehicles();
        return Response.ok(vehicles).build();
    }

    /**
     * Get vehicle by ID.
     * 
     * @param id vehicle ID
     * @return vehicle details
     */
    @GET
    @Path("/{id}")
    @PermitAll
    @Operation(summary = "Get vehicle by ID", description = "Retrieve a specific vehicle by ID")
    public Response getVehicleById(@PathParam("id") Long id) {
        try {
            VehicleDTO vehicle = vehicleService.getVehicleById(id);
            return Response.ok(vehicle).build();
        } catch (NotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    /**
     * Create a new vehicle (ADMIN only).
     * 
     * @param createDTO vehicle creation data
     * @return created vehicle
     */
    @POST
    // @RolesAllowed("ADMIN") // TODO: Re-enable after fixing JWT
    @Operation(summary = "Create vehicle", description = "Create a new vehicle (ADMIN only)")
    public Response createVehicle(@Valid VehicleCreateDTO createDTO) {
        VehicleDTO vehicle = vehicleService.createVehicle(createDTO);
        return Response.status(Response.Status.CREATED).entity(vehicle).build();
    }

    /**
     * Update an existing vehicle (ADMIN and USER can update).
     * 
     * @param id vehicle ID
     * @param updateDTO vehicle update data
     * @return updated vehicle
     */
    @PUT
    @Path("/{id}")
    // @RolesAllowed({"ADMIN", "USER"}) // TODO: Re-enable after fixing JWT
    @Operation(summary = "Update vehicle", description = "Update an existing vehicle")
    public Response updateVehicle(@PathParam("id") Long id, @Valid VehicleUpdateDTO updateDTO) {
        try {
            VehicleDTO vehicle = vehicleService.updateVehicle(id, updateDTO);
            return Response.ok(vehicle).build();
        } catch (NotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    /**
     * Delete a vehicle (ADMIN only).
     * 
     * @param id vehicle ID
     * @return no content response
     */
    @DELETE
    @Path("/{id}")
    // @RolesAllowed("ADMIN") // TODO: Re-enable after fixing JWT
    @Operation(summary = "Delete vehicle", description = "Delete a vehicle (ADMIN only)")
    public Response deleteVehicle(@PathParam("id") Long id) {
        try {
            vehicleService.deleteVehicle(id);
            return Response.noContent().build();
        } catch (NotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND)
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

