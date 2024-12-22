# Backend Documentation

## Overview

This project implements a structured MVC (Model-View-Controller) architecture for the backend, ensuring clean separation of concerns, modularity, and maintainability. It is built with **Node.js** and **Express.js** and uses **MongoDB** as the database, managed with **Mongoose**. The application supports scalable route management and secure API endpoints with JWT authentication and middleware protection.

---

## Features

1. **Entry Point (server/index.js)**:
   - Centralized server setup with **Express.js**.
   - Environment configuration using **dotenv**.
   - CORS middleware integration for cross-origin requests.
   - Centralized route management for modular routing.
   - Middleware integration for logging, error handling, and request parsing.

2. **Database Layer**:
   - **MongoDB** connection via **Mongoose**.
   - Dedicated database configuration in `server/config/db.js`.
   - Clean separation of database logic for scalability.

3. **Route Organization**:
   - Modular routing system:
     - `authRoutes` for authentication and authorization.
     - `taskRoutes` for task management.
   - Protected routes using authentication middleware.
   - Clear separation of route logic.

4. **Security Features**:
   - Authentication middleware (`protect`) for securing private routes.
   - **JWT** token implementation for user sessions.
   - Request validation for inputs to ensure data integrity.

5. **Scalability and Maintainability**:
   - Modular component structure for easy scaling.
   - Clear separation of concerns for smooth debugging and updates.
   - Well-documented codebase for ease of testing and collaboration.

---

## Project Structure

```
server/
├── config/
│   ├── db.js                 # MongoDB connection logic
├── controllers/              # Request handling logic
│   ├── userController.js
│   ├── authController.js
│   ├── taskController.js
├── middlewares/              # Custom middleware
│   ├── authMiddleware.js     # Protect routes
│   ├── errorMiddleware.js    # Error handling
├── models/                   # Mongoose models
│   ├── User.js
│   ├── Task.js
├── routes/                   # Route definitions
│   ├── authRoutes.js
│   ├── taskRoutes.js
├── utils/                    # Utility functions
│   ├── validateRequest.js    # Input validation
├── index.js                  # Entry point
├── package.json              # Dependencies and scripts
```

---

## API Endpoints

### Authentication
- **POST** `/api/auth/register`  
  Register a new user.
- **POST** `/api/auth/login`  
  Authenticate a user and receive a JWT.

### User Management
- **GET** `/api/users/me`  
  Get the current user's information (protected).

### Task Management
- **GET** `/api/tasks`  
  Retrieve all tasks (protected).
- **POST** `/api/tasks`  
  Create a new task (protected).
- **PUT** `/api/tasks/:id`  
  Update a specific task (protected).
- **DELETE** `/api/tasks/:id`  
  Delete a specific task (protected).

---

## Security

- **JWT Authentication**:
  - Protects private endpoints.
  - Tokens must be included in the `Authorization` header as `Bearer <token>`.

- **Input Validation**:
  - Ensures all API inputs are sanitized and meet required formats.

