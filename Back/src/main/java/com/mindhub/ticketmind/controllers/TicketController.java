package com.mindhub.ticketmind.controllers;

import com.mindhub.ticketmind.dtos.TicketDTO;
import com.mindhub.ticketmind.dtos.TicketFormDTO;
import com.mindhub.ticketmind.models.Ticket;
import com.mindhub.ticketmind.services.service.ClientService;
import com.mindhub.ticketmind.services.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private EventService eventService;
    @Autowired
    private ClientService clientService;

    @GetMapping("/client/tickets")
    public ResponseEntity<List<Ticket>> getAllClientTickets(){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(clientService.getAllClientTickets(userMail), HttpStatus.OK);

    }

    @GetMapping("/{eventId}")
    public ResponseEntity<List<Ticket>> getAllTicketsByEvent(@PathVariable UUID eventId) {
        List<Ticket> tickets = eventService.getTicketsByEvent(eventId);
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }

    @PostMapping("/create/{eventId}")
    public ResponseEntity<?> createTicket(@PathVariable UUID eventId, @RequestBody TicketFormDTO ticketFormDTO) {
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(eventService.createTicket(eventId,ticketFormDTO, userMail), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{ticketId}")
    public ResponseEntity<Void> deleteTicket(@PathVariable UUID ticketId) {
        eventService.deleteTicket(ticketId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTickets(){
        return new ResponseEntity<>(eventService.getAllTickets(), HttpStatus.OK);
    }

}
