# Express Server with JWT Authentication and Role-Based Access

This repository contains a simple Express.js server that demonstrates:

- User registration and login with JWT-based authentication.
- Role-based access control by decoding the JWT token.
- MongoDB integration to store and retrieve user information.

## Features

- **User Registration**: Register a new user with a unique email and hashed password.
- **User Login**: Authenticate users with JWT tokens.
- **JWT Authentication**: Protect routes by validating JWT tokens.
- **Role-Based Access Control**: Allow or deny access to certain routes based on user roles from the decoded JWT.
- **MongoDB Integration**: Store user details and retrieve information as needed.

## Technologies Used

- **Node.js** and **Express.js** for building the server.
- **MongoDB** for data storage.
- **JWT** (JSON Web Tokens) for user authentication.
- **bcrypt** for password hashing.

