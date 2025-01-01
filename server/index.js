const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const path = require('path');
const { connectDb } = require('./db/connection');
require('dotenv').config();



const app = express();

// Middleware
app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL, // Replace with your frontend URL
//     credentials: true,
//   })
// );

// const cors = require('cors');

// Middleware
// const allowedOrigins = ['https://pic-prism-my.vercel.app', 'http://localhost:5173'];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like Postman) or valid origins
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(cors({ origin: "*" }));


app.use(cors({
    origin: 'https://pic-prism-my.vercel.app',
    // origin: 'http://localhost:5173',
    credentials: true,
}));



// Connect to the database
connectDb();

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Dynamically load and use routes
const routesPath = path.join(__dirname, 'routes');
readdirSync(routesPath).map((route) => {
  app.use('/api', require(path.join(routesPath, route)));
});

// Export the app for Vercel
module.exports = app;
