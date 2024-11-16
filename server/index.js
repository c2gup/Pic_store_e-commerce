const express = require('express');
const app = express();
const controllers = require("./routes/authRoute")
require('dotenv').config();
app.use(express.json());
const cors = require('cors');
const { readdirSync } = require("fs");

app.use(cors());

// Use a fixed port or an environment variable
const PORT = process.env.PORT || 3000; 

const {connectDb} = require("./db/connection");

connectDb();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// app.use('/api/v1',controllers );
readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

