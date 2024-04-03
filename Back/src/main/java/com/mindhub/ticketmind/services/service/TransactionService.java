package com.mindhub.ticketmind.services.service;


import com.mindhub.ticketmind.dtos.TicketPurchaseRecordDTO;
import com.mindhub.ticketmind.models.*;
import com.mindhub.ticketmind.repositories.*;
import jakarta.transaction.Transactional;
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

    @Transactional
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

                if (ticket.getBasePrice() * ticketPurchaseRecordDTO.quantity() > ticketPurchaseRecordDTO.totalPrice()) {
                    response.put("error", true);
                    response.put("message", "The requested ticket's quantity to be purchased does not match the total price amount sent");
                    return response;
                }

                if (ticket.getAvailableQuantity() < ticketPurchaseRecordDTO.quantity()) {
                    response.put("error", true);
                    response.put("message", "Requested more tickets than available to purchase");
                    return response;
                }




            sourceClient.setBalance(sourceClient.getBalance() - (ticket.getBasePrice()));
            admin.setBalance(admin.getBalance() + ticket.getBasePrice() * (ticket.getIncreasePercentage()/100));
            agency.setBalance(agency.getBalance() + ticket.getBasePrice() * (1 - ticket.getIncreasePercentage()/100));
                String buyDescrip = "";
            if (ticketPurchaseRecordDTO.quantity() > 1){
                buyDescrip = "Purchase of " + ticketPurchaseRecordDTO.quantity() + " tickets for" + event.getName() + " event";
            } else {
                buyDescrip = "Ticket purchase for " + event.getName() + " event";
            }

            Transaction sourceClientTransaction = new Transaction();
            sourceClientTransaction.setType(TransactionType.DEBIT);
            sourceClientTransaction.setDescription(buyDescrip);
            sourceClientTransaction.setDate(new Date());
            sourceClientTransaction.setAmount(-ticket.getBasePrice() * ticketPurchaseRecordDTO.quantity());
            sourceClientTransaction.setClient(sourceClient);
            transactionRepository.save(sourceClientTransaction);

            Transaction adminTransaction = new Transaction();
            adminTransaction.setType(TransactionType.CREDIT);
            adminTransaction.setDescription("Ticket sale commission fees");
            adminTransaction.setDate(new Date());
            adminTransaction.setAmount(ticket.getBasePrice() * (ticket.getIncreasePercentage()/100));
            adminTransaction.setClient(admin);
            transactionRepository.save(adminTransaction);

            Transaction agencyTransaction = new Transaction();
            agencyTransaction.setType(TransactionType.CREDIT);
            agencyTransaction.setDescription("Ticket sale");
            agencyTransaction.setDate(new Date());
            agencyTransaction.setAmount(ticket.getBasePrice() * (1 - ticket.getIncreasePercentage()/100));
            agencyTransaction.setClient(agency);
            transactionRepository.save(agencyTransaction);

            try {
                ticket.setAvailableQuantity(ticket.getAvailableQuantity() - ticketPurchaseRecordDTO.quantity());
                ticketRepository.save(ticket);

                ClientTicket ticketBought = new ClientTicket( ticket.getId(), event.getId(), ticket.getBasePrice(), ticketPurchaseRecordDTO.quantity(), String.valueOf(ticket.getType()) );

                ticketBought.setClient(sourceClient);

                sourceClient.getClientTickets().add(ticketBought);

                clientTicketRepository.save(ticketBought);
                clientRepository.save(sourceClient);

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

}
