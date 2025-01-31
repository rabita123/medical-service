import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import colors from 'colors';

// Load env vars
dotenv.config();

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://medical-service-facility0907027.netlify.app', 'https://679ca44e8797e700871067a--medical-service-facility0907027.netlify.app']
    : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// API Status route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Medical Service API is running',
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

// MongoDB Connection
const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    console.log('Connecting to MongoDB...');
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Connect to database
await connectMongoDB();

// Routes
import doctorRoutes from "./routes/doctorRoutes.js";
import specialistRoutes from "./routes/specialistRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import pharmacyRoutes from "./routes/pharmacyRoutes.js";
import { addUser, removeUser, getUser, getUsersInRoom } from "./users.js";
import productRoutes from "./routes/productRoutes.js";
import testCategoryRoutes from "./routes/testCategoryRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import physiotherapyRoutes from "./routes/physiotherapyRoutes.js";
import chatroomRoutes from "./routes/chatroomRoutes.js";
import sliderRoutes from "./routes/sliderRoutes.js";
import ambulanceRoutes from "./routes/ambulanceRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import nursingPackageRoutes from "./routes/nursingPackageRoutes.js";
import nursingPackageDataRoutes from "./routes/nursingPackageDataRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import emergencyDoctorRoutes from "./routes/emergencyDoctorRoutes.js";

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/ambulances", ambulanceRoutes);
app.use("/api/specialist", specialistRoutes);
app.use("/api/allnursingpackages", nursingPackageRoutes);
app.use("/api/nursingpackagesdata", nursingPackageDataRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/testcategories", testCategoryRoutes);
app.use("/api/chatroom", chatroomRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/physiotherapy", physiotherapyRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/allmedicines", medicineRoutes);
app.use("/api/specialists", specialistRoutes);
app.use("/api/sliders", sliderRoutes);
app.use("/api/emergencydoctors", emergencyDoctorRoutes);
app.use("/api/pharmacy", pharmacyRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// Error handling for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `API endpoint not found: ${req.path}`
  });
});

// Remove frontend serving from backend
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.json({
        success: false,
        error: 'Not Found',
        message: 'This is an API server. Please use the frontend URL to access the application.'
      });
    }
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  res.status(500).json({
    success: false,
    error: 'Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server Environment: ${process.env.NODE_ENV}`);
  console.log(`Server Port: ${PORT}`);
  console.log(`MongoDB URI exists: ${Boolean(process.env.MONGODB_URI || process.env.MONGO_URI)}`);
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:'.red.bold);
  console.error(err.message.red);
  console.error(err.stack);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:'.red.bold);
  console.error(err.message.red);
  console.error(err.stack);
  server.close(() => process.exit(1));
});

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? ['https://medical-service-nu.vercel.app', 'https://*.vercel.app']
      : ['http://localhost:3000'],
    methods: ["GET", "POST"],
    credentials: true
  },
});

io.on("connect", (socket) => {
  console.log(colors.green.bold('New socket connection'));

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});
