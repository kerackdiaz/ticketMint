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

//	@Autowired
//	private PasswordEncoder passwordEncoder;
//	@Bean
//	public CommandLineRunner initData(CategoryEventRepository categoryEventRepository, CityRepository cityRepository, EventRepository eventRepository, ClientRepository clientRepository, TicketRepository ticketRepository) {
//		return  args -> {
//
//			Client newAdmin = new Client();
//			newAdmin.setEmail("admin@example.com");
//			newAdmin.setFirstname("Admin");
//			newAdmin.setLastname("User");
//			newAdmin.setPassword(passwordEncoder.encode("123456"));
//			newAdmin.setRole(UserRole.ADMIN);
//			newAdmin.setStatus(true);
//			clientRepository.save(newAdmin);
//
//			Client client = new Client();
//			client.setEmail("user@example.com");
//			client.setFirstname("Jon ");
//			client.setLastname("Smith");
//			client.setPassword(passwordEncoder.encode("123456"));
//			client.setRole(UserRole.CLIENT);
//			client.setStatus(true);
//			clientRepository.save(client);
//
//
//
//			Client agency = new Client("agency@example.com","Richard","Kaos", passwordEncoder.encode("123456") , UserRole.AGENCY);
//			agency.setStatus(true);
//			clientRepository.save(agency);
//// Crear instancias de las categorías
//			CategoryEvent musica = new CategoryEvent("Música");
//			CategoryEvent entretenimiento = new CategoryEvent("Entretenimiento");
//			CategoryEvent arte = new CategoryEvent("Arte");
//			CategoryEvent cultura = new CategoryEvent("Cultura");
//			CategoryEvent tecnologia = new CategoryEvent("Tecnología");
//			CategoryEvent conferencias = new CategoryEvent("Conferencias");
//
//			// Crear instancias de las ciudades
//			City buenosAires = new City("Buenos Aires");
//			City madrid = new City("Madrid");
//			City nuevaYork = new City("Nueva York");
//
//			cityRepository.save(buenosAires);
//			cityRepository.save(madrid);
//			cityRepository.save(nuevaYork);
//			// Crear lista de categorías para cada evento
//			List<CategoryEvent> conciertoCategories = new ArrayList<>();
//			conciertoCategories.add(musica);
//			conciertoCategories.add(entretenimiento);
//
//			List<CategoryEvent> exposicionCategories = new ArrayList<>();
//			exposicionCategories.add(arte);
//			exposicionCategories.add(cultura);
//
//			List<CategoryEvent> conferenciaCategories = new ArrayList<>();
//			conferenciaCategories.add(tecnologia);
//			conferenciaCategories.add(conferencias);
//
//
//			categoryEventRepository.save(musica);
//			categoryEventRepository.save(entretenimiento);
//			categoryEventRepository.save(arte);
//			categoryEventRepository.save(cultura);
//			categoryEventRepository.save(tecnologia);
//			categoryEventRepository.save(conferencias);
//			// Crear los eventos
//			Event concierto = new Event("Concierto de Rock", "Disfruta de una noche llena de energía con las mejores bandas de rock del momento.",
//					conciertoCategories, "https://ejemplo.com/imagen1.jpg", new Date(124, 3, 15), "Estadio Principal",
//					"https://ejemplo.com/estadio1", buenosAires);
//
//			Event exposicion = new Event("Exposición de Arte Contemporáneo", "Descubre las últimas tendencias en el mundo del arte contemporáneo en esta exposición única.",
//					exposicionCategories, "https://ejemplo.com/imagen2.jpg", new Date(124, 4, 20), "Galería de Arte Moderno",
//					"https://ejemplo.com/galeria", madrid);
//
//			Event conferencia = new Event("Conferencia de Tecnología e Innovación", "Únete a expertos de la industria para explorar las últimas innovaciones y tendencias tecnológicas.",
//					conferenciaCategories, "https://ejemplo.com/imagen3.jpg", new Date(124, 5, 10), "Centro de Convenciones",
//					"https://ejemplo.com/centro_convenciones", nuevaYork);
//
//			conferencia.setClient(agency);
//			exposicion.setClient(agency);
//			concierto.setClient(agency);
//			conferencia.setStatus(true);
//			exposicion.setStatus(true);
//			concierto.setStatus(true);
//
//
//			// Agregar los eventos a una lista o guardarlos en la base de datos
//			List<Event> eventos = new ArrayList<>();
//			eventos.add(concierto);
//			eventos.add(exposicion);
//			eventos.add(conferencia);
//
//
//
//
//
//			for (Event evento : eventos) {
//				eventRepository.save(evento);
//				System.out.println("Evento creado: " + evento.getName());
//			}
//
//// Crear el primer ticket
//			Ticket ticket1 = new Ticket();
//			ticket1.setName("Ticket 1");
//			ticket1.setBasePrice(new BigDecimal("100.00"));
//			ticket1.setAvailableQuantity(50);
//			ticket1.setIncreasePercentage(0.1);
//			ticket1.setType(TicketType.GENERAL);
//			ticket1.setEvent(concierto);
//			ticket1.setClient(agency);
//
//// Crear el segundo ticket
//			Ticket ticket2 = new Ticket();
//			ticket2.setName("Ticket 2");
//			ticket2.setBasePrice(new BigDecimal("200.00"));
//			ticket2.setAvailableQuantity(30);
//			ticket2.setIncreasePercentage(0.15);
//			ticket2.setType(TicketType.VIP);
//			ticket2.setEvent(concierto);
//			ticket2.setClient(agency);
//
//// Crear el tercer ticket
//			Ticket ticket3 = new Ticket();
//			ticket3.setName("Ticket 3");
//			ticket3.setBasePrice(new BigDecimal("300.00"));
//			ticket3.setAvailableQuantity(20);
//			ticket3.setIncreasePercentage(0.2);
//			ticket3.setType(TicketType.PLATINO);
//			ticket3.setEvent(conferencia);
//			ticket3.setClient(agency);
//
//			ticketRepository.save(ticket1);
//			ticketRepository.save(ticket2);
//			ticketRepository.save(ticket3);
//	};}

}