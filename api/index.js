const express = require('express');
const cors = require('cors');


const app = express();

// ✅ Fix CORS for your frontend domain
const corsOptions = {
  origin: [
    'https://lmsfrontend-phi.vercel.app', // your live frontend
    'http://localhost:5173'               // local testing
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// Ensure preflight requests are handled for all routes
app.options('*', cors(corsOptions));

// Fallback middleware to always set CORS headers even if later middleware errors
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (corsOptions.origin.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', corsOptions.methods.join(','));
  res.setHeader('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
  res.setHeader('Access-Control-Allow-Credentials', String(corsOptions.credentials));
  next();
});

app.use(express.json());

// Parse URL-encoded bodies (for form submissions / some auth flows)
app.use(express.urlencoded({ extended: true }));

// Mount all existing routes so Vercel-served app behaves like your main server
// The paths below mirror what's used in `src/index.js`.
const authRoutes = require('../src/routes/auth');
const courseRoutes = require('../src/routes/courses');
const userRoutes = require('../src/routes/users');
const notificationRoutes = require('../src/routes/notifications');
const reviewRoutes = require('../src/routes/reviews');
const paymentRoutes = require('../src/routes/payments');
const adminRoutes = require('../src/routes/admin');
const uploadRoutes = require('../src/routes/upload');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// default route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// export for Vercel (CommonJS)
module.exports = app;
