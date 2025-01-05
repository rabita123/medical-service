const tests = [
  {
    name: "Complete Blood Count (CBC)",
    description: "A blood test that evaluates the three major types of blood cells: red blood cells, white blood cells, and platelets.",
    price: 800,
    preparation: "Fasting for 8-12 hours may be required",
    duration: 30,
    report_time: 24,
    is_available: true,
    image: "/assets/img/tests/blood-test.jpg",
    category_name: "Blood Tests"
  },
  {
    name: "Lipid Profile",
    description: "Measures different types of cholesterol and triglycerides in your blood to assess heart health.",
    price: 1200,
    preparation: "12-14 hours fasting required",
    duration: 20,
    report_time: 24,
    is_available: true,
    image: "/assets/img/tests/lipid-test.jpg",
    category_name: "Blood Tests"
  },
  {
    name: "Thyroid Function Test",
    description: "Checks how well your thyroid gland is working by measuring thyroid hormone levels.",
    price: 1500,
    preparation: "No special preparation needed",
    duration: 25,
    report_time: 48,
    is_available: true,
    image: "/assets/img/tests/thyroid-test.jpg",
    category_name: "Hormone Tests"
  },
  {
    name: "X-Ray Chest",
    description: "Produces images of your chest, including heart, lungs, blood vessels, airways, and bones.",
    price: 600,
    preparation: "Remove any metal objects",
    duration: 15,
    report_time: 24,
    is_available: true,
    image: "/assets/img/tests/xray-test.jpg",
    category_name: "Radiology"
  },
  {
    name: "MRI Brain",
    description: "Detailed imaging test that produces detailed images of your brain and brain stem.",
    price: 8000,
    preparation: "Remove all metal objects, inform about any implants",
    duration: 45,
    report_time: 72,
    is_available: true,
    image: "/assets/img/tests/mri-test.jpg",
    category_name: "Radiology"
  },
  {
    name: "Vitamin D Test",
    description: "Measures the level of vitamin D in your blood to check for deficiency.",
    price: 1800,
    preparation: "No special preparation needed",
    duration: 20,
    report_time: 48,
    is_available: true,
    image: "/assets/img/tests/vitamin-test.jpg",
    category_name: "Blood Tests"
  },
  {
    name: "HbA1c",
    description: "Measures your average blood sugar levels over the past 2-3 months.",
    price: 900,
    preparation: "No fasting required",
    duration: 15,
    report_time: 24,
    is_available: true,
    image: "/assets/img/tests/diabetes-test.jpg",
    category_name: "Diabetes"
  },
  {
    name: "Liver Function Test",
    description: "Series of tests to check how well your liver is working.",
    price: 1000,
    preparation: "8-12 hours fasting required",
    duration: 30,
    report_time: 24,
    is_available: true,
    image: "/assets/img/tests/liver-test.jpg",
    category_name: "Blood Tests"
  }
];

export default tests; 