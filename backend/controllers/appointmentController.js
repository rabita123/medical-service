import asyncHandler from "express-async-handler";
import Appointment from "../models/appointmentModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addAppointments = asyncHandler(async (req, res) => {
  const { doctor_id, appointmentDate, appointmentTime } = req.body;

  const appointment = new Appointment({
    doctor_id,
    appointmentTime,
    appointmentDate,
    user: req.user._id,
  });

  const createdAppointment = await appointment.save();

  res.status(201).json(createdAppointment);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private

const getAppointmentById = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({
    user: req.user.id,
    appointmentDate: req.params.id,
  });
  if (appointments) {
    res.json(appointments);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getAllAppointmentDates = asyncHandler(async (req, res) => {
  const allappointments = await Appointment.find({
    user: req.user.id,
  });
  if (allappointments) {
    res.json(allappointments);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getAllAppointments = asyncHandler(async (req, res) => {
  const allappointments = await Appointment.find()
    .populate("user")
    .populate("doctor_id");

  if (allappointments) {
    res.json(allappointments);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       isAdmin: user.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// // @desc    Create new order
// // @route   POST /api/orders
// // @access  Private
// const getAppointmentSlot = asyncHandler(async (req, res) => {
//   const { orderItems, appointmentDate } = req.body;

//   const appointment = new Appointment({
//     orderItems,

//     appointmentDate,
//     user: req.user._id,
//   });

//   const createdAppointment = await appointment.save();

//   res.status(201).json(createdAppointment);
// });

export {
  addAppointments,
  getAppointmentById,
  getAllAppointmentDates,
  getAllAppointments,
};
