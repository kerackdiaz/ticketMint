package com.mindhub.ticketmind.controllers;


import com.mindhub.ticketmind.dtos.TicketTransactionRecordDTO;
import com.mindhub.ticketmind.dtos.TransactionDTO;
import com.mindhub.ticketmind.dtos.TransactionFormDTO;
import com.mindhub.ticketmind.models.Transaction;
import com.mindhub.ticketmind.models.TransitoryTicket;
import com.mindhub.ticketmind.repositories.TransitoryTicketRepository;
import com.mindhub.ticketmind.services.service.TransactionService;
import com.mindhub.ticketmind.services.service.TransitoryTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    private TransitoryTransactionService transitoryTransactionService;
    @Autowired
    private TransitoryTicketRepository transitoryTicketRepository;

    @PostMapping("/transferTicket")
    public ResponseEntity<?> newTransaction(@RequestBody TicketTransactionRecordDTO ticketTransactionRecordDTO){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(transitoryTransactionService.makeTicketTransaction(ticketTransactionRecordDTO, userMail), HttpStatus.OK);
    }

    @GetMapping("/verifyTransaction")
    public ResponseEntity<?> verifyTransaction(@RequestParam("verifyTransaction") UUID kei) {
        return new ResponseEntity<>(transitoryTransactionService.verifyTransaction(kei), HttpStatus.OK);
    }

    @GetMapping("/denyTransaction")
    public ResponseEntity<?> denyTransaction(@RequestParam("denyTransaction") UUID id) {
        return new ResponseEntity<>(transitoryTransactionService.deleteTransaction(id), HttpStatus.OK);
    }

}
