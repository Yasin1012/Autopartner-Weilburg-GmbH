package com.autopartner.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Data Transfer Object for Vehicle responses.
 * Contains complete vehicle information for API responses.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
public class VehicleDTO {

    private Long id;
    private String model;
    private String type;
    private LocalDate firstRegistration;
    private Integer mileage;
    private String equipment;
    private BigDecimal price;
    private Boolean active;
    private String description;
    private String images;
    private LocalDateTime createdAt;

    // Constructors
    public VehicleDTO() {
    }

    public VehicleDTO(Long id, String model, String type, LocalDate firstRegistration, 
                      Integer mileage, String equipment, BigDecimal price, Boolean active,
                      String description, String images, LocalDateTime createdAt) {
        this.id = id;
        this.model = model;
        this.type = type;
        this.firstRegistration = firstRegistration;
        this.mileage = mileage;
        this.equipment = equipment;
        this.price = price;
        this.active = active;
        this.description = description;
        this.images = images;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getFirstRegistration() {
        return firstRegistration;
    }

    public void setFirstRegistration(LocalDate firstRegistration) {
        this.firstRegistration = firstRegistration;
    }

    public Integer getMileage() {
        return mileage;
    }

    public void setMileage(Integer mileage) {
        this.mileage = mileage;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }
}

