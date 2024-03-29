package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.models.UserRole;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class AdminDTO {

    private UUID id;
    private String email;
    private String firstname;
    private String lastname;
    private UserRole role;
    private boolean status;
    private double balance;
    private double commission;
    private List<ClientDTO> clients;

    public AdminDTO(Client client, List<Client> clients) {
        this.id = client.getId();
        this.email = client.getEmail();
        this.firstname = client.getFirstname();
        this.lastname = client.getLastname();
        this.role = client.getRole();
        this.status = client.isStatus();
        this.balance = client.getBalance();
        this.commission = client.getCommission();
        this.clients = clients.stream().map(ClientDTO::new).collect(Collectors.toList());
    }

}
