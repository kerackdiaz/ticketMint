package com.mindhub.ticketmind;

import com.mindhub.ticketmind.models.*;
import com.mindhub.ticketmind.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class TicketmindApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketmindApplication.class, args);


		System.out.println("\033[0;34m" + "initialized application" + "\033[0m");
	}




}
