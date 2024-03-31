package com.mindhub.ticketmind.services.service;


import com.mindhub.ticketmind.dtos.TestRecordDTO;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mindhub.ticketmind.dtos.ProfileFormDTO;
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

        } catch (Exception e) {

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


    public Map<String, Object> updateClient(ProfileFormDTO profileFormDTO, String email) {
        Map<String, Object> response = new HashMap<>();
        try {
            Client client = clientRepository.findByEmail(email);
            if (client == null) {
                response.put("error", false);
                response.put("message", "Client not found");
                return response;
            }
            if (profileFormDTO.agencyName() != null && !profileFormDTO.agencyName().isBlank()) {
                client.setCompanyName(profileFormDTO.agencyName());
            }
            if (profileFormDTO.password() != null && !profileFormDTO.password().isBlank()) {
                if (profileFormDTO.password().length() < 8) {
                    response.put("error", false);
                    response.put("message", "Password must be at least 8 characters long");
                    return response;
                }
                if (!profileFormDTO.password().matches(".*\\d.*") ) {
                    response.put("error", false);
                    response.put("message", "Password must contain at least one number");
                    return response;
                }
                if (!profileFormDTO.password().matches(".*[a-z].*")) {
                    response.put("error", false);
                    response.put("message", "Password must contain at least one lowercase letter");
                    return response;
                }

                if (!profileFormDTO.password().matches(".*[A-Z].*")) {
                    response.put("error", false);
                    response.put("message", "Password must contain at least one uppercase letter");
                    return response;
                }
                client.setPassword(profileFormDTO.password());
            }
            if (profileFormDTO.phoneNumber() != 0 ) {
                client.setPhone(profileFormDTO.phoneNumber());
            }
            if (profileFormDTO.address() != null && !profileFormDTO.address().isBlank()) {
                client.setAddress(profileFormDTO.address());
            }
            clientRepository.save(client);
            response.put("success", true);
            response.put("message", "Profile updated successfully");
        } catch (Exception e) {
            response.put("error", false);
            response.put("message", "An error occurred while updating profile: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> changeProfilePicture(String email, String img)  {
        Map<String, Object> response = new HashMap<>();
        Client client = clientRepository.findByEmail(email);
        try{


            if (client != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.readTree(img);
                String url = jsonNode.get("img").asText();
                System.out.println(url);
                client.setProfilePic(url);
                clientRepository.save(client);
                response.put("success", true);
                response.put("message", "Profile picture updated successfully");

            } else {
                response.put("error", false);
                response.put("message", "Client not found");
            }
        } catch (Exception e) {
            response.put("error", false);
            response.put("message", "An error occurred while updating profile picture: " + e.getMessage());
        }
        return response;
    }



}
