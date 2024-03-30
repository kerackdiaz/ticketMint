package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.ClientTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ClientTicketRepository extends JpaRepository<ClientTicket, UUID> {
}
