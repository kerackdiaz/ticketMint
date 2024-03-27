package com.mindhub.ticketmind.models;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private BigDecimal basePrice;
    private int availableQuantity;
    private double increasePercentage;

    @Enumerated(EnumType.STRING)
    private TicketType type;

    @ManyToOne
    private Event event;

    @ManyToOne
    private Client client;


    public Ticket() {
    }


    public Ticket(String name, BigDecimal basePrice, int availableQuantity, double increasePercentage, TicketType type, Event event) {
        this.name = name;
        this.basePrice = basePrice;
        this.availableQuantity = availableQuantity;
        this.increasePercentage = increasePercentage;
        this.type = type;
        this.event = event;
    }


    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(BigDecimal basePrice) {
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

    public TicketType getType() {
        return type;
    }

    public void setType(TicketType type) {
        this.type = type;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
