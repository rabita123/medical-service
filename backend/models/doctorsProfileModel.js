import mongoose from 'mongoose'



const doctorsProfileSchema = mongoose.Schema(
    
  {
   
      doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor',
      },



      education: {
        degree: { type: String, required: true },
        college: { type: String, required: true },
        year_of_completion: { type: String, required: true },
      
      },

      experience: {
        hospital_name: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
        designation: { type: String, required: true },
      
      },
      contact: {
        phone: { type: String, required: true },
        address1: { type: String, required: true },
        address2: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        postal_code: { type: String, required: true },
      
      },
      price: {
        type: Number,
        required: true,
      },
     },
    {
      timestamps: true,
    }
  )
  const DoctorsProfile = mongoose.model('DoctorsProfile', doctorsProfileSchema)

export default DoctorsProfile