import React, { useState, useEffect, useRef, Component } from "react";
import { useForm } from "react-hook-form";
import {
  ThemeProvider as MuiThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Message from "../components/Message";

const ButtonMemo = React.memo(Button);
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

const FormPersonalDetails = ({ nextStep, prevStep, values, handleChange }) => {
  const classes = useStyles();

  // const Continue = (event) => {
  //   event.preventDefault();
  //   nextStep();
  // };

  const Back = (event) => {
    event.preventDefault();
    prevStep();
  };
  const { address, age, bloodGroup } = values;
  const { register, handleSubmit, errors } = useForm();

  const firstRender = useRef(true);
  const [disable, setDisabled] = useState(true);
  const [addressError, setAddressError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [bloodGroupError, setBloodGroupError] = useState("");

  const Continue = (event) => {
    event.preventDefault();

    if (address === "") {
      setAddressError("Address cant be blank");
      return true;
    }

    if (age === "") {
      setAgeError("Age cant be blank");
      return true;
    }

    if (bloodGroup === "") {
      setBloodGroupError("Blood Group cant be blank");
      return true;
    } else {
      setAgeError("");
      setAddressError("");
      setBloodGroupError("");
      nextStep();
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Personal Information</h4>
            </div>
            <div class="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="form-group">
                  <TextField
                    placeholder="Enter Your  Address"
                    label="Address"
                    onChange={handleChange("address")}
                    defaultValue={address}
                    margin="normal"
                    name="address"
                    ref={register}
                    fullWidth
                  />
                </div>
                {addressError && (
                  <Message variant="danger">{addressError}</Message>
                )}

                <div class="form-group">
                  <TextField
                    placeholder="Enter your age"
                    label="Age"
                    onChange={handleChange("age")}
                    defaultValue={age}
                    margin="normal"
                    fullWidth
                  />
                </div>

                {ageError && <Message variant="danger">{ageError}</Message>}
                <div class="form-group">
                  <TextField
                    placeholder="Enter Your Blood Group"
                    label="Blood Group"
                    onChange={handleChange("bloodGroup")}
                    defaultValue={bloodGroup}
                    margin="normal"
                    fullWidth
                  />
                </div>
                {bloodGroupError && (
                  <Message variant="danger">{bloodGroupError}</Message>
                )}
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2">
                      <ButtonMemo
                        color="secondary"
                        variant="contained"
                        onClick={(e) => Back(e)}
                      >
                        Back
                      </ButtonMemo>
                    </div>
                    <div class="col-md-2">
                      <ButtonMemo
                        color="primary"
                        variant="contained"
                        onClick={(e) => Continue(e)}
                      >
                        Continue
                      </ButtonMemo>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPersonalDetails;
