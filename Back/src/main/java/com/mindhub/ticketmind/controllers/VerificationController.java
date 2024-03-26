package com.mindhub.ticketmind.controllers;

import com.mindhub.ticketmind.services.service.AuthService;
import com.mindhub.ticketmind.services.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class VerificationController {

    @Autowired
    private AuthService authService;

    @Autowired
    private ClientService clientService;

    @GetMapping("/verifyAccount")
    public String verifyAccount(@RequestParam("email") String email) {
        clientService.activateAccountByEmail(email);
        return "redirect:/login";
    }
}
