package com.mindhub.ticketmind.controllers;

import com.mindhub.ticketmind.dtos.AdminDTO;
import com.mindhub.ticketmind.dtos.AgencyDTO;
import com.mindhub.ticketmind.dtos.ClientDTO;
import com.mindhub.ticketmind.dtos.UserDTO;
import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.services.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/client")
public class ClientController {



    @Autowired
    private ClientService clientService;

    @GetMapping("/current")
    public ResponseEntity<?> getClient() {
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        Client client = clientService.getClientByEmail(userMail);

        switch (client.getRole()) {
            case CLIENT:
                return ResponseEntity.ok(new UserDTO(client));
            case AGENCY:
                return ResponseEntity.ok(new AgencyDTO(client));
            case ADMIN:
                List<Client> clients = clientService.getAllClients();
                return ResponseEntity.ok(new AdminDTO(client, clients));
            default:
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }



}
