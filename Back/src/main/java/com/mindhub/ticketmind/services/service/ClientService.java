package com.mindhub.ticketmind.services.service;

import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

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




    public Client getClientByEmail(String email) {
        return clientRepository.findByEmail(email);
    }
}
