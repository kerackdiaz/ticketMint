package com.mindhub.ticketmind.services.service;


import com.mindhub.ticketmind.dtos.TicketPurchaseRecordDTO;
import com.mindhub.ticketmind.dtos.TicketTransactionRecordDTO;
import com.mindhub.ticketmind.dtos.TransactionDTO;
import com.mindhub.ticketmind.models.*;
import com.mindhub.ticketmind.repositories.*;
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
    @Autowired
    private ClientTicketRepository clientTicketRepository;

    @Autowired
    private EventRepository eventRepository;

    public List<TransactionDTO> getAllTransactions() {
        return transactionRepository.findAll().stream().map(TransactionDTO::new).toList();
    }

    public List<TransactionDTO> getAllClientTransactions(String userEmail) {
        Client client = clientRepository.findByEmail(userEmail);
        return client.getTransactions().stream().map(TransactionDTO::new).toList();
    }


    public Map<String, Object> ticketPurchaseTransaction(TicketPurchaseRecordDTO ticketPurchaseRecordDTO, String userMail) {

        Map<String, Object> response = new HashMap<>();

        if (ticketPurchaseRecordDTO.totalPrice() <= 0) {
            response.put("error", true);
            response.put("message", "The ticket price cannot neither be zero nor negative");
            return response;
        }
        if (ticketPurchaseRecordDTO.quantity() <= 0) {
            response.put("error", true);
            response.put("message", "The requested tickets quantity to be purchased cannot be 0 nor negative");
            return response;
        }
        if (ticketPurchaseRecordDTO.ticketId() == null) {
            response.put("error", true);
            response.put("message", "The ticket UUID wasn't sent");
            return response;
        }

        try {
            Client sourceClient = clientRepository.findByEmail(userMail);

            Client admin = clientRepository.findByRole(UserRole.ADMIN);

            Optional<Ticket> ticketOptional = ticketRepository.findById(ticketPurchaseRecordDTO.ticketId());


            if (sourceClient.getBalance() < ticketPurchaseRecordDTO.totalPrice()) {
                response.put("error", true);
                response.put("message", "The client does not have enough money to proceed with the purchase");
                return response;
            }
            if (sourceClient == null) {
                response.put("error", true);
                response.put("message", "Source client not found");
                return response;
            }

            if(ticketOptional.isEmpty()) {
                response.put("error", true);
                response.put("message", "Ticket requested to purchase not found");
                return response;
            }

            try {
            Ticket ticket = ticketOptional.get();

            Optional<Event> eventOptional = eventRepository.findEventById(ticket.getEvent().getId());

            if(eventOptional.isEmpty()){
                response.put("error", true);
                response.put("message", "Event requested related to the purchase not found");
                return response;
            }
                Event event = eventOptional.get();

                Client agency = event.getClient();

                if (ticket.getBasePrice() * ticketPurchaseRecordDTO.quantity() != ticketPurchaseRecordDTO.totalPrice()) {
                    response.put("error", true);
                    response.put("message", "The requested ticket's quantity to be purchased does not match the total price amount sent");
                    return response;
                }

                double ticketPrice = ticketPurchaseRecordDTO.totalPrice();
                double commissionFees = ticketPrice * 0.10;
                double ticketPriceNet = ticketPrice * 0.90;

            sourceClient.setBalance(sourceClient.getBalance() - ticketPrice); //Le descontamos el precio total al cliente que hizo la compra

            admin.setBalance(admin.getBalance() + commissionFees); //La plataforma gana un 10% de comision
            agency.setBalance(agency.getBalance() + ticketPriceNet); //La agencia obtiene el valor total luego de comision

            Transaction sourceClientTransaction = new Transaction();
            sourceClientTransaction.setType(TransactionType.DEBIT);
            sourceClientTransaction.setDescription("Ticket purchase");
            sourceClientTransaction.setDate(new Date());
            sourceClientTransaction.setAmount(-ticketPrice);
            transactionRepository.save(sourceClientTransaction);

            Transaction adminTransaction = new Transaction();
            adminTransaction.setType(TransactionType.CREDIT);
            adminTransaction.setDescription("Ticket sale commission fees");
            adminTransaction.setDate(new Date());
            adminTransaction.setAmount(commissionFees);
            transactionRepository.save(adminTransaction);

            Transaction agencyTransaction = new Transaction();
            agencyTransaction.setType(TransactionType.CREDIT);
            agencyTransaction.setDescription("Ticket sale");
            agencyTransaction.setDate(new Date());
            agencyTransaction.setAmount(ticketPriceNet);
            transactionRepository.save(agencyTransaction);

            try {
                ticket.setAvailableQuantity(ticket.getAvailableQuantity() - ticketPurchaseRecordDTO.quantity());
                ticketRepository.save(ticket);

                ClientTicket ticketBought = new ClientTicket( ticket.getId(), event.getId(), ticket.getBasePrice(), ticketPurchaseRecordDTO.quantity(), String.valueOf(ticket.getType()) );

                ticketBought.setClient(sourceClient);

                sourceClient.getClientTickets().add(ticketBought);

            } catch(Exception e) {
                response.put("error", true);
                response.put("message", "An error occurred during the purchase of the ticket: " + e.getMessage());
                return response;
                }

            } catch (Exception e) {
                response.put("error", true);
                response.put("message", "An error occurred during the purchase of the ticket: " + e.getMessage());
            }

            response.put("success", true);
            response.put("message", "Purchase completed successfully");

        } catch (Exception e) {
            response.put("error", true);
            response.put("message", "An error occurred during the purchase of the ticket: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> makeTicketTransaction(TicketTransactionRecordDTO ticketTransactionRecordDTO, String userMail) {

        Map<String, Object> response = new HashMap<>();

        if (ticketTransactionRecordDTO.ticketPrice() <= 0) {
            response.put("error", true);
            response.put("message", "The ticket price cannot neither be zero nor negative");
            return response;
        }
        if (ticketTransactionRecordDTO.quantity() <= 0) {
            response.put("error", true);
            response.put("message", "The ticket quantity cannot be zero nor negative");
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
            Client admin = clientRepository.findByRole(UserRole.ADMIN);
            Optional<ClientTicket> ticketOptional = clientTicketRepository.findById(ticketTransactionRecordDTO.ticketID());

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
            ClientTicket ticket = ticketOptional.get();

            if(!sourceClient.getClientTickets().contains(ticket)) {
                response.put("error", true);
                response.put("message", "The ticket exists but it doesn't belong to the client that requested the transfer");
                return response;
            }

            if(destinationClient.getClientTickets().contains(ticket)) {
                response.put("error", true);
                response.put("message", "The destination client already has that ticket, contact support.");
                return response;
            }

            double ticketPrice = ticketTransactionRecordDTO.ticketPrice();
            destinationClient.setBalance(destinationClient.getBalance() - ticketPrice);
            double commissionFees = ticketPrice * 0.10;
            double ticketPriceNet = ticketPrice * 0.90;
            admin.setBalance(admin.getBalance() + commissionFees);
            sourceClient.setBalance(sourceClient.getBalance() + ticketPriceNet );

            Transaction sourceTransaction = new Transaction();
            sourceTransaction.setType(TransactionType.CREDIT);
            sourceTransaction.setDescription(ticketTransactionRecordDTO.description());
            sourceTransaction.setDate(new Date());
            sourceTransaction.setAmount(ticketPriceNet);
            transactionRepository.save(sourceTransaction);

            Transaction adminTransaction = new Transaction();
            adminTransaction.setType(TransactionType.CREDIT);
            adminTransaction.setDescription("Ticket Transaction Sale Commission Fees");
            adminTransaction.setDate(new Date());
            adminTransaction.setAmount(ticketPriceNet);
            transactionRepository.save(adminTransaction);

            Transaction destinationTransaction = new Transaction();
            destinationTransaction.setType(TransactionType.DEBIT);
            destinationTransaction.setDescription(ticketTransactionRecordDTO.description());
            destinationTransaction.setDate(new Date());
            sourceTransaction.setAmount(-ticketPrice);
            transactionRepository.save(destinationTransaction);

            try {

                if(ticket.getQuantity() == ticketTransactionRecordDTO.quantity()) {
                    List<ClientTicket> sourceClientTickets = sourceClient.getClientTickets();
                    sourceClientTickets.remove(ticket);

                    List<ClientTicket> destinationClientTickets = destinationClient.getClientTickets();
                    destinationClientTickets.add(ticket);

                    ticket.setClient(destinationClient);

                    clientRepository.save(sourceClient);
                    clientRepository.save(destinationClient);
                    clientTicketRepository.save(ticket);
                } else if (ticket.getQuantity() > ticketTransactionRecordDTO.quantity()){

                    ticket.setQuantity(ticket.getQuantity() - ticketTransactionRecordDTO.quantity());
                    clientTicketRepository.save(ticket);

                    ClientTicket transferredTicket = new ClientTicket(ticket.getOriginalTicketId(), ticket.getEventId(), ticket.getPrice(), ticketTransactionRecordDTO.quantity(), ticket.getTicketType());
                    clientTicketRepository.save(transferredTicket);

                    List<ClientTicket> destinationClientTickets = destinationClient.getClientTickets();
                    destinationClientTickets.add(transferredTicket);
                    transferredTicket.setClient(destinationClient);

                    clientRepository.save(sourceClient);
                    clientRepository.save(destinationClient);
                    clientTicketRepository.save(transferredTicket);
                }
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
