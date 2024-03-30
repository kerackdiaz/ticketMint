package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.models.ClientTicket;
import jakarta.persistence.*;

import java.util.UUID;

public class ClientTicketDTO {

    private UUID id;
    private UUID originalTicketId;
    private UUID eventId;
    private double price;
    private int quantity;
    private String ticketType;
    private Client client;

    public ClientTicketDTO(ClientTicket clientTicket) {
        this.originalTicketId = clientTicket.getOriginalTicketId();
        this.eventId = clientTicket.getEventId();
        this.price = clientTicket.getPrice();
        this.quantity = clientTicket.getQuantity();
        this.ticketType = clientTicket.getTicketType();
    }

    public UUID getId() {
        return id;
    }

    public UUID getOriginalTicketId() {
        return originalTicketId;
    }

    public UUID getEventId() {
        return eventId;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getTicketType() {
        return ticketType;
    }

    public Client getClient() {
        return client;
    }
}
