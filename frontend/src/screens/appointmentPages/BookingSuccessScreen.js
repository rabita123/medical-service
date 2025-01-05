import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BookingSuccessScreen = () => {
  return (
    <div>
      <Header />
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Booking Success
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Booking Success</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="content success-page-cont">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card success-card">
                <div className="card-body">
                  <div className="success-cont">
                    <i className="fas fa-check"></i>
                    <h3>Appointment booked Successfully!</h3>
                    <p>
                      Your appointment has been booked successfully. 
                      <br />
                      The doctor will contact you soon.
                    </p>
                    <Link to="/" className="btn btn-primary view-inv-btn">
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx="true">{`
        .success-page-cont {
          margin: 50px 0;
        }
        .success-card {
          text-align: center;
          padding: 50px 20px;
        }
        .success-cont {
          padding: 30px;
        }
        .success-cont i {
          font-size: 50px;
          color: #28a745;
          margin-bottom: 20px;
          display: block;
        }
        .success-cont h3 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .success-cont p {
          margin-bottom: 30px;
        }
        .view-inv-btn {
          min-width: 200px;
          padding: 12px 20px;
        }
      `}</style>
    </div>
  );
};

export default BookingSuccessScreen;
