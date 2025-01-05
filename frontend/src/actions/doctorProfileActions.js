import axios from 'axios'
import {
    DOCTOR_PROFILE_REQUEST,
    DOCTOR_PROFILE_SUCCESS,
    DOCTOR_PROFILE_FAIL,
  


} from '../constants/doctorProfileConstants'

// Helper function to validate doctor data
const validateDoctorData = (data) => {
  if (!data) {
    throw new Error('No data received from server');
  }
  // Only validate that we have some data
  if (typeof data !== 'object') {
    throw new Error('Invalid doctor profile data format');
  }
  return data;
};

export const listDoctorsProfile = (id) => async (
  dispatch
) => {
  try {
    dispatch({ type: DOCTOR_PROFILE_REQUEST })

    console.log('Fetching doctor profile for ID:', id)
    const { data } = await axios.get(`/api/doctors/${id}`)
    
    // Add more detailed logging
    console.log('Raw API response:', data)
    
    const validatedData = validateDoctorData(data)
    console.log('Validated doctor profile:', validatedData)
    
    dispatch({
      type: DOCTOR_PROFILE_SUCCESS,
      payload: validatedData,
    })
  } catch (error) {
    console.error('Error fetching doctor profile:', error)
    dispatch({
      type: DOCTOR_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}






// export const listProfiles = () => async (
//   dispatch
// ) => {
//   try {
//     dispatch({ type: DOCTOR_LIST_REQUEST })

//     const { data } = await axios.get('/api/doctors' )

//     dispatch({
//       type: DOCTOR_LIST_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: DOCTOR_LIST_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }





