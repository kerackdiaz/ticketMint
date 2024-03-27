package com.mindhub.ticketmind.controllers;


import com.mindhub.ticketmind.dtos.EventFormDTO;
import com.mindhub.ticketmind.dtos.NotificationRecord;
import com.mindhub.ticketmind.models.Event;
import com.mindhub.ticketmind.services.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;


    @GetMapping("/all")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }




    @PostMapping("/create/event")
    public ResponseEntity<?> createEvent(@RequestBody EventFormDTO eventFormDTO) {
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(eventService.createEvent(eventFormDTO, userMail), HttpStatus.CREATED);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable UUID id) {
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(eventService.deleteEvent(id, userMail), HttpStatus.OK);
    }



    @PostMapping("/newalert")
    public ResponseEntity<?> newAlert(@RequestBody NotificationRecord notificationRecord){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(eventService.newAlert(notificationRecord, userMail), HttpStatus.OK);
    }

    @DeleteMapping("/deleteAlert/{id}")
    public ResponseEntity<?> deleteAlert(@PathVariable UUID id) {
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(eventService.deleteAlert(id, userMail), HttpStatus.OK);
    }
}
