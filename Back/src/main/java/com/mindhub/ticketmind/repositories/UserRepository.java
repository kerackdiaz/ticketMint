package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<Client, UUID> {
    Client findByEmail(String username);

    boolean existsByEmail(String email);
}
