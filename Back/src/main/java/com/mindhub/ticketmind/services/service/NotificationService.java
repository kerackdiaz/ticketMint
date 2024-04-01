package com.mindhub.ticketmind.services.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mindhub.ticketmind.config.NotificationHandler;
import com.mindhub.ticketmind.models.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

@Service
public class NotificationService {

    @Autowired
    private NotificationHandler notificationHandler;

    public void sendNotification(Notification notification) throws IOException {
        String notificationJson = new ObjectMapper().writeValueAsString(notification);
        for (WebSocketSession session : notificationHandler.getSessions()) {
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(notificationJson));
            }
        }
    }
}