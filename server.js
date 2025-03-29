// server.js - Application entry point

// Import required modules
const express = require('express');
const cors = require('cors');
const http = require('http');
const { initSocketIO } = require('./socket/socket.init');
const { connectMongoDB } = require('./config/db.config');
const { connectRedis } = require('./config/redis.config');
const { startCleanupJob } = require('./jobs/cleanup.job');
const errorMiddleware = require('./middleware/error.middleware');
const authRoutes = require('./routes/auth.routes');
const fileRoutes = require('./routes/file.routes');
const searchRoutes = require('./routes/search.routes');
const logger = require('./utils/logger');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Asynchronous function to initialize connections
(async () => {
  try {
    await connectMongoDB(); // Connect to MongoDB
    await connectRedis();  // Connect to Redis
    logger.info('Database connections established');
  } catch (error) {
    logger.error('Error during database initialization:', error);
    process.exit(1); // Exit process if initialization fails
  }
})();

// Initialize Socket.IO
initSocketIO(server);

// Route handlers
app.use('/api/auth', authRoutes); // Authentication-related routes
app.use('/api/files', fileRoutes); // File-related routes
app.use('/api/search', searchRoutes); // Search-related routes

// Error handling middleware
app.use(errorMiddleware); // Custom middleware for handling errors

// Start background jobs
startCleanupJob(); // Initiate periodic cleanup jobs

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful shutdown for the server
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

// Export server for testing purposes
module.exports = server;
