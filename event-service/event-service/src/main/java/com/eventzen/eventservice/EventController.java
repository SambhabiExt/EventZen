package com.eventzen.eventservice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eventzen.eventservice.repository.EventRepository;

import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventController {

    private final EventRepository repo;

    public EventController(EventRepository repo) {
        this.repo = repo;
    }

    
    @GetMapping
    public List<Event> getEvents() {
        return repo.findAll();
    }

    
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event saved = repo.save(event);
        return ResponseEntity.ok(saved);
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable int id) {
        repo.deleteById(id);
        return ResponseEntity.ok("Event deleted successfully");
    }
}