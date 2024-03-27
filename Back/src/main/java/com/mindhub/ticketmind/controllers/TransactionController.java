package com.mindhub.ticketmind.controllers;

import com.mindhub.ticketmind.dtos.TransactionDTO;
import com.mindhub.ticketmind.dtos.TransactionFormDTO;
import com.mindhub.ticketmind.services.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/all")
    public ResponseEntity<List<TransactionDTO>> getAllTransactions() {
        List<TransactionDTO> transactions = transactionService.getAllTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @PostMapping("/buy")
    public ResponseEntity<?> createTransaction(@RequestBody TransactionFormDTO transactionFormDTO){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(transactionService.createTransaction(transactionFormDTO, userMail), HttpStatus.CREATED);
    }

}
