package com.mindhub.ticketmind.models;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
public class TransitoryTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long kei;
    private UUID id;
    private double basePrice;
    private int availableQuantity;
    private double increasePercentage;
    private String sourceEmail;
    private String destinationEmail;
    public TransitoryTicket() {
    }

    public TransitoryTicket(UUID id, double basePrice, int availableQuantity, double increasePercentage, String sourceEmail, String destinationEmail) {
        this.id = id;
        this.basePrice = basePrice;
        this.availableQuantity = availableQuantity;
        this.increasePercentage = increasePercentage;
        this.sourceEmail = sourceEmail;
        this.destinationEmail = destinationEmail;
    }

    public Long getKei() {
        return kei;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(double basePrice) {
        this.basePrice = basePrice;
    }

    public int getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(int availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public double getIncreasePercentage() {
        return increasePercentage;
    }

    public void setIncreasePercentage(double increasePercentage) {
        this.increasePercentage = increasePercentage;
    }

    public String getSourceEmail() {
        return sourceEmail;
    }

    public void setSourceEmail(String sourceEmail) {
        this.sourceEmail = sourceEmail;
    }

    public String getDestinationEmail() {
        return destinationEmail;
    }

    public void setDestinationEmail(String destinationEmail) {
        this.destinationEmail = destinationEmail;
    }
}
