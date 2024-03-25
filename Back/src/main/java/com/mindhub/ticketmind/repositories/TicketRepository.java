package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {
}
