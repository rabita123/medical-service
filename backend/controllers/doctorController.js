import asyncHandler from "express-async-handler";
import Doctor from "../models/doctorModel.js";
import Specialist from "../models/specialistModel.js";

// @desc    Fetch all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = asyncHandler(async (req, res) => {
  try {
    console.log('Fetching all doctors...');
    const doctors = await Doctor.find({});
    console.log(`Found ${doctors.length} doctors`);
    res.json(doctors);
  } catch (error) {
    console.error('Error in getDoctors:', error);
    res.status(500).json({
      message: 'Error fetching doctors',
      error: error.message
    });
  }
});

// @desc    Fetch all Doctors by Specialty
// @route   GET /api/doctors/specialty/:specialty
// @access  Public
const getAllDoctorsBySpeciality = asyncHandler(async (req, res) => {
  try {
    const specialty = req.params.specialty;
    console.log('Fetching doctors by specialty:', specialty);
    
    // Find doctors with that specialization (case-insensitive)
    const doctors = await Doctor.find({ 
      specialization: { 
        $regex: new RegExp('^' + specialty + '$', 'i') 
      } 
    });
    
    console.log(`Found ${doctors.length} doctors for specialty ${specialty}`);
    
    if (doctors.length === 0) {
      return res.status(404).json({
        message: `No doctors found for specialty: ${specialty}`
      });
    }
    
    res.json(doctors);
  } catch (error) {
    console.error('Error in getAllDoctorsBySpeciality:', error);
    res.status(500).json({
      message: 'Error fetching doctors by specialty',
      error: error.message
    });
  }
});

// @desc    Fetch single doctor
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorsProfileById = asyncHandler(async (req, res) => {
  try {
    console.log('Fetching doctor profile by ID:', req.params.id);
    
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('Invalid doctor ID format:', req.params.id);
      return res.status(400).json({
        message: 'Invalid doctor ID format'
      });
    }

    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      console.log('Doctor not found with ID:', req.params.id);
      return res.status(404).json({
        message: 'Doctor not found'
      });
    }

    // Add default values for required fields if they're missing
    const doctorResponse = {
      ...doctor.toObject(),
      name: doctor.name || 'Doctor',
      specialization: doctor.specialization || 'Medical Professional',
      degree: doctor.degree || 'Medical Degree',
      location: doctor.location || 'Location not specified',
      fees: doctor.fees || 'Consultation fee not specified',
      days: doctor.days || 'Schedule not specified',
      times: doctor.times || 'Timing not specified',
      image: doctor.image || '/assets/img/doctors/doctor-thumb-01.jpg'
    };

    console.log('Found doctor:', doctorResponse);
    res.json(doctorResponse);
  } catch (error) {
    console.error('Error in getDoctorsProfileById:', error);
    res.status(500).json({
      message: 'Error fetching doctor profile',
      error: error.message
    });
  }
});

// @desc    Create a doctor
// @route   POST /api/doctors
// @access  Private/Admin
const createDoctors = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      image,
      fees,
      location,
      degree,
      specialization,
      days,
      times,
    } = req.body;

    console.log('Creating new doctor:', name);
    const doctor = await Doctor.create({
      name,
      image,
      fees,
      location,
      degree,
      specialization,
      days,
      times,
    });

    console.log('Doctor created successfully:', doctor.name);
    res.status(201).json(doctor);
  } catch (error) {
    console.error('Error in createDoctors:', error);
    res.status(500).json({
      message: 'Error creating doctor',
      error: error.message
    });
  }
});

// @desc    Update a doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin
const updateDoctor = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      image,
      fees,
      location,
      degree,
      specialization,
      days,
      times,
    } = req.body;

    console.log('Updating doctor with ID:', req.params.id);
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      console.log('Doctor not found with ID:', req.params.id);
      return res.status(404).json({
        message: 'Doctor not found'
      });
    }

    doctor.name = name;
    doctor.image = image;
    doctor.fees = fees;
    doctor.location = location;
    doctor.degree = degree;
    doctor.specialization = specialization;
    doctor.days = days;
    doctor.times = times;

    const updatedDoctor = await doctor.save();
    console.log('Doctor updated successfully:', updatedDoctor.name);
    res.json(updatedDoctor);
  } catch (error) {
    console.error('Error in updateDoctor:', error);
    res.status(500).json({
      message: 'Error updating doctor',
      error: error.message
    });
  }
});

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctor = asyncHandler(async (req, res) => {
  try {
    console.log('Deleting doctor with ID:', req.params.id);
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      console.log('Doctor not found with ID:', req.params.id);
      return res.status(404).json({
        message: 'Doctor not found'
      });
    }

    await doctor.remove();
    console.log('Doctor deleted successfully');
    res.json({ message: 'Doctor removed' });
  } catch (error) {
    console.error('Error in deleteDoctor:', error);
    res.status(500).json({
      message: 'Error deleting doctor',
      error: error.message
    });
  }
});

export {
  getDoctors,
  getDoctorsProfileById,
  getAllDoctorsBySpeciality,
  createDoctors,
  updateDoctor,
  deleteDoctor,
};
