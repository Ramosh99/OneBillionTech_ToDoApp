import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/UserRoutes.js';
import authRoutes from './routes/AuthRoutes.js';

const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();


app.use(express.json());
app.use(cors());

//for routes
app.use('/api',userRoutes);
app.use('/api/auth',authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
