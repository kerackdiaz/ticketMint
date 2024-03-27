package com.mindhub.ticketmind.controllers;

import com.mindhub.ticketmind.dtos.ClientDTO;
import com.mindhub.ticketmind.services.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client")
public class ClientController {



    @Autowired
    private ClientService clientService;

    @GetMapping("/current")
    public ResponseEntity<?> getClient(){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(new ClientDTO(clientService.getClientByEmail(userMail)));
    }



}
