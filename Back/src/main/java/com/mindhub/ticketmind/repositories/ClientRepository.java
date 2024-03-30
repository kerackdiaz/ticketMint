package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.models.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {
    Client findByEmail(String username);
    boolean existsByEmail(String email);
    Client findByRole(UserRole role);
    List<Client> findAllByRole(UserRole role);
}
