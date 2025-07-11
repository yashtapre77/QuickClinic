const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/database');  // your connection file
const userRoutes = require('./routes/user');
const doctorRoutes = require('./routes/doctor'); 
const appointmentRoutes = require('./routes/appointment');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const connect = async () => {
    await connectDB()
}

connect();

app.use('/users', userRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
