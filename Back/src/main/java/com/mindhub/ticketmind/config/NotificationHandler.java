package com.mindhub.ticketmind.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mindhub.ticketmind.models.Notification;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class NotificationHandler extends TextWebSocketHandler {

    private List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        // Handle incoming messages
    }

    public void sendNotification(Notification notification) throws IOException {
        String notificationJson = new ObjectMapper().writeValueAsString(notification);
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(notificationJson));
            }
        }
    }

    public List<WebSocketSession> getSessions() {
        return sessions;
    }
}