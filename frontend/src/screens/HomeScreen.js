import React, { useEffect, lazy, useState, Suspense, useMemo } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listDoctors } from "../actions/doctorActions";
import { listSpecialists } from "../actions/specialistActions";
import { listSliders } from "../actions/sliderActions";
import { listTestCategories } from "../actions/testCategoriesActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));
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

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  const doctorList = useSelector((state) => state.doctorList);
  const { loading, error, doctors } = doctorList;

  const specialistList = useSelector((state) => state.specialistList);
  const { specialists } = specialistList;

  const sliderList = useSelector((state) => state.sliderList);
  const { sliders } = sliderList;

  const testCategoryList = useSelector((state) => state.testCategories);
  const { testCategories } = testCategoryList;

  useEffect(() => {
    if (!dataFetched) {
      dispatch(listDoctors());
      dispatch(listSpecialists());
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

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Header />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      <main className="main-content">
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
                      <button className="slider-button">
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
          <section className="features-section mb-5">
            <h2 className="text-center mb-5">Our Services</h2>
            <Row>
              {features.map((feature, index) => (
                <Col key={index} md={3} className="mb-4">
                  <Card className="text-center h-100 border-0 shadow-sm hover-effect">
                    <Card.Body>
                      <div className="text-primary mb-3">
                        <i className={`fas fa-${feature.icon} fa-3x`}></i>
                      </div>
                      <Card.Title>{feature.title}</Card.Title>
                      <Card.Text>{feature.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          {/* Doctors Section */}
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <section className="doctors-section">
              <h2 className="text-center mb-5">Our Expert Doctors</h2>
              <Row>
                {filteredDoctors.map((doctor) => (
                  <Col key={doctor._id} sm={12} md={6} lg={4} xl={3}>
                    <Card className="doctor-card mb-4 border-0 shadow-sm hover-effect">
                      <div className="img-wrapper" style={{ height: "200px", overflow: "hidden" }}>
                        <Card.Img
                          variant="top"
                          src={doctor.image}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/300x300?text=Doctor";
                          }}
                          style={{ height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <Card.Body className="text-center">
                        <Card.Title>{doctor.name}</Card.Title>
                        <Card.Text className="text-muted">{doctor.specialization}</Card.Text>
                        <Link to={`/doctor/${doctor._id}`} className="btn btn-primary">
                          View Profile
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
          )}

          {/* Specialties Section */}
          <section className="specialties-section py-5">
            <h2 className="text-center mb-5">Our Specialties</h2>
            <Row>
              {specialists && specialists.map((specialist) => (
                <Col key={specialist._id} md={4} lg={3} className="mb-4">
                  <Card className="specialty-card text-center h-100 border-0 shadow-sm hover-effect">
                    <Card.Body>
                      <Card.Title>{specialist.name}</Card.Title>
                      <Link to={`/doctors/specialty/${specialist._id}`} className="btn btn-outline-primary mt-3">
                        Find Doctors
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </Container>
      </main>

      <style>
        {`
          .hero-section {
            position: relative;
            height: 100vh;
            background: #000;
            overflow: hidden;
          }

          .hero-slider {
            height: 100%;
          }

          .slider-item {
            position: relative;
            height: 100vh;
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
        `}
      </style>
      <Footer />
    </Suspense>
  );
};

export default HomeScreen;
