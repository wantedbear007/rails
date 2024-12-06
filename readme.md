# Train Booking System

This repository contains the backend implementation for a train booking system using Node.js and TypeScript. The system includes functionalities for user authentication, train management, ticket booking, and more.

## Features

- **Admin Management**:
  - Add new trains.
  - Modify train seat availability.
  - Admin login with API key verification.

- **User Management**:
  - User registration and login.
  - Token-based authentication.

- **Booking System**:
  - Search for available trains.
  - Book tickets with race condition handling.

## API Endpoints

### **Admin Routes**

| Endpoint           | Method | Description                              |
|--------------------|--------|------------------------------------------|
| `/admin/login`     | POST   | Login as an admin.                      |
| `/admin/addTrain`  | POST   | Add a new train.                        |
| `/admin/modifyTrain` | POST | Modify available seats for a train.     |


### **User Routes**

| Endpoint           | Method | Description                              |
|--------------------|--------|------------------------------------------|
| `/login`     | POST   | Login as an user.                      |
| `/register`  | POST   | Add a new user.                        |
| `/search` | POST | search trains    |
| `/book` | POST | book trains    |


#### Example Payloads
**Login**:
```json
{
  "username": "admin",
  "password": "securepassword"
}
Add Train:

{
  "trainName": "Express",
  "fairPerKm": 2.5,
  "fromStation": "Station A",
  "toStation": "Station B",
  "seates": 120,
  "speed": 100,
  "travelTime": "3h"
}
Modify Train Seats:

{
  "trainID": "123",
  "numberOfSeats": 10
}
Booking Routes
Endpoint	Method	Description
/booking/search	POST	Search for trains between two stations.
/booking/book	POST	Book tickets (requires user token).
Example Payloads
Search:

{
  "from": "Station A",
  "to": "Station B"
}
Book Ticket:

{
  "from": "Station A",
  "to": "Station B",
  "train_id": "123",
  "date": "2024-12-01",
  "user_id": "456",
  "name": "John Doe"
}
User Routes
Endpoint	Method	Description
/user/register	POST	Register a new user.
/user/login	POST	Login as a user.
Example Payloads
Register:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
Login:

{
  "email": "john@example.com",
  "password": "securepassword"
}

