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

    private String profilePic;

    private Long phone;

    private String address;
    private List<ClientDTO> clients;
    private List<TransactionDTO> transaction;

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
        this.profilePic = client.getProfilePic()!= null ? client.getProfilePic() : "https://firebasestorage.googleapis.com/v0/b/homebankingapp-4b70f.appspot.com/o/ticketmint%2FAvatar%2Fpp-ulver-bank.jpg?alt=media&token=c2d29368-0f78-4b2b-b845-fd5100e0c70c";
        this.phone = client.getPhone();
        this.address = client.getAddress();
        this.transaction = client.getTransactions().stream().map(TransactionDTO::new).collect(Collectors.toList());
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

    public List<ClientDTO> getClients() {
        return clients;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public Long getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public List<TransactionDTO> getTransactions() {
        return transaction;
    }
}
