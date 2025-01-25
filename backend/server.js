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
    ? ['https://medical-service-nu.vercel.app', 'https://*.vercel.app']
    : 'http://localhost:3000',
  credentials: true
}));

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

// Routes
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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  const frontendBuildPath = path.resolve(__dirname, '../frontend/build');
  
  // Serve static files
  app.use(express.static(frontendBuildPath));
  
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res, next) {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendBuildPath, 'index.html'), (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error loading page');
      }
    });
  });
}

// API 404 handler - for API routes only
app.use('/api/*', (req, res) => {
  console.log('API 404 Path:', req.path);
  res.status(404).json({
    success: false,
    error: 'API Not Found',
    message: 'The requested API endpoint was not found'
  });
});

// Final 404 handler - should be last
app.use((req, res) => {
  if (process.env.NODE_ENV === 'production') {
    const frontendBuildPath = path.resolve(__dirname, '../frontend/build');
    res.sendFile(path.join(frontendBuildPath, 'index.html'), (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error loading page');
      }
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Not Found',
      message: 'The requested resource was not found'
    });
  }
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
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
