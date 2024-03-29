package com.mindhub.ticketmind.services.service;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import com.mindhub.ticketmind.models.Notification;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Service
public class SocketIOService {

    private SocketIOServer server;

    @PostConstruct
    public void init() {
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(9092);

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
