package com.autopartner.backend.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Data Transfer Object for updating existing vehicles.
 * All fields are optional to allow partial updates.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
public class VehicleUpdateDTO {

    @Size(max = 100, message = "Model must not exceed 100 characters")
    private String model;

    @Size(max = 50, message = "Type must not exceed 50 characters")
    private String type;

    @PastOrPresent(message = "First registration must be in the past or present")
    private LocalDate firstRegistration;

    @PositiveOrZero(message = "Mileage must be zero or positive")
    private Integer mileage;

    private String equipment;

    @Positive(message = "Price must be positive")
    @DecimalMin(value = "0.01", message = "Price must be at least 0.01")
    private BigDecimal price;

    private Boolean active;

    private String description;

    private String images; // Comma-separated list of image URLs

    // Constructors
    public VehicleUpdateDTO() {
    }

    // Getters and Setters
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

