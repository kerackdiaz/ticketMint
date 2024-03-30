package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.Ticket;
import com.mindhub.ticketmind.models.TicketType;

import java.math.BigDecimal;
import java.util.UUID;

public class TicketDTO {
    private UUID id;
    private String name;
    private BigDecimal basePrice;
    private int availableQuantity;
    private double increasePercentage;
    private TicketType type;
    private TicketEventDTO event;


    public TicketDTO(Ticket ticket) {
        this.id = ticket.getId();
        this.name = ticket.getName();
        this.basePrice = ticket.getBasePrice();
        this.availableQuantity = ticket.getAvailableQuantity();
        this.increasePercentage = ticket.getIncreasePercentage();
        this.type = ticket.getType();
        this.event = new TicketEventDTO(ticket.getEvent());
    }


    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getBasePrice() {
        return basePrice;
    }

    public int getAvailableQuantity() {
        return availableQuantity;
    }

    public double getIncreasePercentage() {
        return increasePercentage;
    }

    public TicketType getType() {
        return type;
    }

    public TicketEventDTO getEvent() {
        return event;
    }
}
