require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

//for routes
app.use('/api',userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
