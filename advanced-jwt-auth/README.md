# Advanced JWT Authorization

## Overview

This is a full-stack web application using **React (Vite Setup)** on the client side and **Express.js** on the server side, with **MongoDB** as the database. The project implements an advanced **JWT-based authentication system**, featuring access and refresh tokens. The tokens are stored in MongoDB, and the client handles token refresh using Axios interceptors.

## Features

- **JWT Authentication** with Access and Refresh Tokens
- **Axios Interceptors** for automatic token refresh
- **MongoDB** for token storage and user data
- **React (Vite)** for a fast and efficient front-end
- **Express.js** for back-end API and routing

## Technologies Used

### Frontend

- **React** as main front-end library for building user interfaces
- **MobX** for simple state management for handling global state
- **React Router** for navigation and routing
- **Axios** as HTTP client with instances and interceptors for API requests
- **Vite** - fast development environment and tooling

### Backend

- **Express.js** as web framework for Node.js
- **MongoDB** - database for storing user data and tokens (using Mongoose ODM)
- **JWT** (JSON Web Tokens) for secure user authentication
- **bcrypt** for password hashing
- **express-validator** - middleware for validating incoming requests
- **nodemailer** for e-mails sending
