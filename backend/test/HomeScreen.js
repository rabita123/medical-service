import React, { useEffect } from "react";
import Slider from "react-slick";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listDoctors } from "../actions/doctorActions";
import { listSpecialists } from "../actions/specialistActions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopHeader from "../components/TopHeader";

const HomeScreen = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listSpecialists());
    dispatch(listDoctors());
  }, [dispatch]);

  const doctorList = useSelector((state) => state.doctorList);
  const { loading, error, doctors } = doctorList;

  const specialist = useSelector((state) => state.specialist);
  const { specialists } = specialist;
  console.log(specialists);

  return (
    <div class="main-wrapper">
      <TopHeader />
      <Header />

      {/* <!-- Home Banner --> */}
      <section id="home" class="divider">
        <div class="container-fluid p-0">
          {/* <!--- slider ----> */}
          <div
            id="carouselExampleIndicators"
            class="carousel slide carousel-fade"
            data-ride="carousel"
            data-interval="2500"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  class="d-block w-100"
                  src="assets/img/slider/slider-1.jpg"
                  alt="First slide"
                />
                <div class="carousel-caption d-none d-md-block">
                  <span>We Provide Solution</span>
                  <h2>To stressless Life</h2>
                  <p>
                    People who are more perfectionist are most likely to be
                    depressed,Because they stress themselves out so much.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="assets/img/slider/slider-2.jpg"
                  alt="Second slide"
                />
                <div class="carousel-caption d-none d-md-block">
                  <span>We Provide Solution</span>
                  <h2>Health Care Solution</h2>
                  <p>
                    Every day we bring hope to millions of children in the
                    world's hardest places as a sign of God's unconditional
                    love.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="assets/img/slider/slider-3.jpg"
                  alt="Third slide"
                />
                <div class="carousel-caption d-none d-md-block">
                  <span>We Provide total</span>
                  <h2>Personalised care</h2>
                  <p>
                    People who are more perfectionist are most likely to be
                    depressed,Because they stress themselves out so much.
                  </p>
                </div>
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          {/* <!--- /slider ----> */}
          {/* <!-- Search --> */}
          <div class="banner-wrapper">
            <div class="search-box search-box-3">
              <form action="https://doccure-html.dreamguystech.com/template/search.html">
                <div class="form-group search-location">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Location"
                  />
                </div>
                <div class="form-group search-info">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Doctors, Clinics, Hospitals, Diseases Etc"
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-primary search-btn btn-search mt-0"
                >
                  <i class="fas fa-search"></i> <span>Search</span>
                </button>
              </form>
            </div>
          </div>
          {/* <!-- /Search --> */}
        </div>
      </section>
      {/* <!-- /Home Banner -->   */}
      <section class="section home-tile-section">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-9 m-auto">
              <div class="section-header text-center">
                <h2>What are you looking for?</h2>
              </div>
              <div class="row">
                <div class="col-lg-4 mb-3">
                  <div class="card text-center doctor-book-card">
                    <img
                      src="assets/img/doctors/doctor-07.jpg"
                      alt=""
                      class="img-fluid"
                    />
                    <div class="doctor-book-card-content tile-card-content-1">
                      <div>
                        <h3 class="card-title mb-0">Visit a Doctor</h3>
                        <a
                          href="search.html"
                          class="btn book-btn1 px-3 py-2 mt-3"
                          tabindex="0"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 mb-3">
                  <div class="card text-center doctor-book-card">
                    <img
                      src="assets/img/img-pharmacy1.jpg"
                      alt=""
                      class="img-fluid"
                    />
                    <div class="doctor-book-card-content tile-card-content-1">
                      <div>
                        <h3 class="card-title mb-0">Find a Pharmacy</h3>
                        <a
                          href="pharmacy-search.html"
                          class="btn book-btn1 px-3 py-2 mt-3"
                          tabindex="0"
                        >
                          Find Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 mb-3">
                  <div class="card text-center doctor-book-card">
                    <img
                      src="assets/img/lab-image.jpg"
                      alt=""
                      class="img-fluid"
                    />
                    <div class="doctor-book-card-content tile-card-content-1">
                      <div>
                        <h3 class="card-title mb-0">Find a Lab</h3>
                        <a
                          href="javascript:void(0);"
                          class="btn book-btn1 px-3 py-2 mt-3"
                          tabindex="0"
                        >
                          Coming Soon
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Clinic and Specialities --> */}
      <section class="section section-specialities">
        <div class="container-fluid">
          <div class="section-header text-center">
            <h2>Clinic and Specialities</h2>
            <p class="sub-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-9">
              <Slider {...settings}>
                {specialists.map((specialist) => (
                  <div class="speicality-item text-center">
                    <div class="speicality-img">
                      <img
                        src={specialist.image}
                        class="img-fluid"
                        alt="Speciality"
                      />

                      <span>
                        <i class="fa fa-circle" aria-hidden="true"></i>
                      </span>
                    </div>
                    <p>{specialist.name}</p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Clinic and Specialities --> */}

      {/* <!-- Category Section --> */}
      <section class="section section-category">
        <div class="container">
          <div class="section-header text-center">
            <h2>Browse by Specialities</h2>
            <p class="sub-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="row">
            <div class="col-lg-3">
              <div class="category-box">
                <div class="category-image">
                  <img src="assets/img/category/1.png" alt="" />
                </div>
                <div class="category-content">
                  <h4>Urology</h4>
                  <span>21 Doctors</span>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="category-box">
                <div class="category-image">
                  <img src="assets/img/category/2.png" alt="" />
                </div>
                <div class="category-content">
                  <h4>Neurology</h4>
                  <span>18 Doctors</span>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="category-box">
                <div class="category-image">
                  <img src="assets/img/category/3.png" alt="" />
                </div>
                <div class="category-content">
                  <h4>Orthopedic</h4>
                  <span>17 Doctors</span>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="category-box">
                <div class="category-image">
                  <img src="assets/img/category/4.png" alt="" />
                </div>
                <div class="category-content">
                  <h4>Cardiologist</h4>
                  <span>12 Doctors</span>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="category-box">
                <div class="category-image">
                  <img src="assets/img/category/5.png" alt="" />
                </div>
                <div class="category-content">
                  <h4>Dentist</h4>
                  <span>07 Doctors</span>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="category-box">
                <div class="category-image">
                  <img src="assets/img/category/1.png" alt="" />
                </div>
                <div class="category-content">
                  <h4>Urology</h4>
                  <span>16 Doctors</span>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="category-box">
                <div class="category-image">
                  <img src="assets/img/category/4.png" alt="" />
                </div>
                <div class="category-content">
                  <h4>Cardiologist</h4>
                  <span>18 Doctors</span>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="category-box">
                <div class="category-image">
                  <img src="assets/img/category/3.png" alt="" />
                </div>
                <div class="category-content">
                  <h4>Neurology</h4>
                  <span>22 Doctors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Category Section --> */}

      {/* <!-- Popular Section --> */}
      <section class="section section-doctor">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-4">
              <div class="section-header ">
                <h2>Book Our Doctor</h2>
                <p>Lorem Ipsum is simply dummy text </p>
              </div>
              <div class="about-content">
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum.
                </p>
                <p>
                  web page editors now use Lorem Ipsum as their default model
                  text, and a search for 'lorem ipsum' will uncover many web
                  sites still in their infancy. Various versions have evolved
                  over the years, sometimes
                </p>
                <a href="javascript:;">Read More..</a>
              </div>
            </div>

            <div class="col-lg-8">
              <Slider {...settings}>
                {doctors.map((doctor) => (
                  <Row>
                    <Col>
                      <div class="profile-widget">
                        <div class="doc-img">
                          <img
                            class="img-fluid"
                            alt="User Image"
                            src={doctor.image}
                          />
                          <a href="javascript:void(0)" class="fav-btn">
                            {" "}
                            <i class="far fa-bookmark"></i>
                          </a>
                        </div>
                        <div class="pro-content">
                          <h3 class="title">
                            <Link to={`/profile/${doctor._id}`}>
                              {doctor.name}
                            </Link>
                            <i class="fas fa-check-circle verified"></i>
                          </h3>
                          <p class="speciality">{doctor.specialist}</p>
                          <div class="rating">
                            {" "}
                            <i class="fas fa-star filled"></i>
                            <i class="fas fa-star filled"></i>
                            <i class="fas fa-star filled"></i>
                            <i class="fas fa-star filled"></i>
                            <i class="fas fa-star filled"></i>
                            <span class="d-inline-block average-rating">
                              (17)
                            </span>
                          </div>
                          <ul class="available-info">
                            <li>
                              {" "}
                              <i class="fas fa-map-marker-alt"></i>{" "}
                              {doctor.location}
                            </li>
                            <li>
                              {" "}
                              <i class="far fa-clock"></i> Available on Fri, 22
                              Mar
                            </li>
                            <li>
                              {" "}
                              <i class="far fa-money-bill-alt"></i> $300 - $1000{" "}
                              <i
                                class="fas fa-info-circle"
                                data-toggle="tooltip"
                                title="Lorem Ipsum"
                              ></i>
                            </li>
                          </ul>
                          <div class="row row-sm">
                            <div class="col-6">
                              {" "}
                              <Link
                                class="btn view-btn"
                                to={`/profile/${doctor._id}`}
                              >
                                View Profile
                              </Link>
                            </div>
                            <div class="col-6">
                              {" "}
                              <a href="booking.html" class="btn book-btn">
                                Book Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Availabe Features --> */}
      <section class="section section-features">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-5 features-img">
              <img
                src="assets/img/features/feature.png"
                class="img-fluid"
                alt="Feature"
              />
            </div>
            <div class="col-md-7">
              <div class="section-header">
                <h2 class="mt-2">Be Our Partner</h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
              </div>
              <div class="features-slider slider">
                {/* <!-- Slider Item --> */}
                <div class="feature-item text-center">
                  <img
                    src="assets/img/features/feature-01.jpg"
                    class="img-fluid"
                    alt="Feature"
                  />
                  <p>Patient Ward</p>
                </div>
                {/* <!-- /Slider Item -->
							<!-- Slider Item --> */}
                <div class="feature-item text-center">
                  <img
                    src="assets/img/features/feature-02.jpg"
                    class="img-fluid"
                    alt="Feature"
                  />
                  <p>Test Room</p>
                </div>
                {/* <!-- /Slider Item -->
							<!-- Slider Item --> */}
                <div class="feature-item text-center">
                  <img
                    src="assets/img/features/feature-03.jpg"
                    class="img-fluid"
                    alt="Feature"
                  />
                  <p>ICU</p>
                </div>
                {/* <!-- /Slider Item -->
							<!-- Slider Item --> */}
                <div class="feature-item text-center">
                  <img
                    src="assets/img/features/feature-04.jpg"
                    class="img-fluid"
                    alt="Feature"
                  />
                  <p>Laboratory</p>
                </div>
                {/* <!-- /Slider Item --> */}
                {/* <!-- Slider Item --> */}
                <div class="feature-item text-center">
                  <img
                    src="assets/img/features/feature-05.jpg"
                    class="img-fluid"
                    alt="Feature"
                  />
                  <p>Operation</p>
                </div>
                {/* <!-- /Slider Item --> */}
                {/* <!-- Slider Item --> */}
                <div class="feature-item text-center">
                  <img
                    src="assets/img/features/feature-06.jpg"
                    class="img-fluid"
                    alt="Feature"
                  />
                  <p>Medical</p>
                </div>
                {/* <!-- /Slider Item --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /Availabe Features --> */}

      {/* <!-- Blog Section --> */}
      <section class="section section-blogs">
        <div class="container-fluid">
          {/* <!-- Section Header --> */}
          <div class="section-header text-center">
            <h2>Our Happy Clients</h2>
          </div>
          {/* <!-- /Section Header --> */}

          <div class="row blog-grid-row">
            <div class="col-md-6 col-lg-3 col-sm-12">
              {/* <!-- Blog Post --> */}
              <div class="blog grid-blog">
                <div class="blog-image">
                  <a href="blog-details.html">
                    <img
                      class="img-fluid"
                      src="assets/img/blog/blog-01.jpg"
                      alt="Post Image"
                    />
                  </a>
                </div>
                <div class="blog-content">
                  <ul class="entry-meta meta-item">
                    <li>
                      <div class="post-author">
                        <a href="doctor-profile.html">
                          <img
                            src="assets/img/doctors/doctor-thumb-01.jpg"
                            alt="Post Author"
                          />{" "}
                          <span>Mr.xyz</span>
                        </a>
                      </div>
                    </li>
                    <li>
                      <i class=""></i> Professor
                    </li>
                  </ul>

                  <p class="mb-0">
                    Lorem ipsum dolor sit amet, consectetur em adipiscing elit,
                    sed do eiusmod tempor.
                  </p>
                </div>
              </div>
              {/* <!-- /Blog Post --> */}
            </div>
            <div class="col-md-6 col-lg-3 col-sm-12">
              {/* <!-- Blog Post --> */}
              <div class="blog grid-blog">
                <div class="blog-image">
                  <a href="blog-details.html">
                    <img
                      class="img-fluid"
                      src="assets/img/blog/blog-02.jpg"
                      alt="Post Image"
                    />
                  </a>
                </div>
                <div class="blog-content">
                  <ul class="entry-meta meta-item">
                    <li>
                      <div class="post-author">
                        <a href="doctor-profile.html">
                          <img
                            src="assets/img/doctors/doctor-thumb-02.jpg"
                            alt="Post Author"
                          />{" "}
                          <span>Mr. Rahman</span>
                        </a>
                      </div>
                    </li>
                    <li>
                      <i></i>Teacher
                    </li>
                  </ul>

                  <p class="mb-0">
                    Lorem ipsum dolor sit amet, consectetur em adipiscing elit,
                    sed do eiusmod tempor.
                  </p>
                </div>
              </div>
              {/* <!-- /Blog Post --> */}
            </div>
            <div class="col-md-6 col-lg-3 col-sm-12">
              {/* <!-- Blog Post --> */}
              <div class="blog grid-blog">
                <div class="blog-image">
                  <a href="blog-details.html">
                    <img
                      class="img-fluid"
                      src="assets/img/blog/blog-03.jpg"
                      alt="Post Image"
                    />
                  </a>
                </div>
                <div class="blog-content">
                  <ul class="entry-meta meta-item">
                    <li>
                      <div class="post-author">
                        <a href="doctor-profile.html">
                          <img
                            src="assets/img/doctors/doctor-thumb-03.jpg"
                            alt="Post Author"
                          />{" "}
                          <span>Mr. Lawren</span>
                        </a>
                      </div>
                    </li>
                    <li>
                      <i></i> Director
                    </li>
                  </ul>

                  <p class="mb-0">
                    Lorem ipsum dolor sit amet, consectetur em adipiscing elit,
                    sed do eiusmod tempor.
                  </p>
                </div>
              </div>
              {/* <!-- /Blog Post --> */}
            </div>
            <div class="col-md-6 col-lg-3 col-sm-12">
              {/* <!-- Blog Post --> */}
              <div class="blog grid-blog">
                <div class="blog-image">
                  <a href="blog-details.html">
                    <img
                      class="img-fluid"
                      src="assets/img/blog/blog-04.jpg"
                      alt="Post Image"
                    />
                  </a>
                </div>
                <div class="blog-content">
                  <ul class="entry-meta meta-item">
                    <li>
                      <div class="post-author">
                        <a href="doctor-profile.html">
                          <img
                            src="assets/img/doctors/doctor-thumb-04.jpg"
                            alt="Post Author"
                          />{" "}
                          <span>Dr. Sofia </span>
                        </a>
                      </div>
                    </li>
                    <li>
                      <i></i> Engineer
                    </li>
                  </ul>

                  <p class="mb-0">
                    Lorem ipsum dolor sit amet, consectetur em adipiscing elit,
                    sed do eiusmod tempor.
                  </p>
                </div>
              </div>
              {/* <!-- /Blog Post --> */}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /Blog Section -->			 */}

      <Footer />
    </div>
  );
};

export default HomeScreen;
