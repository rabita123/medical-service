import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { resetpassword } from "../../actions/userActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ToastProvider, useToasts } from "react-toast-notifications";
import swal from "sweetalert";
const ResetPasswordScreen = ({ location, history }) => {
  const [password, setPassword] = useState("");

  const gettoken = location.pathname;
  const tokensplit = gettoken.split("/");
  const token = tokensplit[2];

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {}, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetpassword(password, token));
    swal({
      title: "Congratulations!",
      text: "Your  password has been changed successfully!",
      icon: "success",
    }).then(function () {
      window.location = "/";
    });

    // addToast("Your password has been reset successfully", {
    //   //  id: "generated-string",
    //   appearance: "success",
    //   autoDismiss: "true",
    //   autoDismissTimeout: 2000,
    //   placement: "top-center",
    // });
  };

  return (
    <body class="account-page">
      <div class="main-wrapper">
        <Header />

        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <div class="account-content">
                  <div class="row align-items-center justify-content-center">
                    <div class="col-md-7 col-lg-6 login-left">
                      <img
                        src="/assets/img/login-banner.png"
                        class="img-fluid"
                        alt="Login Banner"
                      />
                    </div>
                    <div class="col-md-12 col-lg-6 login-right">
                      <div class="login-header">
                        <h3>Reset Password?</h3>
                        <p class="small text-muted">Enter your new password</p>
                      </div>

                      <Form onSubmit={submitHandler}>
                        <div class="form-group form-focus">
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            class="form-control floating"
                          />
                          <label class="focus-label">Password</label>
                        </div>
                        <div class="text-right">
                          <a class="forgot-link" href="login.html">
                            Remember your password?
                          </a>
                        </div>
                        <button
                          class="btn btn-primary btn-block btn-lg login-btn"
                          type="submit"
                        >
                          Submit
                        </button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </body>
  );
};

export default ResetPasswordScreen;
