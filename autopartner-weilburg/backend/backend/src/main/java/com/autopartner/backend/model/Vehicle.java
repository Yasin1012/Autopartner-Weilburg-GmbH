package com.autopartner.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Vehicle entity representing cars in the dealership inventory.
 * Contains detailed information about each vehicle including specifications,
 * pricing, and availability status.
 * 
 * @author Autopartner Weilburg Development Team
 * @version 1.0.0
 */
@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String model;

    @Column(nullable = false, length = 50)
    private String type;

    @Column(name = "first_registration", nullable = false)
    private LocalDate firstRegistration;

    @Column(nullable = false)
    private Integer mileage;

    @Column(columnDefinition = "TEXT")
    private String equipment;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String images; // Comma-separated list of image URLs

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (active == null) {
            active = true;
        }
    }

    // Constructors
    public Vehicle() {
    }

    public Vehicle(String model, String type, LocalDate firstRegistration, Integer mileage, 
                   String equipment, BigDecimal price) {
        this.model = model;
        this.type = type;
        this.firstRegistration = firstRegistration;
        this.mileage = mileage;
        this.equipment = equipment;
        this.price = price;
        this.active = true;
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

