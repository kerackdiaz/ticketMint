package com.mindhub.ticketmind.services.service;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import com.mindhub.ticketmind.models.Notification;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;


@Service
public class SocketIOService extends TextWebSocketHandler {


    private SocketIOServer server;

    @PostConstruct
    public void init() {
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(9092);

        // Configurar CORS
        com.corundumstudio.socketio.HandshakeData data;
        config.setOrigin("http://localhost:5173");

        server = new SocketIOServer(config);
        server.start();
    }

    @PreDestroy
    public void stop() {
        server.stop();
    }

    public SocketIOServer getServer() {
        return server;
    }

    public void sendNotification(Notification notification) {
        server.getBroadcastOperations().sendEvent("notification", notification);
    }
}
