import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/error.middleware.js';

import indexRoute from './routes/index.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/', indexRoute);

// make upload folder static in root
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // make frontend/build folder as static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // get anything that is'nt any of API route in production
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')) // point to static folder
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}


const PORT = process.env.PORT || 5000;

app.use(notFound);

// Handle the 500 html error with json
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
