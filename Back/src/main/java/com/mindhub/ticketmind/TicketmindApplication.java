package com.mindhub.ticketmind;

import com.mindhub.ticketmind.models.*;
import com.mindhub.ticketmind.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
@EnableScheduling
public class TicketmindApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketmindApplication.class, args);


		System.out.println("\033[0;34m" + "initialized application" + "\033[0m");
	}

	@Autowired
	private PasswordEncoder passwordEncoder;
	@Bean
	public CommandLineRunner initData(CategoryEventRepository categoryEventRepository, CityRepository cityRepository, EventRepository eventRepository, ClientRepository clientRepository, TicketRepository ticketRepository, TransactionRepository transactionRepository ) {
		return  args -> {

			Client newAdmin = new Client();
			newAdmin.setEmail("admin@example.com");
			newAdmin.setFirstname("Admin");
			newAdmin.setLastname("User");
			newAdmin.setPassword(passwordEncoder.encode("123456"));
			newAdmin.setRole(UserRole.ADMIN);
			newAdmin.setStatus(true);
			clientRepository.save(newAdmin);

			Client client = new Client();
			client.setEmail("user@example.com");
			client.setFirstname("Jon ");
			client.setLastname("Smith");
			client.setPassword(passwordEncoder.encode("123456"));
			client.setRole(UserRole.CLIENT);
			client.setStatus(true);

			client.setBalance(10000);
			clientRepository.save(client);



			Client agency = new Client("agency@example.com","Richard","Kaos", passwordEncoder.encode("123456") , UserRole.AGENCY);
			agency.setStatus(true);
			clientRepository.save(agency);

	};}

}
