package com.autopartner.backend.repository;

import com.autopartner.backend.model.Vehicle;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

/**
 * Repository for Vehicle entity using Panache.
 * Provides database access methods for vehicle management.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@ApplicationScoped
public class VehicleRepository implements PanacheRepository<Vehicle> {

    /**
     * Find all active vehicles.
     * 
     * @return list of active vehicles
     */
    public List<Vehicle> findAllActive() {
        return list("active", true);
    }

    /**
     * Find vehicles by type.
     * 
     * @param type the vehicle type
     * @return list of vehicles matching the type
     */
    public List<Vehicle> findByType(String type) {
        return list("type", type);
    }

    /**
     * Find vehicles by model.
     * 
     * @param model the vehicle model
     * @return list of vehicles matching the model
     */
    public List<Vehicle> findByModel(String model) {
        return list("model", model);
    }
}

