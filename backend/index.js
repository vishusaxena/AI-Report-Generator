const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// User routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
