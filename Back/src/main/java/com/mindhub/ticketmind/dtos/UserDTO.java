package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.models.UserRole;
import com.mindhub.ticketmind.services.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class UserDTO {

    private UUID id;
    private String email;
    private String firstname;
    private String lastname;
    private UserRole role;
    private boolean status;
    private double balance;

    private List<TransactionDTO> transactions;

    private List<ClientTicketDTO> clientTicket;
    private List<NotificationDTO> notifications;
    private List<EventDTO> events;

    private EventService eventService;


    public UserDTO(Client client, EventService eventService) {
        this.id = client.getId();
        this.email = client.getEmail();
        this.firstname = client.getFirstname();
        this.lastname = client.getLastname();
        this.role = client.getRole();
        this.status = client.isStatus();
        this.balance = client.getBalance();
        this.transactions = client.getTransactions().stream().map(TransactionDTO::new).collect(Collectors.toList());
        this.clientTicket = client.getClientTickets().stream().map(ClientTicketDTO::new).collect(Collectors.toList());
        this.eventService = eventService;
        this.events = eventService.getAllEvents();
        this.notifications = getNotifications();
    }

    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public UserRole getRole() {
        return role;
    }

    public boolean isStatus() {
        return status;
    }

    public double getBalance() {
        return balance;
    }

    public List<TransactionDTO> getTransactions() {
        return transactions;
    }

    public List<EventDTO> getEvents() {
        List<UUID> eventIds = clientTicket.stream()
                .map(ClientTicketDTO::getEventId)
                .collect(Collectors.toList());

        List<EventDTO> filteredEvents = events.stream()
                .filter(event -> eventIds.contains(event.getId()))
                .collect(Collectors.toList());
        return filteredEvents;
    }



    public List<NotificationDTO> getNotifications() {
        List<UUID> eventIds = clientTicket.stream()
                .map(ClientTicketDTO::getEventId)
                .collect(Collectors.toList());

        List<EventDTO> filteredEvents = events.stream()
                .filter(event -> eventIds.contains(event.getId()))
                .collect(Collectors.toList());

        return filteredEvents.stream()
                .flatMap(event -> event.getNotifications().stream())
                .collect(Collectors.toList());}

    public List<ClientTicketDTO> getClientTicket() {
        return clientTicket;
    }

}
