package com.mindhub.ticketmind;

import com.mindhub.ticketmind.models.*;
import com.mindhub.ticketmind.repositories.CategoryEventRepository;
import com.mindhub.ticketmind.repositories.CityRepository;
import com.mindhub.ticketmind.repositories.ClientRepository;
import com.mindhub.ticketmind.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class TicketmindApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketmindApplication.class, args);


		System.out.println("\033[0;34m" + "initialized application" + "\033[0m");
	}

	@Autowired
	private PasswordEncoder passwordEncoder;
	@Bean
	public CommandLineRunner initData(CategoryEventRepository categoryEventRepository, CityRepository cityRepository, EventRepository eventRepository, ClientRepository clientRepository){
		return  args -> {

			Client client = new Client("3mas1r@gmail.com","Richard","Kaos", passwordEncoder.encode("123456") , UserRole.AGENCY);

			clientRepository.save(client);
// Crear instancias de las categorías
			CategoryEvent musica = new CategoryEvent("Música");
			CategoryEvent entretenimiento = new CategoryEvent("Entretenimiento");
			CategoryEvent arte = new CategoryEvent("Arte");
			CategoryEvent cultura = new CategoryEvent("Cultura");
			CategoryEvent tecnologia = new CategoryEvent("Tecnología");
			CategoryEvent conferencias = new CategoryEvent("Conferencias");

			// Crear instancias de las ciudades
			City buenosAires = new City("Buenos Aires");
			City madrid = new City("Madrid");
			City nuevaYork = new City("Nueva York");

			cityRepository.save(buenosAires);
			cityRepository.save(madrid);
			cityRepository.save(nuevaYork);
			// Crear lista de categorías para cada evento
			List<CategoryEvent> conciertoCategories = new ArrayList<>();
			conciertoCategories.add(musica);
			conciertoCategories.add(entretenimiento);

			List<CategoryEvent> exposicionCategories = new ArrayList<>();
			exposicionCategories.add(arte);
			exposicionCategories.add(cultura);

			List<CategoryEvent> conferenciaCategories = new ArrayList<>();
			conferenciaCategories.add(tecnologia);
			conferenciaCategories.add(conferencias);


			categoryEventRepository.save(musica);
			categoryEventRepository.save(entretenimiento);
			categoryEventRepository.save(arte);
			categoryEventRepository.save(cultura);
			categoryEventRepository.save(tecnologia);
			categoryEventRepository.save(conferencias);
			// Crear los eventos
			Event concierto = new Event("Concierto de Rock", "Disfruta de una noche llena de energía con las mejores bandas de rock del momento.",
					conciertoCategories, "https://ejemplo.com/imagen1.jpg", new Date(124, 3, 15), "Estadio Principal",
					"https://ejemplo.com/estadio1", buenosAires);

			Event exposicion = new Event("Exposición de Arte Contemporáneo", "Descubre las últimas tendencias en el mundo del arte contemporáneo en esta exposición única.",
					exposicionCategories, "https://ejemplo.com/imagen2.jpg", new Date(124, 4, 20), "Galería de Arte Moderno",
					"https://ejemplo.com/galeria", madrid);

			Event conferencia = new Event("Conferencia de Tecnología e Innovación", "Únete a expertos de la industria para explorar las últimas innovaciones y tendencias tecnológicas.",
					conferenciaCategories, "https://ejemplo.com/imagen3.jpg", new Date(124, 5, 10), "Centro de Convenciones",
					"https://ejemplo.com/centro_convenciones", nuevaYork);

			conferencia.setClient(client);
			exposicion.setClient(client);
			concierto.setClient(client);

			// Agregar los eventos a una lista o guardarlos en la base de datos
			List<Event> eventos = new ArrayList<>();
			eventos.add(concierto);
			eventos.add(exposicion);
			eventos.add(conferencia);



			// Ahora puedes guardar los eventos en la base de datos o hacer cualquier otro proceso necesario
			for (Event evento : eventos) {
				eventRepository.save(evento);
				System.out.println("Evento creado: " + evento.getName());
			}


	};}

}
