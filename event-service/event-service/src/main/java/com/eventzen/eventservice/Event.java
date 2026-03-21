package com.eventzen.eventservice;

public class Event {

    private Integer id;
    private String title;
    private String location;
    private String date;
    private Integer capacity; 
    private String category;

    public Event() {}

    public Event(Integer id, String title, String location, String date, Integer capacity, String category) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.date = date;
        this.capacity = capacity;
        this.category = category; 
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    
    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category){
        this.category = category;
    }
}