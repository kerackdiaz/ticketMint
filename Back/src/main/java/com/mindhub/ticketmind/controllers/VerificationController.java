package com.mindhub.ticketmind.controllers;

import com.mindhub.ticketmind.services.service.AuthService;
import com.mindhub.ticketmind.services.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class VerificationController {

    @Autowired
    private AuthService authService;

    @Autowired
    private ClientService clientService;

    @GetMapping("/verifyAccount")
    public ResponseEntity<?> verifyAccount(@RequestParam("token") UUID id) {
        return ResponseEntity.ok(clientService.activateAccount(id));
        }


}
