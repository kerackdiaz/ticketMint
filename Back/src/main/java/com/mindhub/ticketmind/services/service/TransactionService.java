package com.mindhub.ticketmind.services.service;

import com.mindhub.ticketmind.dtos.TransactionDTO;
import com.mindhub.ticketmind.dtos.TransactionFormDTO;
import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.models.Transaction;
import com.mindhub.ticketmind.models.TransactionType;
import com.mindhub.ticketmind.repositories.ClientRepository;
import com.mindhub.ticketmind.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<TransactionDTO> getAllTransactions() {
        return transactionRepository.findAll().stream().map(TransactionDTO::new).toList();
    }

    public Map<String, Object> createTransaction(TransactionFormDTO transactionFormDTO, String userMail) {
        Map<String, Object> response = new HashMap<>();
        Client client = clientRepository.findByEmail(userMail);

        try {
            if (client == null) {
                response.put("error", false);
                response.put("message", "The user does not exist");
                return response;
            }

            if (transactionFormDTO.description().isBlank()) {
                response.put("error", false);
                response.put("message", "The transaction type is required");
                return response;

            }

            Transaction transaction = new Transaction(TransactionType.DEBIT,
                    transactionFormDTO.description(),
                    LocalDate.now(), transactionFormDTO.amount());

            transaction.setClient(client);
            transactionRepository.save(transaction);

            response.put("success", true);
            response.put("message", "Transaction created successfully");

        }catch (Exception e) {
            response.put("error", false);
            response.put("message", "An error occurred while creating transaction: " + e.getMessage());
            return response;
        }

        return response;
    }
}
