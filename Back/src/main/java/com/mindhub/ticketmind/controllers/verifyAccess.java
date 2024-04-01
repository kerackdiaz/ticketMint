package com.mindhub.ticketmind.controllers;

import com.mindhub.ticketmind.services.service.VerifyAccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class verifyAccess {

    @Autowired
    private VerifyAccessService verifyAccessService;
    @PutMapping("/verifyAccess")
    public ResponseEntity<?>  verifyAccess(@RequestParam UUID id) {

        return new ResponseEntity<>(verifyAccessService, HttpStatus.OK);
    }
}
