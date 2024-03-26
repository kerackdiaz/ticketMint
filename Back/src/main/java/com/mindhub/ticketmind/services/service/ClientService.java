package com.mindhub.ticketmind.services.service;

import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;


    public void activateAccountByEmail(String email) {
        Client client = clientRepository.findByEmail(email);
        if (client != null) {
            client.setStatus(true);
            clientRepository.save(client);
        }
    }
}
