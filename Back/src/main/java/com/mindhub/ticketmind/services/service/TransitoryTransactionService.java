package com.mindhub.ticketmind.services.service;


import com.mindhub.ticketmind.dtos.TicketTransactionRecordDTO;
import com.mindhub.ticketmind.models.*;
import com.mindhub.ticketmind.repositories.*;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TransitoryTransactionService {

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

    @Autowired
    private TransitoryTicketRepository transitoryTicketRepository;
    @Autowired
    private JavaMailSender javaMailSender;


    @Transactional
    public Map<String, Object> makeTicketTransaction(TicketTransactionRecordDTO ticketTransactionRecordDTO, String userMail) {

        Map<String, Object> response = new HashMap<>();

        if (ticketTransactionRecordDTO.ticketPrice() < 0) {
            response.put("error", true);
            response.put("message", "The ticket price cannot be negative");
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
            Optional<ClientTicket> ticketOptional = clientTicketRepository.findById(ticketTransactionRecordDTO.ticketID());
            if (ticketOptional.isEmpty()) {
                response.put("error", true);
                response.put("message", "Ticket requested to transfer not found");
                return response;
            }
            ClientTicket ticket = ticketOptional.get();


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

            Optional<Event> eventOptional = eventRepository.findById(ticket.getEventId());
            if (eventOptional.isEmpty()) {
                response.put("error", true);
                response.put("message", "The clientTicket's event wasn't found by the event id present on the clientTicket");
                return response;
            }
            Event event = eventOptional.get();

            if (!sourceClient.getClientTickets().stream().anyMatch(clientTicket -> clientTicket.getId() == ticketTransactionRecordDTO.ticketID())) {
                response.put("error", true);
                response.put("message", "The ticket exists but it doesn't belong to the client that requested the transfer");
                return response;
            }

            if (destinationClient.getClientTickets().contains(ticket)) {
                response.put("error", true);
                response.put("message", "The destination client already has that ticket, contact support.");
                return response;
            }

            try {
                TransitoryTicket ticketie = new TransitoryTicket(ticket.getId(), ticketTransactionRecordDTO.ticketPrice(), ticketTransactionRecordDTO.quantity(), 0.10, userMail, ticketTransactionRecordDTO.ticketDestinationEmail());
                transitoryTicketRepository.save(ticketie);

                String oneOrMoreTicketsText = getString(ticketTransactionRecordDTO);

                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                helper.setFrom("ticketMint@3mas1r.com");
                helper.setTo(destinationClient.getEmail());
                helper.setSubject("Tickets offer");
                helper.setText("<html><body><table style=\"width: 100%; border-collapse: collapse; border-style: hidden; margin-left: auto; margin-right: auto;\" border=\"1\">\n" +
                        "  <tbody>\n" +
                        "    <tr>\n" +
                        "      <td style=\"width: 100%; text-align: center;\">\n" +
                        "        <span style=\"font-size: 36pt;\">Welcome "+ destinationClient.getFirstname() +"\n" +
                        "          <br>\n" +
                        "          <br>\n" +
                        "        </span>\n" +
                        "      </td>\n" +
                        "    </tr>\n" +
                        "  </tbody>\n" +
                        "</table>\n" +
                        "<table style=\"width: 100%; border-collapse: collapse; border-style: hidden; margin-left: auto; margin-right: auto;\" border=\"1\">\n" +
                        "  <tbody>\n" +
                        "    <tr>\n" +
                        "      <td style=\"width: 59.1731%; text-align: center;\">\n" +
                        "        <span style=\"font-size: 14pt;\"> " + sourceClient.getFirstname() + oneOrMoreTicketsText + event.getName() + ", you can accept or reject the transfer by clicking on one of the 2 buttons.</span>\n" +
                        "      </td>\n" +
                        "      <td style=\"width: 20.4135%; text-align: center;\">\n" +
                        "        <a href=\"http://localhost:5173/verifyTransaction?verifyTransaction="+ ticketie.getKei()+ "\"' target=\"_blank\"  class=\"cloudHQ__gmail_elements_final_btn\" style=\"background-color: #00de16; color: #ffffff; border: 0px solid #000000; border-radius: 3px; box-sizing: border-box; font-size: 13px; font-weight: bold; line-height: 40px; padding: 12px 24px; text-align: center; text-decoration: none; text-transform: uppercase; vertical-align: middle;\" rel=\"noopener\">Accept!!!</a>\n" +
                        "      </td>\n" +
                        "      <td style=\"width: 20.4135%; text-align: center;\">\n" +
                        "        <a href=\"http://localhost:5173/denyTransaction?denyTransaction="+ ticketie.getKei()+ "\"' target=\"_blank\"  class=\"cloudHQ__gmail_elements_final_btn\" style=\"background-color: #de0000; color: #ffffff; border: 0px solid #000000; border-radius: 3px; box-sizing: border-box; font-size: 13px; font-weight: bold; line-height: 40px; padding: 12px 24px; text-align: center; text-decoration: none; text-transform: uppercase; vertical-align: middle;\" rel=\"noopener\">Reject!!!</a>\n" +
                        "      </td>\n" +
                        "    </tr>\n" +
                        "  </tbody>\n" +
                        "</table>\n" +
                        "<br>\n" +
                        "<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n" +
                        "  <tbody>\n" +
                        "    <tr>\n" +
                        "      <td style=\"width: 100%;\">\n" +
                        "        <img src=\"https://firebasestorage.googleapis.com/v0/b/homebankingapp-4b70f.appspot.com/o/ticketmint%2Fmailassets%2FbannerFooter.jpg?alt=media&token=86684bac-6fa0-4682-a9a6-9e520cccaf78\" alt=\"\" width=\"100%\" height=\"100%\">\n" +
                        "      </td>\n" +
                        "    </tr>\n" +
                        "  </tbody>\n" +
                        "</table></body></html>", true);

                javaMailSender.send(mimeMessage);


            } catch (Exception e) {
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

    @Transactional
    public Map<String, Object> verifyTransaction(UUID kei) {
        Map<String, Object> response = new HashMap<>();
        try {
            Client admin = clientRepository.findByRole(UserRole.ADMIN);

            Optional<TransitoryTicket> optionalTransitoryTicket = transitoryTicketRepository.findById(kei);

            if (optionalTransitoryTicket.isPresent()) {
                TransitoryTicket transitoryTicket = optionalTransitoryTicket.get();

                Client sourceClient = clientRepository.findByEmail(transitoryTicket.getSourceEmail());
                Client destinationClient = clientRepository.findByEmail(transitoryTicket.getDestinationEmail());

                Optional<ClientTicket> ticketOptional = clientTicketRepository.findById(transitoryTicket.getClientTicketId());

                if (ticketOptional.isEmpty()) {
                    response.put("error", true);
                    response.put("message", "Client Ticket wasn't found!");
                    return response;
                }
                ClientTicket clientTicket = ticketOptional.get();

                Optional<Event> eventOptional = eventRepository.findById(clientTicket.getEventId());
                if (eventOptional.isEmpty()) {
                    response.put("error", true);
                    response.put("message", "The clientTicket's event wasn't found by the event id present on the clientTicket");
                    return response;
                }
                Event event = eventOptional.get();

                if (sourceClient.getClientTickets().stream().noneMatch(ticket -> ticket.getId() == transitoryTicket.getClientTicketId())) {
                    response.put("error", true);
                    response.put("message", "The clientTicket exists but it doesn't belong to the client that requested the transfer");
                    return response;
                }

                if (destinationClient.getClientTickets().contains(clientTicket)) {
                    response.put("error", true);
                    response.put("message", "The destination client already has that clientTicket, contact support.");
                    return response;
                }

                if (transitoryTicket.getTicketTransactionPrice() > 0) {

                    double ticketPrice = transitoryTicket.getTicketTransactionPrice();
                    destinationClient.setBalance(destinationClient.getBalance() - ticketPrice);
                    double commissionFees = ticketPrice * 0.10;
                    double ticketPriceNet = ticketPrice * 0.90;
                    admin.setBalance(admin.getBalance() + commissionFees);
                    sourceClient.setBalance(sourceClient.getBalance() + ticketPriceNet);

                    Transaction sourceTransaction = new Transaction();
                    sourceTransaction.setType(TransactionType.CREDIT);
                    sourceTransaction.setDescription("Ticket sell transaction to: " + destinationClient.getFirstname() + " " + destinationClient.getLastname());
                    sourceTransaction.setDate(new Date());
                    sourceTransaction.setAmount(ticketPriceNet);
                    sourceTransaction.setClient(sourceClient);
                    transactionRepository.save(sourceTransaction);

                    Transaction adminTransaction = new Transaction();
                    adminTransaction.setType(TransactionType.CREDIT);
                    adminTransaction.setDescription("Ticket Transaction Sale Commission Fees | Event: " + event.getName());
                    adminTransaction.setDate(new Date());
                    adminTransaction.setAmount(commissionFees);
                    adminTransaction.setClient(admin);
                    transactionRepository.save(adminTransaction);

                    Transaction destinationTransaction = new Transaction();
                    destinationTransaction.setType(TransactionType.DEBIT);
                    destinationTransaction.setDescription("Ticket purchase from: " + sourceClient.getFirstname() + " " + sourceClient.getLastname());
                    destinationTransaction.setDate(new Date());
                    destinationTransaction.setAmount(-ticketPrice);
                    destinationTransaction.setClient(destinationClient);
                    transactionRepository.save(destinationTransaction);

                } else if (transitoryTicket.getTicketTransactionPrice() == 0) {

                    Transaction sourceTransaction = new Transaction();
                    sourceTransaction.setType(TransactionType.CREDIT);
                    sourceTransaction.setDescription("Ticket gift for: " + destinationClient.getFirstname() + " " + destinationClient.getLastname());
                    sourceTransaction.setDate(new Date());
                    sourceTransaction.setAmount(0);
                    sourceTransaction.setClient(sourceClient);
                    transactionRepository.save(sourceTransaction);

                    Transaction destinationTransaction = new Transaction();
                    destinationTransaction.setType(TransactionType.DEBIT);
                    destinationTransaction.setDescription("Ticket gift from: " + sourceClient.getFirstname() + " " + sourceClient.getLastname());
                    destinationTransaction.setDate(new Date());
                    destinationTransaction.setAmount(0);
                    destinationTransaction.setClient(destinationClient);
                    transactionRepository.save(destinationTransaction);

                }

                try {

                    if (clientTicket.getQuantity() == transitoryTicket.getTicketQuantityToTransfer() &&
                            destinationClient.getClientTickets().stream().noneMatch(ticket -> ticket.getOriginalTicketId().equals(clientTicket.getOriginalTicketId()) )) {

                        if (clientTicket.getQuantity() == transitoryTicket.getTicketQuantityToTransfer()) {

                            List<ClientTicket> sourceClientTickets = sourceClient.getClientTickets();
                            sourceClientTickets.remove(clientTicket);

                            List<ClientTicket> destinationClientTickets = destinationClient.getClientTickets();
                            destinationClientTickets.add(clientTicket);

                            clientTicket.setClient(destinationClient);

                            clientRepository.save(sourceClient);
                            clientRepository.save(destinationClient);
                            clientTicketRepository.save(clientTicket);

                            transitoryTicketRepository.delete(transitoryTicket);

                            response.put("success", true);
                            response.put("message", "The clientTicket transfer was executed successfully!");
                        }
                        } else if (clientTicket.getQuantity() == transitoryTicket.getTicketQuantityToTransfer() &&
                                destinationClient.getClientTickets().stream().anyMatch(ticket -> ticket.getOriginalTicketId().equals(clientTicket.getOriginalTicketId()))) {

                            List<ClientTicket> sourceClientTickets = sourceClient.getClientTickets();
                            sourceClientTickets.remove(clientTicket);

                            Optional<ClientTicket> destinationClientTicketOptional = destinationClient.getClientTickets().stream().filter(clientTicket1 -> clientTicket.getOriginalTicketId().equals(clientTicket1.getOriginalTicketId())).findFirst();

                            if (destinationClientTicketOptional.isEmpty()) {
                                response.put("error", true);
                                response.put("message", "The ticket wasn't found within the tickets the destination client possesses");
                                return response;
                            }
                            ClientTicket destinationClientTicket = destinationClientTicketOptional.get();

                            destinationClientTicket.setQuantity(destinationClientTicket.getQuantity() + transitoryTicket.getTicketQuantityToTransfer());

                            clientTicketRepository.delete(clientTicket);

                            clientRepository.save(sourceClient);
                            clientRepository.save(destinationClient);
                            clientTicketRepository.save(destinationClientTicket);

                            transitoryTicketRepository.delete(transitoryTicket);

                            response.put("success", true);
                            response.put("message", "The clientTicket transfer was executed successfully!");

                        } else if (clientTicket.getQuantity() > transitoryTicket.getTicketQuantityToTransfer() &&
                                destinationClient.getClientTickets().stream().noneMatch(ticket -> ticket.getOriginalTicketId().equals(clientTicket.getOriginalTicketId()))) {

                            clientTicket.setQuantity(clientTicket.getQuantity() - transitoryTicket.getTicketQuantityToTransfer());
                            clientTicketRepository.save(clientTicket);

                            ClientTicket transferredTicket = new ClientTicket(clientTicket.getOriginalTicketId(), clientTicket.getEventId(), clientTicket.getPrice(), transitoryTicket.getTicketQuantityToTransfer(), clientTicket.getTicketType());
                            clientTicketRepository.save(transferredTicket);
                            transferredTicket.setClient(destinationClient);

                            List<ClientTicket> destinationClientTickets = destinationClient.getClientTickets();
                            destinationClientTickets.add(transferredTicket);

                            clientRepository.save(sourceClient);
                            clientRepository.save(destinationClient);
                            clientTicketRepository.save(transferredTicket);

                            transitoryTicketRepository.delete(transitoryTicket);

                            response.put("success", true);
                            response.put("message", "The clientTicket transfer was executed successfully!");
                        } else if (clientTicket.getQuantity() > transitoryTicket.getTicketQuantityToTransfer() &&
                                destinationClient.getClientTickets().stream().anyMatch(ticket -> ticket.getOriginalTicketId().equals(clientTicket.getOriginalTicketId()))) {

                            clientTicket.setQuantity(clientTicket.getQuantity() - transitoryTicket.getTicketQuantityToTransfer());
                            clientTicketRepository.save(clientTicket);

                            Optional<ClientTicket> destinationClientTicketOptional = destinationClient.getClientTickets().stream().filter(clientTicket1 -> clientTicket.getOriginalTicketId().equals(clientTicket1.getOriginalTicketId())).findFirst();

                            if (destinationClientTicketOptional.isEmpty()) {
                                response.put("error", true);
                                response.put("message", "The ticket wasn't found within the tickets the destination client possesses");
                                return response;
                            }
                            ClientTicket destinationClientTicket = destinationClientTicketOptional.get();

                            destinationClientTicket.setQuantity(destinationClientTicket.getQuantity() + transitoryTicket.getTicketQuantityToTransfer());

                            clientRepository.save(sourceClient);
                            clientRepository.save(destinationClient);
                            clientTicketRepository.save(destinationClientTicket);

                            transitoryTicketRepository.delete(transitoryTicket);

                            response.put("success", true);
                            response.put("message", "The clientTicket transfer was executed successfully!");
                        }

                    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                    helper.setFrom("ticketMint@3mas1r.com");
                    helper.setTo(sourceClient.getEmail());
                    helper.setSubject("Transaction accepted");
                    helper.setText("<html><body><table style=\"width: 100%; border-collapse: collapse; border-style: hidden; margin-left: auto; margin-right: auto;\" border=\"1\">\n" +
                            "  <tbody>\n" +
                            "    <tr>\n" +
                            "      <td style=\"width: 100%; text-align: center;\">\n" +
                            "        <span style=\"font-size: 36pt;\">Welcome "+ sourceClient.getFirstname() +"\n" +
                            "          <br>\n" +
                            "          <br>\n" +
                            "        </span>\n" +
                            "      </td>\n" +
                            "    </tr>\n" +
                            "  </tbody>\n" +
                            "</table>\n" +
                            "<table style=\"width: 100%; border-collapse: collapse; border-style: hidden; margin-left: auto; margin-right: auto;\" border=\"1\">\n" +
                            "  <tbody>\n" +
                            "    <tr>\n" +
                            "      <td style=\"width: 59.1731%; text-align: center;\">\n" +
                            "        <span style=\"font-size: 14pt;\"> " + sourceClient.getFirstname() + "Has accepted your offer of the ticket(s) for " + event.getName() +". The transaction was completed successfully.</span>\n" +
                            "      </td>\n" +
                            "    </tr>\n" +
                            "  </tbody>\n" +
                            "</table>\n" +
                            "<br>\n" +
                            "<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n" +
                            "  <tbody>\n" +
                            "    <tr>\n" +
                            "      <td style=\"width: 100%;\">\n" +
                            "        <img src=\"https://firebasestorage.googleapis.com/v0/b/homebankingapp-4b70f.appspot.com/o/ticketmint%2Fmailassets%2FbannerFooter.jpg?alt=media&token=86684bac-6fa0-4682-a9a6-9e520cccaf78\" alt=\"\" width=\"100%\" height=\"100%\">\n" +
                            "      </td>\n" +
                            "    </tr>\n" +
                            "  </tbody>\n" +
                            "</table></body></html>", true);

                    javaMailSender.send(mimeMessage);


                    } catch(Exception e){
                        response.put("error", true);
                        response.put("message", "An error occurred transferring the clientTicket: " + e.getMessage());
                    }

                } else{

                    response.put("error", true);
                    response.put("message", "Transaction already cancelled!");
                }

            } catch(Exception e){

                response.put("error", false);
                response.put("message", "An error occurred while making the ticket transaction: " + e.getMessage());
            }

        Optional<TransitoryTicket> optionalTransitoryTicket = transitoryTicketRepository.findById(kei);
        if (optionalTransitoryTicket.isPresent()) {
            TransitoryTicket transitoryTicket = optionalTransitoryTicket.get();
            transitoryTicketRepository.delete(transitoryTicket);
        }

        return response;
        }

        @Transactional
        public Map<String, Object> deleteTransaction (UUID id){
            Map<String, Object> response = new HashMap<>();

            Optional<TransitoryTicket> transitoryTicketOptional = transitoryTicketRepository.findById(id);
            try {
                if (transitoryTicketOptional.isPresent()) {
                    TransitoryTicket transitoryTicket = transitoryTicketOptional.get();

                    Client sourceClient = clientRepository.findByEmail(transitoryTicket.getSourceEmail());
                    Client destinationClient = clientRepository.findByEmail(transitoryTicket.getSourceEmail());

                    Optional<ClientTicket> clientTicketOptional = clientTicketRepository.findById(transitoryTicket.getClientTicketId());
                    if(clientTicketOptional.isEmpty()){
                        response.put("error", true);
                        response.put("message", "The clientTicket wasn't found by the clientTicketId present on the transitoryTicket");
                        return response;
                    }
                    ClientTicket clientTicket = clientTicketOptional.get();
                    Optional<Ticket> ticketOptional = ticketRepository.findById(clientTicket.getOriginalTicketId());
                    if(ticketOptional.isEmpty()){
                        response.put("error", true);
                        response.put("message", "The original ticket wasn't found by the ticketId present on the clientTicket");
                        return response;
                    }
                    Ticket ticket = ticketOptional.get();

                    Event event = ticket.getEvent();

                    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                    helper.setFrom("ticketMint@3mas1r.com");
                    helper.setTo(sourceClient.getEmail());
                    helper.setSubject("Transaction rejected");
                    helper.setText("<html><body><table style=\"width: 100%; border-collapse: collapse; border-style: hidden; margin-left: auto; margin-right: auto;\" border=\"1\">\n" +
                            "  <tbody>\n" +
                            "    <tr>\n" +
                            "      <td style=\"width: 100%; text-align: center;\">\n" +
                            "        <span style=\"font-size: 36pt;\">Welcome "+ sourceClient.getFirstname() +"\n" +
                            "          <br>\n" +
                            "          <br>\n" +
                            "        </span>\n" +
                            "      </td>\n" +
                            "    </tr>\n" +
                            "  </tbody>\n" +
                            "</table>\n" +
                            "<table style=\"width: 100%; border-collapse: collapse; border-style: hidden; margin-left: auto; margin-right: auto;\" border=\"1\">\n" +
                            "  <tbody>\n" +
                            "    <tr>\n" +
                            "      <td style=\"width: 59.1731%; text-align: center;\">\n" +
                            "        <span style=\"font-size: 14pt;\"> " + destinationClient.getFirstname() + "has rejected your offer of the ticket(s) for the event:  " + event.getName() + "</span>\n" +
                            "      </td>\n" +
                            "    </tr>\n" +
                            "  </tbody>\n" +
                            "</table>\n" +
                            "<br>\n" +
                            "<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n" +
                            "  <tbody>\n" +
                            "    <tr>\n" +
                            "      <td style=\"width: 100%;\">\n" +
                            "        <img src=\"https://firebasestorage.googleapis.com/v0/b/homebankingapp-4b70f.appspot.com/o/ticketmint%2Fmailassets%2FbannerFooter.jpg?alt=media&token=86684bac-6fa0-4682-a9a6-9e520cccaf78\" alt=\"\" width=\"100%\" height=\"100%\">\n" +
                            "      </td>\n" +
                            "    </tr>\n" +
                            "  </tbody>\n" +
                            "</table></body></html>", true);
                    javaMailSender.send(mimeMessage);
                    transitoryTicketRepository.delete(transitoryTicket);
                    response.put("success", true);
                    response.put("message", "Transaction denied!");
                }



            } catch (Exception e) {
                response.put("error", false);
                response.put("message", "An error occurred while denying the transaction: " + e.getMessage());
            }
            return response;
        }

    private String getString(TicketTransactionRecordDTO ticketTransactionRecordDTO) {
        String oneOrMoreTicketsText;
        if (ticketTransactionRecordDTO.ticketPrice() == 0) {
            if (ticketTransactionRecordDTO.quantity() == 1) {
                oneOrMoreTicketsText = " is gifting you a ticket for the event: ";
            } else {
                oneOrMoreTicketsText = " is gifting you " + ticketTransactionRecordDTO.quantity() + " tickets for the event: ";
            }
        } else {
            if (ticketTransactionRecordDTO.quantity() == 1) {
                oneOrMoreTicketsText = " wants to sell you a ticket at U$D"+ ticketTransactionRecordDTO.ticketPrice() + "for the event: ";
            } else {
                oneOrMoreTicketsText = " wants to sell you " + ticketTransactionRecordDTO.quantity() + "tickets at U$D" + ticketTransactionRecordDTO.ticketPrice() + " for the event: ";
            }
        }
        return oneOrMoreTicketsText;
    }

}
