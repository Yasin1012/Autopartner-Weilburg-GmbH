package com.autopartner.backend.service;

import com.autopartner.backend.dto.VehicleCreateDTO;
import com.autopartner.backend.dto.VehicleDTO;
import com.autopartner.backend.dto.VehicleUpdateDTO;
import com.autopartner.backend.model.Vehicle;
import com.autopartner.backend.repository.VehicleRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for vehicle management.
 * Handles CRUD operations for vehicles with DTO mapping.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@ApplicationScoped
public class VehicleService {

    @Inject
    VehicleRepository vehicleRepository;

    @Inject
    MailService mailService;

    /**
     * Get all vehicles.
     * 
     * @return list of vehicle DTOs
     */
    public List<VehicleDTO> getAllVehicles() {
        return vehicleRepository.listAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get vehicle by ID.
     * 
     * @param id vehicle ID
     * @return vehicle DTO
     * @throws NotFoundException if vehicle not found
     */
    public VehicleDTO getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Vehicle not found with id: " + id));
        return toDTO(vehicle);
    }

    /**
     * Create a new vehicle.
     * 
     * @param createDTO vehicle creation data
     * @return created vehicle DTO
     */
    @Transactional
    public VehicleDTO createVehicle(VehicleCreateDTO createDTO) {
        Vehicle vehicle = new Vehicle();
        vehicle.setModel(createDTO.getModel());
        vehicle.setType(createDTO.getType());
        vehicle.setFirstRegistration(createDTO.getFirstRegistration());
        vehicle.setMileage(createDTO.getMileage());
        vehicle.setEquipment(createDTO.getEquipment());
        vehicle.setPrice(createDTO.getPrice());
        vehicle.setActive(createDTO.getActive() != null ? createDTO.getActive() : true);

        vehicleRepository.persist(vehicle);

        // Send email notification
        mailService.sendVehicleCreatedMail(vehicle);

        return toDTO(vehicle);
    }

    /**
     * Update an existing vehicle.
     * 
     * @param id vehicle ID
     * @param updateDTO vehicle update data
     * @return updated vehicle DTO
     * @throws NotFoundException if vehicle not found
     */
    @Transactional
    public VehicleDTO updateVehicle(Long id, VehicleUpdateDTO updateDTO) {
        Vehicle vehicle = vehicleRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Vehicle not found with id: " + id));

        if (updateDTO.getModel() != null) {
            vehicle.setModel(updateDTO.getModel());
        }
        if (updateDTO.getType() != null) {
            vehicle.setType(updateDTO.getType());
        }
        if (updateDTO.getFirstRegistration() != null) {
            vehicle.setFirstRegistration(updateDTO.getFirstRegistration());
        }
        if (updateDTO.getMileage() != null) {
            vehicle.setMileage(updateDTO.getMileage());
        }
        if (updateDTO.getEquipment() != null) {
            vehicle.setEquipment(updateDTO.getEquipment());
        }
        if (updateDTO.getPrice() != null) {
            vehicle.setPrice(updateDTO.getPrice());
        }
        if (updateDTO.getActive() != null) {
            vehicle.setActive(updateDTO.getActive());
        }

        vehicleRepository.persist(vehicle);
        return toDTO(vehicle);
    }

    /**
     * Delete a vehicle.
     * 
     * @param id vehicle ID
     * @throws NotFoundException if vehicle not found
     */
    @Transactional
    public void deleteVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Vehicle not found with id: " + id));
        vehicleRepository.delete(vehicle);
    }

    /**
     * Map Vehicle entity to VehicleDTO.
     * 
     * @param vehicle the vehicle entity
     * @return vehicle DTO
     */
    private VehicleDTO toDTO(Vehicle vehicle) {
        return new VehicleDTO(
                vehicle.getId(),
                vehicle.getModel(),
                vehicle.getType(),
                vehicle.getFirstRegistration(),
                vehicle.getMileage(),
                vehicle.getEquipment(),
                vehicle.getPrice(),
                vehicle.getActive(),
                vehicle.getCreatedAt()
        );
    }
}

