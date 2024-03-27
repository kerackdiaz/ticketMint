package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {
    Event findByName(String event);
}
