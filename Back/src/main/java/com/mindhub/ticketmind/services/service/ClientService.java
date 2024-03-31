package com.mindhub.ticketmind.services.service;

import com.mindhub.ticketmind.dtos.TestRecordDTO;
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
    //kjjj hecho verga el metodo este
//        Map<String, Object> response = new HashMap<>();
//        Client client = clientRepository.findByEmail(email);
//
//
//    }


    public Map<String, Object> clientLotteryDeposit(TestRecordDTO testRecordDTO, String userEmail){
        Client client = clientRepository.findByEmail(userEmail);
        Map<String, Object> response = new HashMap<>();
        try {
            if(client != null){
                client.setBalance(testRecordDTO.platita());
                clientRepository.save(client);
                response.put("success", true);
                response.put("message", "el quini6 sale bien");
            } else {
                response.put("error", true);
                response.put("message", "el quini6 no sale bien ekisde");
            }
            return response;
        } catch (Exception e) {
            response.put("error", true);
            response.put("message", "epa que salió mal che: " + e.getMessage());
        }
        return response;
    }


}
