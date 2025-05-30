import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import authRouter from './routes/auth.js';
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import transactionRoutes from "./routes/transactions.js";
import categoryRoutes from "./routes/categories.js";

/* App Config */
dotenv.config();
const app = express();
const port = process.env.PORT;


/* Middlewares */
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from frontend
  credentials: true,
}));

/* API Routes */
app.use('/api', authRouter);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

/* MongoDB connection */
try {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("MONGODB CONNECTED");
} catch (error) {
  console.error("MongoDB connection error:", error);
}


app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});

/* Port Listening In */
app.listen(port, () => {
  console.log(`Server is running in PORT ${port}`);
});
