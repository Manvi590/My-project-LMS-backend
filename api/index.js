const express = require('express');
const cors = require('cors');


const app = express();

// ✅ Fix CORS for your frontend domain
app.use(cors({
  origin: [
    'https://lmsfrontend-phi.vercel.app', // your live frontend
    'http://localhost:5173'               // local testing
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Mount existing course routes at /courses so Vercel's /api maps to /api/courses
const courseRoutes = require('../src/routes/courses');
app.use('/courses', courseRoutes);

// default route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// export for Vercel (CommonJS)
module.exports = app;
