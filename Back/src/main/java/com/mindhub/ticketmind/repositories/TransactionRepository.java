package com.mindhub.ticketmind.repositories;

import com.mindhub.ticketmind.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
}
