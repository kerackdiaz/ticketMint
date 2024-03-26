package com.mindhub.ticketmind.dtos;

import java.util.Date;
import java.util.List;

public record EventFormDTO(String name,String description, List<String> categories, String imageURL,Date date,String venueName,String venueURL,String city) {
}