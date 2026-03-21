package com.eventzen.eventservice;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventController {

    private List<Event> events = new ArrayList<>();
    private int idCounter = 1;

    
    @GetMapping
    public List<Event> getEvents() {
        return events;
    }

    
    @PostMapping
    public String createEvent(@RequestBody Event event) {
        event.setId(idCounter++);
        events.add(event);
        return "Event added successfully";
    }

    
    @PutMapping("/{id}")
    public String updateEvent(@PathVariable int id, @RequestBody Event updatedEvent) {
        for (Event event : events) {
            if (event.getId() == id) {
                event.setTitle(updatedEvent.getTitle());
                event.setLocation(updatedEvent.getLocation());
                event.setDate(updatedEvent.getDate());
                event.setCapacity(updatedEvent.getCapacity());
                event.setCategory(updatedEvent.getCategory());
                return "Event updated successfully";
            }
        }
        return "Event not found";
    }

    
    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable int id) {
        events.removeIf(event -> event.getId() == id);
        return "Event deleted successfully";
    }
}