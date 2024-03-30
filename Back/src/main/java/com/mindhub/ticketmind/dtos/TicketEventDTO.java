package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.Event;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class TicketEventDTO {
    private UUID id;
    private String name;
    private String description;
    private String imageURL;
    private Date date;
    private Date time;
    private String venueName;
    private String venueURL;
    private CityDTO city;

    private boolean status = false;


    public TicketEventDTO(Event event) {
        this.id = event.getId();
        this.name = event.getName();
        this.description = event.getDescription();
        this.imageURL = event.getImageURL();
        this.date = event.getDate();
        this.time = event.getDate();
        this.venueName = event.getVenueName();
        this.venueURL = event.getVenueURL();
        this.city = new CityDTO(event.getCity());
        this.status = event.isStatus();}

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getImageURL() {
        return imageURL;
    }

    public String getDate() {
        SimpleDateFormat formatter = new SimpleDateFormat("EEE dd MMM");
        return formatter.format(this.date);
    }
    public String getTime() {
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");
        return formatter.format(this.date);
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
    public boolean isStatus() {
        return status;
    }
}
