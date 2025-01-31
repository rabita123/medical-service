import React, { useEffect, lazy, useState, Suspense, useMemo } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listDoctors } from "../actions/doctorActions";
import { listSliders } from "../actions/sliderActions";
import { listTestCategories } from "../actions/testCategoriesActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = lazy(() => import("../components/Header"));
const TopHeader = lazy(() => import("../components/TopHeader"));

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="alert alert-danger text-center m-3" role="alert">
    {message}
  </div>
);

const CustomNextArrow = ({ className, style, onClick }) => (
  <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
    <i className="fas fa-chevron-right"></i>
  </div>
);

const CustomPrevArrow = ({ className, style, onClick }) => (
  <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
    <i className="fas fa-chevron-left"></i>
  </div>
);

const specialtiesData = [
  {
    id: 1,
    name: 'Cardiologist',
    icon: 'heart',
    description: 'Heart and cardiovascular specialists'
  },
  {
    id: 2,
    name: 'Dermatologist',
    icon: 'user-md',
    description: 'Skin care specialists'
  },
  {
    id: 3,
    name: 'Neurologist',
    icon: 'brain',
    description: 'Brain and nervous system specialists'
  },
  {
    id: 4,
    name: 'Orthopedic',
    icon: 'bone',
    description: 'Bone and joint specialists'
  }
];

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();

  const doctorList = useSelector((state) => state.doctorList);
  const { loading, error, doctors } = doctorList;

  const sliderList = useSelector((state) => state.sliderList);
  const { sliders } = sliderList;

  const testCategoryList = useSelector((state) => state.testCategories);
  const { testCategories } = testCategoryList;

  useEffect(() => {
    if (!dataFetched) {
      dispatch(listDoctors());
      dispatch(listSliders());
      dispatch(listTestCategories());
      setDataFetched(true);
    }
  }, [dispatch, dataFetched]);

  const filteredDoctors = useMemo(() => {
    if (!doctors) return [];
    return doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [doctors, searchTerm]);

  const features = [
    { icon: 'user-md', title: "Expert Doctors", description: "Find experienced doctors across all specialties" },
    { icon: 'hospital', title: "Medical Services", description: "Comprehensive healthcare services under one roof" },
    { icon: 'ambulance', title: "Emergency Care", description: "24/7 emergency medical assistance" },
    { icon: 'clinic-medical', title: "Medical Tests", description: "Advanced diagnostic and laboratory services" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'cubic-bezier(0.87, 0, 0.13, 1)',
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    appendDots: dots => (
      <div className="custom-dots">
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className="custom-dot"></div>
    )
  };

  const defaultSlides = [
    {
      _id: 'slide1',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=2091&q=80',
      name: 'Expert Healthcare',
      description: 'Leading the way in medical excellence'
    },
    {
      _id: 'slide2',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2080&q=80',
      name: 'Advanced Technology',
      description: 'State-of-the-art medical facilities'
    },
    {
      _id: 'slide3',
      image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=2070&q=80',
      name: 'Compassionate Care',
      description: 'Dedicated to your well-being'
    }
  ];

  const handleLearnMore = (slide) => {
    navigate('/services');
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Header />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      <main className="main-content" style={{ marginTop: 0 }}>
        <div className="hero-section">
          <Slider {...settings} className="hero-slider">
            {(sliders?.length ? sliders : defaultSlides).map((slide) => (
              <div key={slide._id} className="slider-item">
                <div className="slider-image-wrapper">
                  <img
                    src={slide.image}
                    alt={slide.name}
                    className="slider-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      const defaultSlide = defaultSlides[0];
                      e.target.src = defaultSlide.image;
                    }}
                  />
                  <div className="slider-overlay"></div>
                  <div className="slider-content">
                    <div className="slider-text-animation">
                      <h2 className="slider-title">{slide.name}</h2>
                      <p className="slider-description">{slide.description}</p>
                      <button 
                        className="slider-button"
                        onClick={() => handleLearnMore(slide)}
                      >
                        Learn More <i className="fas fa-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          <div className="hero-search-container">
            <div className="search-box">
              <h1 className="search-title">Find Your Doctor</h1>
              <div className="search-input-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search doctors by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
          </div>
        </div>

        <Container className="py-5">
          {/* Features Section */}
          <section className="features-section py-5">
            <Container>
              <h2 className="text-center mb-5">Our Services</h2>
              <Row>
                {features.map((feature, index) => (
                  <Col key={index} md={3} className="mb-4">
                    <Card className="h-100 service-card">
                      <Card.Body className="text-center">
                        <div className="service-icon mb-3">
                          <i className={`fas fa-${feature.icon} fa-3x`}></i>
                        </div>
                        <Card.Title>{feature.title}</Card.Title>
                        <Card.Text>{feature.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </section>

          {/* Specialties Section */}
          <section className="specialties-section py-5 bg-light">
            <Container>
              <h2 className="text-center mb-5">Our Specialties</h2>
              <Row>
                {specialtiesData.map((specialty) => (
                  <Col key={specialty.id} md={3} className="mb-4">
                    <Link 
                      to={`/doctors/specialty/${specialty.name.toLowerCase()}`} 
                      className="text-decoration-none"
                    >
                      <Card className="h-100 specialty-card">
                        <Card.Body className="text-center">
                          <div className="specialty-icon mb-3">
                            <i className={`fas fa-${specialty.icon} fa-3x text-primary`}></i>
                          </div>
                          <Card.Title>{specialty.name}</Card.Title>
                          <Card.Text>{specialty.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Container>
          </section>

          {/* Doctors Section */}
          <section className="doctors-section py-5">
            <Container>
              <h2 className="text-center mb-5">Our Expert Doctors</h2>
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorMessage message={error} />
              ) : (
                <Row>
                  {filteredDoctors.slice(0, 4).map((doctor) => (
                    <Col key={doctor._id} md={3} className="mb-4">
                      <Card className="h-100 doctor-card">
                        <Card.Img
                          variant="top"
                          src={doctor.image || '/assets/img/doctors/doctor-thumb-01.jpg'}
                          alt={doctor.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/assets/img/doctors/doctor-thumb-01.jpg';
                          }}
                        />
                        <Card.Body>
                          <Card.Title>{doctor.name}</Card.Title>
                          <Card.Text>{doctor.specialization}</Card.Text>
                          <Link 
                            to={`/doctor/${doctor._id}`}
                            className="btn btn-primary w-100"
                          >
                            View Profile
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Container>
          </section>
        </Container>
      </main>

      <style>
        {`
          .main-content {
            margin-top: 0 !important;
          }

          .hero-section {
            position: relative;
            height: calc(100vh - 60px); /* Subtract navbar height */
            background: #000;
            overflow: hidden;
            margin-top: 60px; /* Add margin equal to navbar height */
          }

          .hero-slider {
            height: 100%;
          }

          .slider-item {
            position: relative;
            height: calc(100vh - 60px); /* Subtract navbar height */
          }

          .slider-image-wrapper {
            position: relative;
            height: 100%;
            width: 100%;
            overflow: hidden;
          }

          .slider-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: scale(1.1);
            transition: transform 6s ease-in-out;
          }

          .slick-active .slider-image {
            transform: scale(1);
          }

          .slider-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              45deg,
              rgba(0, 0, 0, 0.7) 0%,
              rgba(0, 0, 0, 0.4) 100%
            );
          }

          .slider-content {
            position: absolute;
            top: 50%;
            left: 10%;
            transform: translateY(-50%);
            color: white;
            z-index: 2;
            max-width: 600px;
          }

          .slider-text-animation {
            opacity: 0;
            transform: translateY(20px);
            animation: slideUp 1s ease forwards;
            animation-delay: 0.5s;
          }

          .slider-title {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 1rem;
            line-height: 1.2;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          }

          .slider-description {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          }

          .slider-button {
            padding: 1rem 2rem;
            font-size: 1.1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            background: linear-gradient(45deg, #007bff, #0056b3);
            border: none;
            color: white;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          }

          .slider-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            background: linear-gradient(45deg, #0056b3, #004094);
          }

          .custom-dots {
            position: absolute;
            bottom: 30px;
            width: 100%;
            text-align: center;
            z-index: 3;
          }

          .custom-dot {
            width: 12px;
            height: 12px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            margin: 0 5px;
            transition: all 0.3s ease;
            display: inline-block;
          }

          .slick-active .custom-dot {
            background: white;
            transform: scale(1.2);
          }

          .slick-arrow {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(5px);
            z-index: 2;
            transition: all 0.3s ease;
            display: flex !important;
            align-items: center;
            justify-content: center;
          }

          .slick-arrow:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
          }

          .slick-prev {
            left: 30px;
          }

          .slick-next {
            right: 30px;
          }

          .hero-search-container {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 50%);
            width: 80%;
            max-width: 800px;
            z-index: 3;
          }

          .search-box {
            background: rgba(255, 255, 255, 0.95);
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            backdrop-filter: blur(10px);
          }

          .search-title {
            font-size: 2rem;
            color: #333;
            margin-bottom: 1.5rem;
            text-align: center;
            font-weight: 600;
          }

          .search-input-wrapper {
            position: relative;
          }

          .search-icon {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #666;
            font-size: 1.2rem;
          }

          .search-input {
            width: 100%;
            padding: 1.2rem 1.2rem 1.2rem 50px;
            border: 2px solid #eee;
            border-radius: 50px;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            background: white;
          }

          .search-input:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
            outline: none;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .slider-title {
              font-size: 2.5rem;
            }
            
            .slider-description {
              font-size: 1.2rem;
            }

            .hero-search-container {
              width: 95%;
              transform: translate(-50%, 30%);
            }

            .search-box {
              padding: 1.5rem;
            }

            .search-title {
              font-size: 1.5rem;
            }

            .slick-arrow {
              display: none !important;
            }
          }

          .specialties-section {
            background-color: #f8f9fa;
          }

          .specialty-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }

          .specialty-card:hover {
            transform: translateY(-5px);
          }

          .specialty-icon {
            color: #2193b0;
            height: 60px;
            width: 60px;
            line-height: 60px;
            border-radius: 50%;
            background: rgba(33, 147, 176, 0.1);
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .specialty-title {
            color: #333;
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .btn-primary {
            background: #2193b0;
            border-color: #2193b0;
            border-radius: 25px;
            padding: 0.5rem 1.5rem;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .btn-primary:hover {
            background: #1c7a94;
            border-color: #1c7a94;
            transform: translateY(-2px);
          }

          .text-decoration-none {
            color: inherit;
            display: block;
          }

          .text-decoration-none:hover {
            text-decoration: none;
            color: inherit;
          }

          .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          }

          .doctor-card .btn-primary,
          .specialty-card .btn-primary {
            pointer-events: auto;
            position: relative;
            z-index: 1;
          }

          .card-link {
            position: relative;
            display: block;
            color: inherit;
            text-decoration: none;
          }

          .card-link:hover {
            color: inherit;
            text-decoration: none;
          }
        `}
      </style>
    </Suspense>
  );
};

export default HomeScreen;
