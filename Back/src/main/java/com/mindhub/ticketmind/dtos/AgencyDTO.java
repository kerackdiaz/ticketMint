package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.models.UserRole;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class AgencyDTO {

    private UUID id;
    private String email;
    private String firstname;
    private String lastname;
    private UserRole role;
    private boolean status;
    private double balance;

    private String profilePic;

    private Long phone;

    private String address;
    private String companyName;
    private List<EventDTO> events;
    private List<TicketDTO> ticket;

    public AgencyDTO(Client client) {
        this.id = client.getId();
        this.email = client.getEmail();
        this.firstname = client.getFirstname();
        this.lastname = client.getLastname();
        this.role = client.getRole();
        this.status = client.isStatus();
        this.balance = client.getBalance();
        this.companyName = client.getCompanyName();
        this.events = client.getEvent().stream().map(EventDTO::new).collect(Collectors.toList());
        this.ticket = client.getTickets().stream().map(TicketDTO::new).collect(Collectors.toList());
        this.profilePic = client.getProfilePic()!= null ? client.getProfilePic() : "https://firebasestorage.googleapis.com/v0/b/homebankingapp-4b70f.appspot.com/o/ticketmint%2FAvatar%2Fpp-ulver-bank.jpg?alt=media&token=c2d29368-0f78-4b2b-b845-fd5100e0c70c";
        this.phone = client.getPhone();
        this.address = client.getAddress();
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

    public String getCompanyName() {
        return companyName;
    }

    public List<EventDTO> getEvents() {
        return events;
    }

    public List<TicketDTO> getTicket() {
        return ticket;
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
}
