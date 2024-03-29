package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.Notification;

import java.util.Date;
import java.util.UUID;

public class NotificationDTO {
    private UUID id;
    private String message;
    private EventDTO event;

    private String date;


    public NotificationDTO(Notification notification) {
        this.id = notification.getId();
        this.message = notification.getMessage();
        this.date = notification.getDate();
    }

    public UUID getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public EventDTO getEvent() {
        return event;
    }

    public String getDate() { return date;}
}
