require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { connectDB } = require('./db');
const rootRouter = require('./routes/index');
const { PORT, FRONTEND_ORIGIN } = require('./config');

const app = express();


app.set('trust proxy', 1);

app.use(helmet());
app.use(morgan('dev'));


app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true
  })
);


app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));


const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100
});
app.use(limiter);


app.get('/', (req, res) => res.json({ ok: true }));

// API
app.use('/api/v1', rootRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

let server;

async function start() {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();


process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function shutdown() {
  console.log('Shutting down server...');
  if (server) server.close(() => {
    console.log('HTTP server closed');
    
    const mongoose = require('mongoose');
    mongoose.connection.close(false, () => {
      console.log('Mongo connection closed');
      process.exit(0);
    });
  });
}
