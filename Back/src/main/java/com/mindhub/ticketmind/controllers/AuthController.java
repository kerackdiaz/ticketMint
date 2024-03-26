package com.mindhub.ticketmind.controllers;

import com.mindhub.ticketmind.dtos.LoginDTO;
import com.mindhub.ticketmind.dtos.RegisterDTO;
import com.mindhub.ticketmind.services.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        return new ResponseEntity<>(authService.login(loginDTO), HttpStatus.OK);
    }

    @PostMapping("/register/user")
    public ResponseEntity<?> registerUser(@RequestBody RegisterDTO registerDTO) {
        String role = "CLIENT";
        return new ResponseEntity<>(authService.register(registerDTO, role), HttpStatus.CREATED);
    }

    @PostMapping("/register/agency")
    public ResponseEntity<?> registerAgency(@RequestBody RegisterDTO registerDTO) {
        String role = "AGENCY";
        return new ResponseEntity<>(authService.register(registerDTO, role), HttpStatus.CREATED);
    }
}
