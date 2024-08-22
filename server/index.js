const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;


// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
