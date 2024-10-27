import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; // cors'u import edin
import questionRoutes from './routes/questionRoutes';
import interviewRoutes from './routes/interviewRoutes';
import personelRoutes from './routes/personelRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // CORS middleware ekleyin
app.use(express.json()); // JSON parsing middleware
app.use('/api', questionRoutes); 
app.use('/api', interviewRoutes);
app.use('/api', personelRoutes); // Yeni personel rotasını ekleyin

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Server çalıştırma
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
