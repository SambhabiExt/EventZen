#  EventZen

EventZen is a full-stack event management system built using a microservices architecture. It allows users to browse events, book tickets, and manage bookings, while admins can create events.


##  Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS

### Backend Services
- Auth Service: Node.js + Express  
- Event Service: Spring Boot (Java)  
- Booking Service: ASP.NET Core (.NET)  
- Budget Service: Node.js + Express (in-memory)

### Database
- MySQL

### DevOps
- Docker & Docker Compose


##  Features

- User Authentication (Register / Login)
- Event Management
- Ticket Booking System
- Cancel Bookings
- Budget Tracking (Backend API)
- Role-based UI (Admin / User)
- Dockerized Microservices



##  Architecture

The application follows a microservices architecture, where each service runs independently and communicates via REST APIs.

Services:
- Auth Service  
- Event Service  
- Booking Service  
- Budget Service  


## 🐳 Run Locally (Docker)

### 1. Clone the repository

### 2. Run all services

docker-compose up --build

### 3. Open the application

http://localhost:5173


##  Notes

- Application runs locally (not deployed)
- Microservices communicate via REST APIs
- Budget service uses in-memory storage


##  Author

Built as part of a full-stack microservices project.