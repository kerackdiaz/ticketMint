package com.mindhub.ticketmind.services.service;

import com.mindhub.ticketmind.dtos.*;
import com.mindhub.ticketmind.models.*;
import com.mindhub.ticketmind.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CategoryEventRepository categoryEventRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private SocketIOService socketIOService;
    public List<EventDTO> getAllEvents(){
        List<Event> events = eventRepository.findAll();
        return  events.stream().map(EventDTO::new).toList();
    }
    public List<CityDTO> getAllCities(){
        List<City> cities = cityRepository.findAll();
        return  cities.stream().map(CityDTO::new).toList();
    }
    public List<CategoryEventDTO> getAllCategories(){
        List<CategoryEvent> events = categoryEventRepository.findAll();
        return  events.stream().map(CategoryEventDTO::new).toList();
    }

    public Map<String, Object> createEvent(EventFormDTO eventFormDTO, String userMail) {
        Map<String, Object> response = new HashMap<>();
        Client client = clientRepository.findByEmail(userMail);
        try {
            if (client == null) {
                response.put("error", false);
                response.put("message", "The user does not exist");
                return response;
            }

            Event event = new Event();
            event.setName(eventFormDTO.name().toUpperCase());
            event.setDescription(eventFormDTO.description().toUpperCase());
            event.setImageURL(eventFormDTO.imageURL());
            event.setDate(eventFormDTO.date());
            event.setVenueName(eventFormDTO.venueName().toUpperCase());
            event.setVenueURL(eventFormDTO.venueURL());


            List<String> categoryNames = eventFormDTO.categories();
            List<CategoryEvent> categories = new ArrayList<>();
            if (categoryNames != null && !categoryNames.isEmpty()) {
                for (String categoryName : categoryNames) {
                    String categoryNameUpper = categoryName.toUpperCase();
                    CategoryEvent category = categoryEventRepository.findByName(categoryNameUpper);
                    if (category == null) {
                        category = new CategoryEvent(categoryNameUpper);
                        category = categoryEventRepository.save(category);
                    }
                    categories.add(category);
                }
            }
            event.setCategories(categories);

            List<String> cities = Collections.singletonList(eventFormDTO.city());
            if (cities != null && !cities.isEmpty()) {
                String cityName = cities.get(0);
                City city = cityRepository.findByName(cityName.toUpperCase());
                if (city == null) {
                    city = new City(cityName.toUpperCase());
                    city = cityRepository.save(city);
                }
                event.setCity(city);
            }
            event.setClient(client);
            eventRepository.save(event);

            response.put("success", true);
            response.put("message", "Event created successfully");
        } catch (Exception e) {
            response.put("error", true);
            response.put("message", "An error occurred while creating event: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> deleteEvent(UUID eventId, String userMail) {
        Map<String, Object> response = new HashMap<>();
        Client client = clientRepository.findByEmail(userMail);
        try {
            if (client == null){
                response.put("error", false);
                response.put("message", "The user does not exist");
                return response;
            }
            Optional<Event> optionalEvent = eventRepository.findById(eventId);
            if (optionalEvent.isEmpty()) {
                response.put("error", true);
                response.put("message", "Event not found");
                return response;
            }
            Event event = optionalEvent.get();
            eventRepository.delete(event);
            response.put("success", true);
            response.put("message", "Event deleted successfully");
        } catch (Exception e) {
            response.put("error", true);
            response.put("message", "An error occurred while deleting event: " + e.getMessage());
        }
        return response;
    }


    public List<Ticket> getTicketsByEvent(UUID id) {
        return ticketRepository.findByEventId(id);
    }

    public List<TicketDTO> getAllTickets() {
        List<Ticket> tickets = ticketRepository.findAll();
        return  tickets.stream().map(TicketDTO::new).toList();
    }

    public Map<String, Object> createTicket(UUID eventId, TicketFormDTO ticketFormDTO, String userMail) {
        Map<String, Object> response = new HashMap<>();
        Client client = clientRepository.findByEmail(userMail);
        try {
            Optional<Event> optionalEvent = eventRepository.findById(eventId);
            if (optionalEvent.isPresent()) {

                Event event = optionalEvent.get();

                Ticket ticket = new Ticket(ticketFormDTO.name(), ticketFormDTO.basePrice(), ticketFormDTO.availableQuantity(), client.getCommission(), TicketType.valueOf(ticketFormDTO.type()), event);
                ticketRepository.save(ticket);
                response.put("success", true);
                response.put("message", "Ticket created successfully");
            } else {
                response.put("error", false);
                response.put("message", "Event not found");
            }
        } catch (Exception e) {
            response.put("error", true);
            response.put("message", "An error occurred while creating ticket: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> deleteTicket(UUID ticketId) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);
            if (optionalTicket.isPresent()) {
                Ticket ticket = optionalTicket.get();
                ticketRepository.delete(ticket);
                response.put("success", true);
                response.put("message", "Ticket deleted successfully");
            } else {
                response.put("error", false);
                response.put("message", "Ticket not found");
            }
        } catch (Exception e) {
            response.put("error", true);
            response.put("message", "An error occurred while deleting ticket: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> newAlert(NotificationRecord notificationRecord, String userMail) {
        Map<String, Object> response = new HashMap<>();
        Client client = clientRepository.findByEmail(userMail);
        if (client != null){
            if (eventRepository.existsById(notificationRecord.id()) ) {
                try {
                    Event event = eventRepository.findById(notificationRecord.id()).get();
                    Notification notification = new Notification(notificationRecord.subjet(), event, new Date());
                    notificationRepository.save(notification);
                    socketIOService.sendNotification(notification);
                    response.put("success", true);
                    response.put("message", "Notification sent correctly");
                } catch (NoSuchElementException e) {
                    response.put("error", true);
                    response.put("message", "Event not found");
                }
            } else {
                response.put("error", true);
                response.put("message", "Event does not exist");
            }
        } else {
            response.put("error", true);
            response.put("message", "Client not found");
        }
        return response;
    }


    public Map<String, Object> deleteAlert(UUID alertId, String userMail) {
        Map<String, Object> response = new HashMap<>();
        Client client = clientRepository.findByEmail(userMail);
        try {
            Optional<Notification> optionalAlert = notificationRepository.findById(alertId);
            if (optionalAlert.isPresent() && client != null) {
                Notification notification = optionalAlert.get();
                notificationRepository.delete(notification);
                response.put("success", true);
                response.put("message", "Notification deleted successfully");
            } else {
                response.put("error", false);
                response.put("message", "Notification not found");
            }
        } catch (Exception e) {
            response.put("error", true);
            response.put("message", "An error occurred while deleting ticket: " + e.getMessage());
        }
        return response;
    }

}
