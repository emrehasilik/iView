import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import questionRoutes from './routes/questionRoutes';
import interviewRoutes from './routes/interviewRoutes';
import personelRoutes from './routes/personelRoutes';
import uploadRoutes from './routes/upload'; // upload rotasını import edin

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', questionRoutes); 
app.use('/api', interviewRoutes);
app.use('/api', personelRoutes);
app.use('/api', uploadRoutes); // upload rotasını ekleyin

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

  app._router.stack.forEach((r: any) => {
    if (r.route && r.route.path) {
      console.log(r.route.path);
    }
  });
  
// Server çalıştırma
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
