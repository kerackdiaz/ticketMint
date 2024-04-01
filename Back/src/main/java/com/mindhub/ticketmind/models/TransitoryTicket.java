package com.mindhub.ticketmind.models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class TransitoryTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID kei;
    private UUID clientTicketId;
    private double ticketTransactionPrice;
    private int ticketQuantityToTransfer;
    private double increasePercentage;
    private String sourceEmail;
    private String destinationEmail;
    public TransitoryTicket() {
    }

    public TransitoryTicket(UUID clientTicketId, double ticketTransactionPrice, int ticketQuantityToTransfer, double increasePercentage, String sourceEmail, String destinationEmail) {
        this.clientTicketId = clientTicketId;
        this.ticketTransactionPrice = ticketTransactionPrice;
        this.ticketQuantityToTransfer = ticketQuantityToTransfer;
        this.increasePercentage = increasePercentage;
        this.sourceEmail = sourceEmail;
        this.destinationEmail = destinationEmail;
    }

    public UUID getKei() {
        return kei;
    }

    public UUID getClientTicketId() {
        return clientTicketId;
    }

    public void setClientTicketId(UUID clientTicketId) {
        this.clientTicketId = clientTicketId;
    }

    public double getTicketTransactionPrice() {
        return ticketTransactionPrice;
    }

    public void setTicketTransactionPrice(double ticketTransactionPrice) {
        this.ticketTransactionPrice = ticketTransactionPrice;
    }

    public int getTicketQuantityToTransfer() {
        return ticketQuantityToTransfer;
    }

    public void setTicketQuantityToTransfer(int ticketQuantityToTransfer) {
        this.ticketQuantityToTransfer = ticketQuantityToTransfer;
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
