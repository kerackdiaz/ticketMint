package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.Notification;

import java.util.Date;
import java.util.UUID;

public class NotificationDTO {
    private UUID id;
    private String message;
    private UUID eventId;
    private String date;


    public NotificationDTO(Notification notification) {
        this.id = notification.getId();
        this.message = notification.getMessage();
        this.date = notification.getDate();
        this.eventId = notification.getEvent().getId();
    }

    public NotificationDTO() {
    }

    public UUID getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public UUID getEventId() {
        return eventId;
    }

    public String getDate() { return date;}
}
