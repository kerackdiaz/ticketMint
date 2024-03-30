package com.mindhub.ticketmind.dtos;

import java.util.UUID;

public record TicketTransactionRecordDTO(String ticketDestinationEmail, String description, UUID ticketID, double ticketPrice, int quantity){

}
