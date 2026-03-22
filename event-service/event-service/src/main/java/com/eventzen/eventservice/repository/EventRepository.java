package com.eventzen.eventservice.repository;

import com.eventzen.eventservice.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {
}
