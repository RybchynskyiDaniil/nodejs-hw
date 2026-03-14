import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { logger } from './middleware/logger.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectMongoDB } from './db/connectMongoDB.js';
import "dotenv/config";
import { errors } from 'celebrate';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger);
app.use(notesRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);
const startServer = async () => {
  try {
    await connectMongoDB();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
