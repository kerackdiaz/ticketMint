package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
}
