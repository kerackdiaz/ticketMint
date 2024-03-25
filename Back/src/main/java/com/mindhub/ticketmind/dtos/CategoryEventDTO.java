package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.CategoryEvent;

public class CategoryEventDTO {
    private long id;
    private String name;


    public CategoryEventDTO(CategoryEvent categoryEvent) {
        this.id = categoryEvent.getId();
        this.name = categoryEvent.getName();
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
