const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/user');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);