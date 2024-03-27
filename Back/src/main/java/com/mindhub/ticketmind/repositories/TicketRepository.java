package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.Event;
import com.mindhub.ticketmind.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    List<Ticket> findByEventId(UUID id);

}
