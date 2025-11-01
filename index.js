import express from "express";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "https://lmsfrontend-phi.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("✅ Backend running successfully on Vercel!");
});

export default app;
