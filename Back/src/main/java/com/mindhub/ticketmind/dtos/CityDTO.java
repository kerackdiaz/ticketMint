package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.City;

public class CityDTO {

    private long id;
    private String name;

    public CityDTO(City city) {
        this.id = city.getId();
        this.name = city.getName();
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
