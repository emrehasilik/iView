import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import questionRoutes from './routes/questionRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // JSON parsing middleware
app.use('/api', questionRoutes); // Route kullanımı

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Server çalıştırma
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
