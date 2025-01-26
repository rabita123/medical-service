import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from 'url';

// Load env vars
dotenv.config();

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import colors from 'colors';
import connectDB from "./config/db.js";

// Initialize express
const app = express();

// Connect to MongoDB
try {
  console.log('MongoDB URI:', process.env.MONGO_URI);
  await connectDB();
  console.log(colors.cyan.bold('MongoDB Connected'));
} catch (error) {
  console.error(colors.red.bold('Error: MongoDB connection failed'), error.message);
  process.exit(1);
}

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://medical-service-frontend.netlify.app', 'http://localhost:3000']
    : 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Security headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' 
    ? 'https://medical-service-frontend.netlify.app' 
    : 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  next();
});

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

// API Status route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Medical Service API is running',
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

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

// Start server with error handling
const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server Environment: ${process.env.NODE_ENV}`.yellow);
  console.log(`Server Port: ${PORT}`.yellow);
  console.log(`MongoDB URI exists: ${Boolean(process.env.MONGODB_URI || process.env.MONGO_URI)}`.yellow);
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold);
})
.on('error', (error) => {
  console.error('Server failed to start:'.red.bold);
  console.error(error.message.red);
  process.exit(1);
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
