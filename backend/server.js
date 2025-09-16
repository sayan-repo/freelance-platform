import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.js'; // Renamed router to apiRoutes for clarity
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { initializeData } from './data/store.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await initializeData();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', apiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`✅ Backend server running on http://localhost:${PORT}`);
  });
};

startServer();