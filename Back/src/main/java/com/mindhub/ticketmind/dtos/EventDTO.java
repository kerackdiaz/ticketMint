package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.Event;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class EventDTO {
    private UUID id;
    private String name;
    private String description;
    private List<CategoryEventDTO> categories;
    private String imageURL;
    private Date date;
    private String venueName;
    private String venueURL;
    private CityDTO city;
    private List<NotificationDTO> notifications;
    private List<TicketDTO> ticketTypes;
    private String onwer;

    private boolean status = false;


    public EventDTO(Event event) {
        this.id = event.getId();
        this.name = event.getName();
        this.description = event.getDescription();
        this.categories = event.getCategories().stream().map(CategoryEventDTO::new).collect(Collectors.toList());
        this.imageURL = event.getImageURL();
        this.date = event.getDate();
        this.venueName = event.getVenueName();
        this.venueURL = event.getVenueURL();
        this.city = new CityDTO(event.getCity());
        this.notifications = event.getNotifications().stream().map(NotificationDTO::new).collect(Collectors.toList());
        this.ticketTypes = event.getTicketTypes().stream().map(TicketDTO::new).collect(Collectors.toList());
        this.status = event.isStatus();
        this.onwer = event.getClient().getCompanyName();
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<CategoryEventDTO> getCategories() {
        return categories;
    }

    public String getImageURL() {
        return imageURL;
    }

    public String getDate() {
        SimpleDateFormat formatter = new SimpleDateFormat("EEEE, MMMM dd");
        return formatter.format(date);
    }

    public String getVenueName() {
        return venueName;
    }

    public String getVenueURL() {
        return venueURL;
    }

    public CityDTO getCity() {
        return city;
    }

    public List<NotificationDTO> getNotifications() {
        return notifications;
    }

    public List<TicketDTO> getTicketTypes() {
        return ticketTypes;
    }

    public boolean isStatus() {
        return status;
    }

    public String getOnwer() {
        return onwer;
    }
}
