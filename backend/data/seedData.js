import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '1234567890',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
];

const testCategories = [
  {
    category_name: 'Blood Tests',
  },
  {
    category_name: 'Urine Tests',
  },
  {
    category_name: 'Imaging Tests',
  },
];

const tests = [
  {
    name: 'Complete Blood Count (CBC)',
    description: 'Measures different components of your blood, including red and white blood cells, platelets, and hemoglobin.',
    price: 1200,
    preparation: 'Fasting for 8-12 hours may be required',
    duration: 30,
    report_time: 24,
    is_available: true,
  },
  {
    name: 'Blood Sugar Test',
    description: 'Measures the amount of glucose in your blood to diagnose or monitor diabetes.',
    price: 800,
    preparation: 'Fasting for 8-12 hours is required',
    duration: 15,
    report_time: 12,
    is_available: true,
  },
  {
    name: 'Urinalysis',
    description: 'Analyzes the physical, chemical, and microscopic properties of urine.',
    price: 600,
    preparation: 'Clean catch sample required',
    duration: 20,
    report_time: 24,
    is_available: true,
  },
  {
    name: 'X-Ray Chest',
    description: 'Produces images of your chest, including heart, lungs, blood vessels, airways, and bones.',
    price: 1500,
    preparation: 'Remove any metal objects or jewelry',
    duration: 45,
    report_time: 48,
    is_available: true,
  },
];

export { users, testCategories, tests }; 