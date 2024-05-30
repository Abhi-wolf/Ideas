# Innovative Ideas Sharing Platform

## Overview

Welcome to the Innovative Ideas Sharing Platform! This project allows users to share their new and innovative ideas without the need to sign up. The platform supports real-time updates for likes, comments, and views using Socket.IO.

## Features

- **No Sign-Up Required**: Users can share their ideas instantly.
- **Real-Time Updates**: Enjoy live updates for likes, comments, and views.
- **Interactive UI**: User-friendly interface for a smooth experience.

## Tech Stack

- **MERN Stack**:
  - **MongoDB**: Database for storing ideas and user interactions.
  - **Express.js**: Backend framework.
  - **React.js**: Frontend framework.
  - **Node.js**: Runtime environment.
- **Shadcn UI Library**: For polished and responsive React components.
- **Tailwind CSS**: For modern and responsive styling.
- **Socket.IO**: For real-time communication.

## Installation

1. **Clone the repository**:
   git clone https://github.com/Abhi-wolf/Ideas.git
   cd Ideas
   Install backend dependencies:

2. **Install backend dependencies**:
    cd server
    npm install
    Install frontend dependencies:


3. **Install frontend dependencies:**:
    cd ../client
    npm install
    Running the Application
    Start the backend server:
   
## Running the Application

1. **Start the backend server:**:
    cd server
    npm start
    Start the frontend development server:

2. **Start the frontend development server:**:
    cd ../client
    npm start

## Environment variables
1. **For Frontend**
    VITE_BASE_URL=http://localhost:8000/api/v1
    VITE_SOCKET_URL=http://localhost:8000

2. **For Backend**
    MONGODB_URL="mongodb://localhost/ideas"
    PORT=8000
    JWT_SECRET=shadgnw3t291ebk%mvasb*qjwhen193
    JWT_EXPIRE=1d
    COOKIE_EXPIRE=1d
    NODE_ENV=development
