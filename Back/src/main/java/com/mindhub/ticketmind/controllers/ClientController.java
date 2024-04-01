package com.mindhub.ticketmind.controllers;

import com.mindhub.ticketmind.dtos.*;
import com.mindhub.ticketmind.models.Client;
import com.mindhub.ticketmind.models.Event;
import com.mindhub.ticketmind.repositories.EventRepository;
import com.mindhub.ticketmind.services.service.ClientService;
import com.mindhub.ticketmind.services.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/client")
public class ClientController {



    @Autowired
    private ClientService clientService;

    @Autowired
    private EventService eventService;



    @GetMapping("/current")
    public ResponseEntity<?> getClient() {
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        Client client = clientService.getClientByEmail(userMail);

        switch (client.getRole()) {
            case CLIENT:
                return ResponseEntity.ok(new UserDTO(client, eventService));
            case AGENCY:
                return ResponseEntity.ok(new AgencyDTO(client));
            case ADMIN:
                List<Client> clients = clientService.getAllClients();
                return ResponseEntity.ok(new AdminDTO(client, clients));
            default:
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }



    @PostMapping("/wallet/deposit")
    public ResponseEntity<?> postLoteriaWinnings(@RequestBody TestRecordDTO testRecordDTO){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(clientService.clientLotteryDeposit(testRecordDTO, userMail), HttpStatus.OK);
    }



    @PutMapping("/current")
    public ResponseEntity<?> updateClient(@RequestBody ProfileFormDTO profileFormDTO) {
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(clientService.updateClient(profileFormDTO, userMail), HttpStatus.OK);
    }

    @PutMapping("/current/profilePic")
    public ResponseEntity<?> updateProfilePic(@RequestBody String img) throws IOException {
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(clientService.changeProfilePicture(userMail, img));
    }


}
