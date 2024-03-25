package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {
}
