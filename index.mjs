import express from "express";
import cors from "cors";
import { createRequire } from 'module';

// Use createRequire so we can reuse existing CommonJS route files without
// converting the entire codebase to ESM.
const require = createRequire(import.meta.url);
const courseRoutes = require('./src/routes/courses.js');

const app = express();

// ✅ CORS setup for your deployed frontend
app.use(
  cors({
    origin: [
      "https://lmsfrontend-phi.vercel.app", // your deployed frontend
      "http://localhost:5173", // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ your routes
app.use("/api/courses", courseRoutes);

// ✅ default route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ IMPORTANT: Export the app for Vercel
export default app;
