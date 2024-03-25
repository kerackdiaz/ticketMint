package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.User;
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

    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.role = user.getRole();
        this.status = user.isStatus();
        this.balance = user.getBalance();
        this.commission = user.getCommission();
        this.companyName = user.getCompanyName();
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
