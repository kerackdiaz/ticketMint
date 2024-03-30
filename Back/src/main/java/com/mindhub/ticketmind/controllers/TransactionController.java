package com.mindhub.ticketmind.controllers;


import com.mindhub.ticketmind.dtos.TicketTransactionRecordDTO;
import com.mindhub.ticketmind.dtos.TransactionDTO;
import com.mindhub.ticketmind.dtos.TransactionFormDTO;
import com.mindhub.ticketmind.models.Transaction;
import com.mindhub.ticketmind.services.service.TransactionService;
import com.mindhub.ticketmind.services.service.TransitoryTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private TransitoryTransactionService transitoryTransactionService;

    @PostMapping("/transferTicket")
    public ResponseEntity<?> newTransaction(@RequestBody TicketTransactionRecordDTO ticketTransactionRecordDTO){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(transactionService.makeTicketTransaction(ticketTransactionRecordDTO, userMail), HttpStatus.OK);
    }

    @GetMapping("/verifyTransaction")
    public ResponseEntity<?> verifyTransaction(@RequestParam("verifyTransaction") UUID id) {
        return ResponseEntity.ok(transitoryTransactionService.verifyTransaction(id));
    }

    @GetMapping("/denyTransaction")
    public ResponseEntity<?> denyTransaction(@RequestParam("denyTransaction") UUID id) {
        return ResponseEntity.ok(transitoryTransactionService.deleteTransaction(id));
    }


    //redundant
    @GetMapping("/client/all")
    public ResponseEntity<?> getAllClientTransactions(){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return  new ResponseEntity<>(transactionService.getAllClientTransactions(userMail), HttpStatus.OK);
    }



}
