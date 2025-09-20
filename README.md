Sweet Shop Management System
A full-stack web application for managing a sweet shop inventory, built with Test-Driven Development (TDD) methodology.

https://tastytreats.vercel.app/screenshot.png

Live Application: https://tastytreats.vercel.app/

Table of Contents
Features

Tech Stack

Project Structure

Setup Instructions

Prerequisites

Backend Setup

Frontend Setup

Running Tests

API Documentation

Screenshots

My AI Usage

Features
User Authentication: Register and login with JWT-based authentication

Sweet Management: Add, view, update, and delete sweets (admin only)

Inventory Management: Purchase and restock sweets

Search & Filter: Search sweets by name, category, or price range

Responsive Design: Works on desktop and mobile devices

Tech Stack
Backend
Node.js with Express.js

TypeScript

PostgreSQL database

JWT for authentication

Jest for testing

Frontend
React with TypeScript

Tailwind CSS for styling

Axios for API calls

React Router for navigation

React Testing Library for testing

Project Structure
text
sweet-shop-management/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── tests/        # Backend tests
│   │   └── utils/        # Helper functions
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── hooks/       # Custom React hooks
│   │   ├── types/       # TypeScript definitions
│   │   ├── utils/       # Helper functions
│   │   └── tests/       # Frontend tests
│   ├── package.json
│   └── tsconfig.json
└── README.md
Setup Instructions
Prerequisites
Node.js (v16 or higher)

PostgreSQL (v12 or higher)

npm or yarn

Backend Setup
Navigate to the backend directory:

bash
cd backend
Install dependencies:

bash
npm install
Set up environment variables:
Create a .env file in the backend directory with the following variables:

text
DATABASE_URL=postgresql://username:password@localhost:5432/sweet_shop
JWT_SECRET=your_jwt_secret_here
PORT=5000
Set up the database:

bash
# Connect to PostgreSQL and create the database
createdb sweet_shop

# Run migrations
npm run db:migrate
Start the development server:

bash
npm run dev
The backend server will be running on http://localhost:5000

Frontend Setup
Navigate to the frontend directory:

bash
cd frontend
Install dependencies:

bash
npm install
Set up environment variables:
Create a .env file in the frontend directory with the following variable:

text
REACT_APP_API_URL=http://localhost:5000
Start the development server:

bash
npm start
The frontend application will be running on http://localhost:3000

Running Tests
Backend Tests
bash
cd backend
npm test          # Run tests once
npm run test:watch  # Run tests in watch mode
npm run test:cov   # Run tests with coverage report
Frontend Tests
bash
cd frontend
npm test          # Run tests once
npm run test:watch  # Run tests in watch mode
npm run test:cov   # Run tests with coverage report
API Documentation
Authentication Endpoints
POST /api/auth/register - Register a new user

POST /api/auth/login - Login user

Sweet Endpoints (Protected)
GET /api/sweets - Get all sweets

POST /api/sweets - Add a new sweet (Admin only)

GET /api/sweets/:id - Get a specific sweet

PUT /api/sweets/:id - Update a sweet (Admin only)

DELETE /api/sweets/:id - Delete a sweet (Admin only)

GET /api/sweets/search - Search sweets by name, category, or price range

Inventory Endpoints (Protected)
POST /api/sweets/:id/purchase - Purchase a sweet (decrease quantity)

POST /api/sweets/:id/restock - Restock a sweet (Admin only, increase quantity)

Screenshots
https://tastytreats.vercel.app/screenshots/login.png
Login Page

https://tastytreats.vercel.app/screenshots/dashboard.png
Dashboard showing all sweets

https://tastytreats.vercel.app/screenshots/admin.png
Admin panel for managing sweets
