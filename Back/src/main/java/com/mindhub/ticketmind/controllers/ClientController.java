package com.mindhub.ticketmind.controllers;

import com.mindhub.ticketmind.services.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client")
public class ClientController {



    @Autowired
    private ClientService clientService;



}
