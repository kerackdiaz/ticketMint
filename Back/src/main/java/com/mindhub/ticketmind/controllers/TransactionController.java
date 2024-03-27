package com.mindhub.ticketmind.controllers;

<<<<<<< HEAD
import com.mindhub.ticketmind.dtos.TransactionDTO;
import com.mindhub.ticketmind.dtos.TransactionFormDTO;
=======

import com.mindhub.ticketmind.dtos.TicketTransactionRecordDTO;

import com.mindhub.ticketmind.models.Transaction;
>>>>>>> origin/Ticket-Transfer-Test-Nico
import com.mindhub.ticketmind.services.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
<<<<<<< HEAD
import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

=======

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
>>>>>>> origin/Ticket-Transfer-Test-Nico
    @Autowired
    private TransactionService transactionService;

    @GetMapping("/all")
<<<<<<< HEAD
    public ResponseEntity<List<TransactionDTO>> getAllTransactions() {
        List<TransactionDTO> transactions = transactionService.getAllTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @PostMapping("/buy")
    public ResponseEntity<?> createTransaction(@RequestBody TransactionFormDTO transactionFormDTO){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(transactionService.createTransaction(transactionFormDTO, userMail), HttpStatus.CREATED);
    }
=======
    public ResponseEntity<List<Transaction>> getAllEvents() {
        List<Transaction> allTransactions = transactionService.getAllTransactions();
        return new ResponseEntity<>(allTransactions, HttpStatus.OK);
    }
    @PostMapping("/transferTicket")
    public ResponseEntity<?> newTransaction(@RequestBody TicketTransactionRecordDTO ticketTransactionRecordDTO){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(transactionService.makeTicketTransaction(ticketTransactionRecordDTO, userMail), HttpStatus.OK);
    }

>>>>>>> origin/Ticket-Transfer-Test-Nico

}
