package com.mindhub.ticketmind.models;

import jakarta.persistence.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String message;

    private Date date;

    @ManyToOne
    @JoinColumn(name = "event")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    public Notification() {
    }

    public Notification(String message, Event event, Date date) {
        this.message = message;
        this.event = event;
        this.date = date;
    }

    public UUID getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getDate() {
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm EEE dd MMM");
        return formatter.format(this.date);
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
