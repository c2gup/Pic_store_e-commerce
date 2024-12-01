
const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const cors = require('cors');
const { readdirSync } = require("fs"); 
const { connectDb } = require("./db/connection");

app.use(express.json());

require('dotenv').config();


app.use(
  cors({
    origin: process.env.CLIENT_URL, // Replace with your frontend URL
    credentials: true,
  })
);


app.use(cors({ origin: true, credentials: true }));

// Connect to the database
connectDb();

// Define basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Dynamically load and use routes
readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);

// Use a fixed port or environment variable
const PORT = process.env.PORT || 3000; 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
