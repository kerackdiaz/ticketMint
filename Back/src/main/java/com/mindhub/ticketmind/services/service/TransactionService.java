package com.mindhub.ticketmind.services.service;


import com.mindhub.ticketmind.dtos.TicketTransactionRecordDTO;
import com.mindhub.ticketmind.dtos.TransactionDTO;
import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.models.Ticket;
import com.mindhub.ticketmind.models.Transaction;
import com.mindhub.ticketmind.models.TransactionType;
import com.mindhub.ticketmind.repositories.ClientRepository;
import com.mindhub.ticketmind.repositories.TicketRepository;
import com.mindhub.ticketmind.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;


    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private TicketRepository ticketRepository;

//    public List<TransactionDTO> getAllTransactions() {
//        return transactionRepository.findAll().stream().map(TransactionDTO::new).toList();
//    }


    public Map<String, Object> makeTicketTransaction(TicketTransactionRecordDTO ticketTransactionRecordDTO, String userMail) {

        Map<String, Object> response = new HashMap<>();

        if (ticketTransactionRecordDTO.ticketPrice() <= 0) {
            response.put("error", true);
            response.put("message", "The ticket price cannot neither be zero nor negative");
            return response;
        }
        if (ticketTransactionRecordDTO.ticketDestinationEmail().isBlank() || ticketTransactionRecordDTO.ticketDestinationEmail() == null) {
            response.put("error", true);
            response.put("message", "The destination client's email wasn't sent");
            return response;
        }
        if (ticketTransactionRecordDTO.ticketID() == null) {
            response.put("error", true);
            response.put("message", "The ticket UUID wasn't sent");
            return response;
        }

        try {
            Client sourceClient = clientRepository.findByEmail(userMail);
            Client destinationClient = clientRepository.findByEmail(ticketTransactionRecordDTO.ticketDestinationEmail());
            Optional<Ticket> ticketOptional = ticketRepository.findById(ticketTransactionRecordDTO.ticketID());

            if (destinationClient.getBalance() < ticketTransactionRecordDTO.ticketPrice()) {
                response.put("error", true);
                response.put("message", "The destination client does not have enough money to buy the ticket");
                return response;
            }
            if (sourceClient == null) {
                response.put("error", true);
                response.put("message", "Source client not found");
                return response;
            }
            if (destinationClient == null) {
                response.put("error", true);
                response.put("message", "Destination client not found");
                return response;
            }

            if(ticketOptional.isEmpty()) {
                response.put("error", true);
                response.put("message", "Ticket requested to transfer not found");
                return response;
            }
            Ticket ticket =ticketOptional.get();

            if(!sourceClient.getTickets().contains(ticket)) {
                response.put("error", true);
                response.put("message", "The ticket exists but it doesn't belong to the client that requested the transfer");
                return response;
            }

            if(destinationClient.getTickets().contains(ticket)) {
                response.put("error", true);
                response.put("message", "The destination client already has that ticket, contact support.");
                return response;
            }

            double ticketPrice = ticketTransactionRecordDTO.ticketPrice();
            destinationClient.setBalance(destinationClient.getBalance() - ticketPrice);
            // ToDo: implement updating the admin's balance with the commission fees from the sale;
            double commissionFees = ticketPrice * 0.10;
            double ticketPriceNet = ticketPrice * 0.90;
            sourceClient.setBalance(sourceClient.getBalance() + ticketPriceNet );

            Transaction sourceTransaction = new Transaction();
            sourceTransaction.setType(TransactionType.CREDIT);
            sourceTransaction.setDescription(ticketTransactionRecordDTO.description());
            sourceTransaction.setDate(new Date());
            sourceTransaction.setAmount(ticketPriceNet);
            transactionRepository.save(sourceTransaction);

            Transaction destinationTransaction = new Transaction();
            destinationTransaction.setType(TransactionType.DEBIT);
            destinationTransaction.setDescription(ticketTransactionRecordDTO.description());
            destinationTransaction.setDate(new Date());
            sourceTransaction.setAmount(-ticketPrice);
            transactionRepository.save(destinationTransaction);

            try {
                List<Ticket> sourceClientTickets = sourceClient.getTickets();
                sourceClientTickets.remove(ticket);

                List<Ticket> destinationClientTickets = destinationClient.getTickets();
                destinationClientTickets.add(ticket);

                ticket.setClient(destinationClient);

                clientRepository.save(sourceClient);
                clientRepository.save(destinationClient);
                ticketRepository.save(ticket);
            } catch (Exception e){
                response.put("error", true);
                response.put("message", "An error occurred transferring the ticket: " + e.getMessage());
            }

            response.put("success", true);
            response.put("message", "Transaction completed successfully");

        } catch (Exception e) {
            response.put("error", true);
            response.put("message", "An error occurred making the transaction: " + e.getMessage());
        }
        return response;
    }

}