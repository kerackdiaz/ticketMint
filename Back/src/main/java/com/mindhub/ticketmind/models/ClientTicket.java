package com.mindhub.ticketmind.models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class ClientTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private UUID originalTicketId;
    private UUID eventId;
    private double price;
    private int quantity;
    private String ticketType;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    public ClientTicket() {
    }

    public ClientTicket(UUID originalTicketId, UUID eventId, double price, int quantity, String ticketType) {
        this.originalTicketId = originalTicketId;
        this.eventId = eventId;
        this.price = price;
        this.quantity = quantity;
        this.ticketType = ticketType;
    }

    public UUID getId() {
        return id;
    }

    public UUID getOriginalTicketId() {
        return originalTicketId;
    }

    public void setOriginalTicketId(UUID originalTicketId) {
        this.originalTicketId = originalTicketId;
    }

    public UUID getEventId() {
        return eventId;
    }

    public void setEventId(UUID eventId) {
        this.eventId = eventId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
