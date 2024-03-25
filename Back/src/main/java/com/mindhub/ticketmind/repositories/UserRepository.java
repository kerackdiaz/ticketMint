package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
