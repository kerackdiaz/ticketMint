package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {
    Client findByEmail(String username);

    boolean existsByEmail(String email);


}
