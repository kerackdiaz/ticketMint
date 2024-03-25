package com.mindhub.ticketmind.dtos;

import com.mindhub.ticketmind.models.Transaction;
import com.mindhub.ticketmind.models.TransactionType;

import java.util.Date;
import java.util.UUID;

public class TransactionDTO {
    private UUID id;
    private TransactionType type;
    private String description;
    private Date date;


    public TransactionDTO(Transaction transaction) {
        this.id = transaction.getId();
        this.type = transaction.getType();
        this.description = transaction.getDescription();
        this.date = transaction.getDate();
    }


    public UUID getId() {
        return id;
    }

    public TransactionType getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    public Date getDate() {
        return date;
    }
}
