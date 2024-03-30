package com.mindhub.ticketmind.dtos;


import java.util.UUID;

public record TransactionFormDTO(Double amount, String destinationEmail, UUID ticketID) {
}
