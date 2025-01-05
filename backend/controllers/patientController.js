import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Patient from '../models/patientModel.js'




// @desc    Fetch all doctors
// @route   GET /api/doctors
// // @access  Public
const authPatient = asyncHandler(async (req, res) => {

   const {email,password}=req.body
   const patient=await Patient.findOne({email})

    if(patient && (await patient.matchPassword(password)))
    {
      res.json({
       _id:patient._id,
        name:patient.name,
        email:patient.email,
        mobile:patient.mobile,
        isAdmin:patient.isAdmin,
        token: generateToken(user._id)
    })
    }
    else {
        res.status(401)
        throw new Error('Invalid email or password')
      }


  })



// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getPatientProfile = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.patient._id)

  if (patient) {
    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      mobile:patient.mobile,
      isAdmin: patient.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})




  export {authPatient,getPatientProfile}