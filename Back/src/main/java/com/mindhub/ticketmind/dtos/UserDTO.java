package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.models.UserRole;

import java.util.UUID;

public class UserDTO {

    private UUID id;
    private String email;
    private String firstname;
    private String lastname;
    private UserRole role;
    private boolean status;
    private double balance;
    private double commission;
    private String companyName;

    public UserDTO(Client client) {
        this.id = client.getId();
        this.email = client.getEmail();
        this.firstname = client.getFirstname();
        this.lastname = client.getLastname();
        this.role = client.getRole();
        this.status = client.isStatus();
        this.balance = client.getBalance();
        this.commission = client.getCommission();
        this.companyName = client.getCompanyName();
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

    public double getCommission() {
        return commission;
    }

    public String getCompanyName() {
        return companyName;
    }
}
