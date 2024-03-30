package com.mindhub.ticketmind.services.service;

import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.models.Ticket;
import com.mindhub.ticketmind.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;



    public Map<String, Object> activateAccount(UUID id) {
        Map<String, Object> response = new HashMap<>();
       try {
           Optional<Client> client = clientRepository.findById(id);
           if (client.isPresent()) {
               Client user = client.get();
               user.setStatus(true);
               clientRepository.save(user);
               response.put("success", true);
               response.put("message", "Account activate successfully");
           }

       }catch (Exception e){

           response.put("error", false);
           response.put("message", "An error occurred while deleting ticket: " + e.getMessage());
       }
       return response;
       }


    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    public List<Ticket> getAllClientTickets(String email){
            Client client = clientRepository.findByEmail(email);
            return client.getTickets();
    }

//    public Map<String, Object> buyTicket(UUID ticketId, String email){
//        Map<String, Object> response = new HashMap<>();
//        Client client = clientRepository.findByEmail(email);
//
//
//    }



}
