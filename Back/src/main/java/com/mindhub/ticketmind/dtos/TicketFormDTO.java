package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.TicketType;

import java.math.BigDecimal;

public record TicketFormDTO(String name, double basePrice, int availableQuantity, String type) {
}
