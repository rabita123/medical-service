import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

import Test from "../models/testModel.js";
import TestBooking from "../models/testBookingModel.js";
import TestCategory from "../models/testCategoryModel.js";
import User from "../models/userModel.js";

// @desc    Get all tests
// @route   GET /api/tests
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const categoryId = req.query.category;
    const searchQuery = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: "i",
          },
        }
      : {};

    const query = categoryId
      ? { ...searchQuery, category_id: categoryId }
      : searchQuery;

    const tests = await Test.find(query).populate("category_id");
    res.json(tests);
  })
);

// @desc    Create a test
// @route   POST /api/tests
// @access  Public (temporarily)
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      name,
      description,
      category_name,
      price,
      preparation,
      duration,
      report_time,
      is_available,
      image,
    } = req.body;

    // Create or find category
    let category = await TestCategory.findOne({ category_name });
    if (!category) {
      category = await TestCategory.create({ category_name });
    }

    const test = await Test.create({
      name,
      description,
      category_id: category._id,
      price,
      preparation,
      duration,
      report_time,
      is_available,
      image,
    });

    res.status(201).json(test);
  })
);

// @desc    Get logged in user's test bookings
// @route   GET /api/tests/mybookings
// @access  Private
router.get(
  "/mybookings",
  protect,
  asyncHandler(async (req, res) => {
    const bookings = await TestBooking.find({ user: req.user._id })
      .populate("test")
      .sort("-createdAt");
    res.json(bookings);
  })
);

// @desc    Get test by ID
// @route   GET /api/tests/:id
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const test = await Test.findById(req.params.id).populate("category_id");
      
      if (test) {
        res.json(test);
      } else {
        res.status(404);
        throw new Error("Test not found");
      }
    } catch (error) {
      console.error("Error fetching test:", error);
      res.status(404);
      throw new Error("Test not found");
    }
  })
);

// @desc    Book a test
// @route   POST /api/tests/:id/book
// @access  Private
router.post(
  "/:id/book",
  protect,
  asyncHandler(async (req, res) => {
    console.log('Booking request body:', req.body);
    
    const test = await Test.findById(req.params.id);

    if (!test) {
      res.status(404);
      throw new Error("Test not found");
    }

    if (!test.is_available) {
      res.status(400);
      throw new Error("Test is not available for booking");
    }

    const { 
      appointmentDate,
      patientName,
      patientEmail,
      patientPhone,
      patientAge,
      patientGender
    } = req.body;

    console.log('Extracted booking data:', {
      appointmentDate,
      patientName,
      patientEmail,
      patientPhone,
      patientAge,
      patientGender
    });

    const bookingDate = new Date(appointmentDate);

    if (bookingDate < new Date()) {
      res.status(400);
      throw new Error("Cannot book appointment in the past");
    }

    try {
      const booking = await TestBooking.create({
        user: req.user._id,
        test: test._id,
        appointmentDate: bookingDate,
        price: test.price,
        patientName,
        patientEmail,
        patientPhone,
        patientAge: Number(patientAge),
        patientGender
      });

      res.status(201).json(booking);
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(400);
      throw error;
    }
  })
);

// @desc    Update a test
// @route   PUT /api/tests/:id
// @access  Private/Admin
router.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const test = await Test.findById(req.params.id);

    if (!test) {
      res.status(404);
      throw new Error("Test not found");
    }

    const {
      name,
      description,
      category_name,
      price,
      duration,
      report_time,
      is_available,
    } = req.body;

    // Find or create category
    let category = await TestCategory.findOne({ category_name });
    if (!category) {
      category = await TestCategory.create({ category_name });
    }

    test.name = name;
    test.description = description;
    test.category_id = category._id;
    test.price = price;
    test.duration = duration;
    test.report_time = report_time;
    test.is_available = is_available;

    const updatedTest = await test.save();
    res.json(updatedTest);
  })
);

// @desc    Get all test bookings (admin)
// @route   GET /api/tests/bookings
// @access  Private/Admin
router.get(
  "/bookings",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const bookings = await TestBooking.find({})
        .populate({
          path: 'test',
          select: 'name price duration report_time category_id',
          populate: {
            path: 'category_id',
            select: 'category_name'
          }
        })
        .populate('user', 'name email')
        .sort('-createdAt')
        .lean();

      if (!bookings) {
        return res.status(404).json({ message: 'No bookings found' });
      }

      // Process bookings to handle missing test references
      const processedBookings = bookings.map(booking => {
        if (!booking.test) {
          booking.test = {
            name: 'Test not found',
            price: booking.price || 0
          };
        }
        
        // Ensure status has a default value
        if (!booking.status) {
          booking.status = 'pending';
        }

        return booking;
      });

      res.json(processedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({
        message: 'Failed to fetch bookings',
        error: error.message
      });
    }
  })
);

// @desc    Cancel test booking
// @route   PUT /api/tests/booking/:id/cancel
// @access  Private/Admin
router.put(
  "/booking/:id/cancel",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const booking = await TestBooking.findById(req.params.id);

    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }

    booking.status = "cancelled";
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  })
);

// @desc    Complete test booking
// @route   PUT /api/tests/booking/:id/complete
// @access  Private/Admin
router.put(
  "/booking/:id/complete",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const booking = await TestBooking.findById(req.params.id);

    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }

    booking.status = "completed";
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  })
);

export default router;
