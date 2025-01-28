import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import doctors from "./data/doctors.js";
import Doctor from "./models/doctorModel.js";
import connectDB from "./config/db.js";

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await Doctor.deleteMany();
    console.log('Deleted existing doctors'.red.inverse);

    const createdDoctors = await Doctor.insertMany(doctors);
    console.log(`${createdDoctors.length} doctors imported`.green.inverse);

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Doctor.deleteMany();
    console.log('Data Destroyed!'.red.inverse);

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
