// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';

// Configure dotenv to load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Enable CORS

// MongoDB Atlas connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('Error: MONGO_URI is not defined in the environment variables.');
  process.exit(1); // Exit if no MongoDB URI is provided
}

mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
    process.exit(1); // Exit on connection error
  });

// Default route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// User routes
app.use('/api/users', userRoutes);

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal server error occurred' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
