// import React from "react";

// const FormUserDetails = ({ nextStep, prevStep, values, handleChange }) => {
//   const Continue = (event) => {
//     event.preventDefault();
//     nextStep();
//   };
//   const { name, phone, age } = values;
//   return (
//     <div>
//       <h1>Hello from User Details</h1>
//       <div class="form-group form-focus">
//         <input
//           type="text"
//           defaultValue={name}
//           onChange={handleChange("name")}
//           class="form-control floating"
//         />
//         <label class="focus-label">Name</label>
//       </div>
//       <div class="form-group form-focus">
//         <input
//           type="text"
//           defaultValue={phone}
//           onChange={handleChange("phone")}
//           class="form-control floating"
//         />
//         <label class="focus-label">Phone</label>
//       </div>
//       <div class="form-group form-focus">
//         <input
//           type="text"
//           defaultValue={age}
//           onChange={handleChange("age")}
//           class="form-control floating"
//         />
//         <label class="focus-label">Age</label>
//       </div>
//       <button
//         class="btn btn-primary btn-block btn-lg login-btn"
//         type="submit"
//         onClick={(e) => Continue(e)}
//       >
//         Signup
//       </button>
//     </div>
//   );
// };

// export default FormUserDetails;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import {
  ThemeProvider as MuiThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Stepper, StepLabel, Step } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { useForm } from "react-hook-form";
import FormLabel from "@material-ui/core/FormLabel";
import { Helmet } from "react-helmet";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 110,
  },
});

const FormUserDetails = ({ nextStep, prevStep, values, handleChange }) => {
  const classes = useStyles();
  const userLogin = useSelector((state) => state.userLogin);
  const { register, handleSubmit, errors } = useForm();
  const { loading, userInfo } = userLogin;

  const Continue = (event) => {
    event.preventDefault();
    nextStep();
  };

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     "& > *": {
  //       margin: theme.spacing(1),
  //     },
  //   },
  // }));
  // const classes = useStyles();
  const { name, phone, gender } = values;
  return (
    <>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">User Information</h4>
            </div>
            <div class="card-body">
              <form action="#">
                <div class="form-group">
                  <TextField
                    placeholder="Enter Your Name"
                    label="Name"
                    onChange={handleChange("name")}
                    defaultValue={name}
                    margin="normal"
                    ref={register}
                    fullWidth
                    // style={{ width: 500 }}
                  />
                </div>

                <div class="form-group">
                  <TextField
                    placeholder="Enter Your Phone"
                    label="Phone"
                    onChange={handleChange("phone")}
                    defaultValue={phone}
                    margin="normal"
                    name="phone"
                    fullWidth
                    ref={register}
                  />
                </div>
                {errors.phone && <p>files is required</p>}

                <div class="form-group">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="gender"
                      defaultValue={gender}
                      onChange={handleChange("gender")}
                    >
                      <FormControlLabel
                        checked={gender === "female"}
                        value="female"
                        defaultValue={gender}
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        checked={gender === "male"}
                        value="male"
                        defaultValue={gender}
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <div class="form-group">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={(e) => Continue(e)}
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormUserDetails;
