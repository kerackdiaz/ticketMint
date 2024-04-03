package com.mindhub.ticketmind.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonIdentityInfo( generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    @Column(length = 800)
    private String description;

    @ManyToMany
    private List<CategoryEvent> categories;

    @Column(length = 800)
    private String imageURL;
    private Date date;
    private String venueName;

    @Column(length = 800)
    private String venueURL;

    private boolean status = false;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @OneToMany(mappedBy = "event")
    private List<Notification> notifications;

    @OneToMany(mappedBy = "event")
    private List<Ticket> ticketTypes;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    public Event() {
    }

    public Event(String name, String description, List<CategoryEvent> categories, String imageURL, Date date, String venueName, String venueURL, City city) {
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.imageURL = imageURL;
        this.date = date;
        this.venueName = venueName;
        this.venueURL = venueURL;
        this.city = city;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<CategoryEvent> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryEvent> categories) {
        this.categories = categories;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getVenueName() {
        return venueName;
    }

    public void setVenueName(String venueName) {
        this.venueName = venueName;
    }

    public String getVenueURL() {
        return venueURL;
    }

    public void setVenueURL(String venueURL) {
        this.venueURL = venueURL;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public List<Ticket> getTicketTypes() {
        return ticketTypes;
    }

    public void setTicketTypes(List<Ticket> ticketTypes) {
        this.ticketTypes = ticketTypes;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }


    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
