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

            if (ticketOptional.isEmpty()) {
                response.put("error", true);
                response.put("message", "Ticket requested to transfer not found");
                return response;
            }
            ClientTicket ticket = ticketOptional.get();

            if(!sourceClient.getClientTickets().stream().anyMatch(clientTicket -> clientTicket.getId() == ticketTransactionRecordDTO.ticketID())) {
                response.put("error", true);
                response.put("message", "The ticket exists but it doesn't belong to the client that requested the transfer");
                return response;
            }

            if(destinationClient.getClientTickets().contains(ticket)) {
                response.put("error", true);
                response.put("message", "The destination client already has that ticket, contact support.");
                return response;
            }

            try {
                TransitoryTicket ticketie = new TransitoryTicket(ticket.getId(), ticketTransactionRecordDTO.ticketPrice(), ticketTransactionRecordDTO.quantity(), 0.10, userMail, ticketTransactionRecordDTO.ticketDestinationEmail());
                transitoryTicketRepository.save(ticketie);

                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                helper.setFrom("ticketMint@3mas1r.com");
                helper.setTo(destinationClient.getEmail());
                helper.setSubject("Account verification");
                helper.setText("<html><body><table style=\"border-collapse: collapse; width: 100%; height: 58px;\" border=\"1\">\n" +
                        "  <tbody>\n" +
                        "    <tr style=\"height: 58px;\">\n" +
                        "      <td style=\"width: 72.3514%; height: 58px; border:none; text-align: center;\">\n" +
                        "        <span style=\"font-size: 36pt; font-family: impact, sans-serif;\">Hi " + destinationClient.getFirstname() + ", Welcome to</span>\n" +
                        "      </td>\n" +
                        "      <td style=\"width: 27.6486%; height: 58px; border:none;\">\n" +
                        "        <img src=\"https://firebasestorage.googleapis.com/v0/b/homebankingapp-4b70f.appspot.com/o/ticketmint%2Fmailassets%2FticketmintLogo.png?alt=media&amp;token=e1c414f3-41e6-4da1-a5b8-7b63e3013612\" alt=\"\" width=\"101\" height=\"101\">\n" +
                        "      </td>\n" +
                        "    </tr>\n" +
                        "  </tbody>\n" +
                        "</table>\n" +
                        "<br>\n" +
                        "<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n" +
                        "  <tbody>\n" +
                        "    <tr>\n" +
                        "      <td style=\"width: 50%; border:none\">\n" +
                        "        <img src=\"https://firebasestorage.googleapis.com/v0/b/homebankingapp-4b70f.appspot.com/o/ticketmint%2Fmailassets%2FbannerTicket.png?alt=media&amp;token=1f680708-41ec-4333-bdec-c8e5e3f56ca0\" alt=\"\" width=\"391\" height=\"418\">\n" +
                        "        <br>\n" +
                        "      </td>\n" +
                        "      <td style=\"width: 50%; text-align: center;  border:none\">\n" +
                        "        <span style=\"font-family: tahoma, arial, helvetica, sans-serif; font-size: 18pt;\">Don't waste any more time! Activate your account right now and discover a world of possibilities waiting for you, click here to start enjoying all our exclusive services!\n" +
                        "          <br>\n" +
                        "          <br>\n" +
                        "          <a href=\"http://localhost:5173/verifyTransaction?verifyTransaction=" + ticketie.getClientTicketId()  + "\"' target=\"_blank\" class=\"cloudHQ__gmail_elements_final_btn\" style=\"background-color: #55347b; color: #ffffff; border: 0px solid #000000; border-radius: 3px; box-sizing: border-box; font-size: 13px; font-weight: bold; line-height: 40px; padding: 12px 24px; text-align: center; text-decoration: none; text-transform: uppercase; vertical-align: middle;\" rel=\"noopener\">Accept</a>\n" +
                        "          <a href=\"http://localhost:5173/denyTransaction?denyTransaction=" + ticketie.getClientTicketId() + "\"' target=\"_blank\" class=\"cloudHQ__gmail_elements_final_btn\" style=\"background-color: #55347b; color: #ffffff; border: 0px solid #000000; border-radius: 3px; box-sizing: border-box; font-size: 13px; font-weight: bold; line-height: 40px; padding: 12px 24px; text-align: center; text-decoration: none; text-transform: uppercase; vertical-align: middle;\" rel=\"noopener\">Deny</a>\n" +
                        "          <br>\n" +
                        "        </span>\n" +
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
    public Map<String, Object> verifyTransaction(UUID id) {

        Map<String, Object> response = new HashMap<>();
        try {
            Client admin = clientRepository.findByRole(UserRole.ADMIN);
            Optional<TransitoryTicket> transitoryTicket = transitoryTicketRepository.findByClientTicketId(id);

            if (transitoryTicket.isPresent()) {
                TransitoryTicket transitoryTicket1 = transitoryTicket.get();

                Client sourceClient = clientRepository.findByEmail(transitoryTicket1.getSourceEmail());
                Client destinationClient = clientRepository.findByEmail(transitoryTicket1.getDestinationEmail());

                Optional<ClientTicket> ticketOptional = clientTicketRepository.findById(transitoryTicket1.getClientTicketId());

                if(ticketOptional.isEmpty()){
                    response.put("error", true);
                    response.put("message", "Client Ticket wasn't found!");
                    return response;
                }
                ClientTicket ticket = ticketOptional.get();

                if(!sourceClient.getClientTickets().stream().anyMatch( clientTicket -> clientTicket.getId() == transitoryTicket1.getClientTicketId() )) {
                    response.put("error", true);
                    response.put("message", "The ticket exists but it doesn't belong to the client that requested the transfer");
                    return response;
                }

                if(destinationClient.getClientTickets().contains(ticket)) {
                    response.put("error", true);
                    response.put("message", "The destination client already has that ticket, contact support.");
                    return response;
                }

                if(transitoryTicket1.getBasePrice() > 0) {

                    double ticketPrice = transitoryTicket1.getBasePrice();
                    destinationClient.setBalance(destinationClient.getBalance() - ticketPrice);
                    double commissionFees = ticketPrice * 0.10;
                    double ticketPriceNet = ticketPrice * 0.90;
                    admin.setBalance(admin.getBalance() + commissionFees);
                    sourceClient.setBalance(sourceClient.getBalance() + ticketPriceNet );

                    Transaction sourceTransaction = new Transaction();
                    sourceTransaction.setType(TransactionType.CREDIT);
                    sourceTransaction.setDescription("Ticket sell transaction to: " + destinationClient.getFirstname() + " " + destinationClient.getLastname());
                    sourceTransaction.setDate(new Date());
                    sourceTransaction.setAmount(ticketPriceNet);
                    sourceTransaction.setClient(sourceClient);
                    transactionRepository.save(sourceTransaction);

                    Optional<Event> eventOptional = eventRepository.findById(ticket.getEventId());
                    if (eventOptional.isEmpty()) {
                        response.put("error", true);
                        response.put("message", "The ticket's event wasn't found by the event id present on the ticket");
                        return response;
                    }
                    Event event = eventOptional.get();

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

                } else if (transitoryTicket1.getBasePrice() == 0) {

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
                    if( ticket.getQuantity() == transitoryTicket1.getAvailableQuantity()) {
                        List<ClientTicket> sourceClientTickets = sourceClient.getClientTickets();
                        sourceClientTickets.remove(ticket);

                        List<ClientTicket> destinationClientTickets = destinationClient.getClientTickets();
                        destinationClientTickets.add(ticket);

                        ticket.setClient(destinationClient);

                        clientRepository.save(sourceClient);
                        clientRepository.save(destinationClient);
                        clientTicketRepository.save(ticket);

                        transitoryTicketRepository.delete(transitoryTicket1);

                        response.put("success", true);
                        response.put("message", "The ticket transfer was executed successfully!");

                        return response;

                    } else if (ticket.getQuantity() > transitoryTicket1.getAvailableQuantity()){

                        if(destinationClient.getClientTickets().stream().anyMatch(clientTicket -> clientTicket.getOriginalTicketId() == transitoryTicket1.getClientTicketId() ) ){

                            ticket.setQuantity(ticket.getQuantity() - transitoryTicket1.getAvailableQuantity());
                            clientTicketRepository.save(ticket);

                            Optional<ClientTicket> destinationClientTicketOptional= clientTicketRepository.findById(transitoryTicket1.getClientTicketId());
                            if(destinationClientTicketOptional.isEmpty()) {
                                response.put("error", true);
                                response.put("message", "Destination client wasn't found, but it should exist. Contact support");
                            }
                            ClientTicket destinationClientTicket = destinationClientTicketOptional.get();
                            destinationClientTicket.setQuantity(destinationClientTicket.getQuantity() + transitoryTicket1.getAvailableQuantity());

                            clientTicketRepository.save(destinationClientTicket);
                            clientRepository.save(sourceClient);
                            clientRepository.save(destinationClient);

                            transitoryTicketRepository.delete(transitoryTicket1);

                            response.put("success", true);
                            response.put("message", "The ticket transfer was executed successfully!");

                            return response;
                        }

                        ticket.setQuantity(ticket.getQuantity() - transitoryTicket1.getAvailableQuantity());
                        clientTicketRepository.save(ticket);

                        ClientTicket transferredTicket = new ClientTicket(ticket.getOriginalTicketId(), ticket.getEventId(), ticket.getPrice(), transitoryTicket1.getAvailableQuantity(), ticket.getTicketType());
                        clientTicketRepository.save(transferredTicket);

                        List<ClientTicket> destinationClientTickets = destinationClient.getClientTickets();
                        destinationClientTickets.add(transferredTicket);
                        transferredTicket.setClient(destinationClient);

                        clientRepository.save(sourceClient);
                        clientRepository.save(destinationClient);
                        clientTicketRepository.save(transferredTicket);

                        transitoryTicketRepository.delete(transitoryTicket1);

                        response.put("success", true);
                        response.put("message", "The ticket transfer was executed successfully!");

                        return response;
                    }
                } catch (Exception e){
                    response.put("error", true);
                    response.put("message", "An error occurred transferring the ticket: " + e.getMessage());
                }

            } else {
                response.put("error", true);
                response.put("message", "Transaction already cancelled!");
            }

        }catch (Exception e){

            response.put("error", false);
            response.put("message", "An error occurred while making the ticket transaction: " + e.getMessage());
        }
        return response;
    }

    @Transactional
    public Map<String, Object> deleteTransaction(UUID id) {
        Map<String, Object> response = new HashMap<>();
            Optional<TransitoryTicket> transitoryTicket = transitoryTicketRepository.findByClientTicketId(id);
        try {
            if (transitoryTicket.isPresent()) {
                TransitoryTicket ticket = transitoryTicket.get();
                transitoryTicketRepository.delete(ticket);

                response.put("success", true);
                response.put("message", "Transaction denied!");
            }

        }catch (Exception e){
            response.put("error", false);
            response.put("message", "An error occurred while denying the transaction: " + e.getMessage());
        }
        return response;
    }



}
