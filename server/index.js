

const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const path = require('path');
const { connectDb } = require('./db/connection');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Replace with your frontend URL
    credentials: true,
  })
);

// Connect to the database
connectDb();

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Dynamically load and use routes
const routesPath = path.join(__dirname, 'routes');
readdirSync(routesPath).map((route) => {
  app.use('/api', require(path.join(routesPath, route)));
});

// Export the app for Vercel
module.exports = app;
