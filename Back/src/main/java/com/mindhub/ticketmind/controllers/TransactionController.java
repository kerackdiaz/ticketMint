package com.mindhub.ticketmind.controllers;


import com.mindhub.ticketmind.dtos.TicketTransactionRecordDTO;

import com.mindhub.ticketmind.models.Transaction;
import com.mindhub.ticketmind.services.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @GetMapping("/all")
    public ResponseEntity<List<Transaction>> getAllEvents() {
        List<Transaction> allTransactions = transactionService.getAllTransactions();
        return new ResponseEntity<>(allTransactions, HttpStatus.OK);
    }
    @PostMapping("/transferTicket")
    public ResponseEntity<?> newTransaction(@RequestBody TicketTransactionRecordDTO ticketTransactionRecordDTO){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(transactionService.makeTicketTransaction(ticketTransactionRecordDTO, userMail), HttpStatus.OK);
    }


}
