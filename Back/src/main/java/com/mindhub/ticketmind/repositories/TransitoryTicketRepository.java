package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.Event;
import com.mindhub.ticketmind.models.TransitoryTicket;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TransitoryTicketRepository extends JpaRepository<TransitoryTicket, UUID> {

    @Query("SELECT e FROM Event e WHERE e.id = :id")
    Optional<TransitoryTicket> findTransitoryTicketById(UUID id);

    Optional<TransitoryTicket> findByClientTicketId(UUID id);

    @Transactional
    @Modifying
    @Query("DELETE FROM TransitoryTicket t WHERE t.id = :id")
    void deleteTransitoryTicketById(UUID id);
}
