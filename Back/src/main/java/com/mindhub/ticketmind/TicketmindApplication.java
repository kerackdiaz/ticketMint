package com.mindhub.ticketmind;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TicketmindApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketmindApplication.class, args);

		System.out.println("\033[0;34m" + "initialized application" + "\033[0m");
	}


}
