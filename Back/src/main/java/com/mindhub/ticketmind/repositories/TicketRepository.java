package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.Event;
import com.mindhub.ticketmind.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    List<Ticket> findByEventId(UUID id);

}
