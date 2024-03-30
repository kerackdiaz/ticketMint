package com.mindhub.ticketmind.dtos;

import java.util.UUID;

public record TicketPurchaseRecordDTO(UUID ticketId, int quantity, double totalPrice) {
}
