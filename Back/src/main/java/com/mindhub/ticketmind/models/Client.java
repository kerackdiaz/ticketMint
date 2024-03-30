package com.mindhub.ticketmind.models;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class Client {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique=true)
    private String email;
    private String firstname;
    private String lastname;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private boolean status = false;

    private double balance;

    private double commission;

    private String companyName;

    private String profilePic;

    private Long phone;

    private String address;

    @OneToMany(mappedBy = "client")
    private List<Event> event;

    @OneToMany(mappedBy = "client")
    private List<Transaction> transactions;

    @ManyToMany
    @JoinTable(name= "favorites", joinColumns = @JoinColumn(name="client_id"), inverseJoinColumns = @JoinColumn(name="event_id"))
    private List<Event> myFavoritesEvents;

    @OneToMany(mappedBy = "client")
    private List<Ticket> tickets;

    @OneToMany(mappedBy = "client")
    private List<ClientTicket> clientTickets;

    @OneToMany(mappedBy = "client")
    private List<Notification> notifications;


    public Client() {
    }

    public Client(String email, String firstname, String lastname, String password, UserRole role) {
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.role = role;
    }


    public UUID getId() {
        return id;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public double getCommission() {
        return commission;
    }

    public void setCommission(double commission) {
        this.commission = commission;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public List<Event> getEvent() {
        return event;
    }

    public void setEvent(List<Event> event) {
        this.event = event;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }


    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public Long getPhone() {
        return phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<ClientTicket> getClientTickets() {
        return clientTickets;
    }

    public void setClientTickets(List<ClientTicket> clientTickets) {
        this.clientTickets = clientTickets;
    }

    public void addTicket(Ticket ticket) {
        ticket.setClient(this);
        tickets.add(ticket);
    }
}
