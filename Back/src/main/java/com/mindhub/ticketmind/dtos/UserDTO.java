package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.models.ClientTicket;
import com.mindhub.ticketmind.models.UserRole;

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
    private List<TicketDTO> ticket;
    private List<ClientTicketDTO> clientTicket;

    public UserDTO(Client client) {
        this.id = client.getId();
        this.email = client.getEmail();
        this.firstname = client.getFirstname();
        this.lastname = client.getLastname();
        this.role = client.getRole();
        this.status = client.isStatus();
        this.balance = client.getBalance();
        this.ticket = client.getTickets().stream().map(TicketDTO::new).collect(Collectors.toList());
        this.clientTicket = client.getClientTickets().stream().map(ClientTicketDTO::new).collect(Collectors.toList());
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



    public List<TicketDTO> getTicket() {
        return ticket;
    }

    public List<ClientTicketDTO> getClientTicket() {
        return clientTicket;
    }

}