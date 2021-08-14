import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.js';

// Env Variables
const PORT = process.env.port || 8080;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if( !MONGO_USER || !MONGO_PASSWORD || !MONGO_DB_NAME || !JWT_SECRET_KEY ) {
	console.log('Please, Provide all Environment Variables!');
	process.exit();
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use('/auth', authRoutes);

// Common Error Handler
app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});

mongoose
	.connect(
		`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.cyqzh.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then((result) => {
		app.listen(PORT, () => {
			console.log(`Server running on port: ${PORT} ...`);
		});
	})
	.catch((err) => console.log(err));
