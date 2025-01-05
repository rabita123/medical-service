import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import axios from "axios";
import {
  ThemeProvider as MuiThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Stepper, StepLabel, Step } from "@material-ui/core";
import { Table, Row, Col, Form } from "react-bootstrap";

import Card from "@material-ui/core/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import Confirm from "../components/Confirm";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const FormMedicalDetails = ({
  nextStep,
  prevStep,
  values,
  handleChange,
  tests,
}) => {
  const classes = useStyles();
  const [addPrescription, setAddPrescription] = useState();
  const [test, setTest] = useState();
  const Continue = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("image", addPrescription);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setTest(data);
    } catch (error) {
      console.error(error);
    }

    nextStep();
  };

  const Back = (event) => {
    event.preventDefault();
    prevStep();
  };

  const {
    diagnosis,
    concernDoctor,
    // addPrescription,
    
    paymentMethod,
    dateFrom,
    department,
    dateTo,
    timeFrom,
    timeTo,
  } = values;

  console.log(test);

  // const uploadFileHandler = async (e) => {
  //   // const file = e.target.files[0];
  //   // console.log(file);
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };

  //     const { data } = await axios.post("/api/upload", formData, config);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">
                Medical Information and Payment Option{tests}
              </h4>
            </div>
            <div class="card-body">
              <form action="" method="post">
                <div class="form-group">
                  <TextField
                    placeholder="Enter Your  Diagnosis"
                    label="Diagnosis"
                    onChange={handleChange("diagnosis")}
                    defaultValue={diagnosis}
                    margin="normal"
                    fullWidth
                  />
                </div>

                <div class="form-group">
                  <TextField
                    placeholder="Enter your Concern Docotor"
                    label="Concern Doctor"
                    onChange={handleChange("concernDoctor")}
                    defaultValue={concernDoctor}
                    margin="normal"
                    fullWidth
                  />
                </div>

                <div class="form-group">
                  <FormControl className={classes.formControl}>
                    <NativeSelect
                      defaultValue={department}
                      onChange={handleChange("department")}
                      name="department"
                      className={classes.selectEmpty}
                      inputProps={{ "aria-label": "department" }}
                    >
                      <option value="">Select Department</option>
                      <option value="rheumatology">Rheumatology</option>
                      <option value="ortho">Ortho</option>
                      <option value="neuro">Neuro</option>
                      <option value="sportsInjury">Sports injury</option>
                      <option value="chronic_pain">Chronic pain</option>
                    </NativeSelect>
                  </FormControl>
                </div>
                {/* 
                <div class="form-group">
                  <label>Add Prescription</label>
                  <TextField
                    placeholder="Enter Your Prescription"
                    label=""
                    id="image-file"
                    onChange={handleChange("addPrescription")}
                    defaultValue={addPrescription}
                    margin="normal"
                    type="file"
                    fullWidth
                  />
                </div> */}

                {/* <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <div class="col-lg-9">
                    <Form.Control
                      type="text"
                      placeholder="Enter image url"
                      // value={addPrescription}
                      // onChange={handleChange("addPrescription")}
                    ></Form.Control>
                    <Form.File
                      id="image-file"
                      label="Choose File"
                     
                      onChange={uploadFileHandler}
                    ></Form.File>
                  </div>
                </Form.Group> */}

                <div className={classes.root}>
                  <label>Prescription</label>
                  <input
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    defaultValue={test}
                    onChange={(event) => {
                      handleChange("addPrescription");
                      const file = event.target.files[0];
                      setAddPrescription(file);
                    }}
                  />

                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload
                    </Button>
                  </label>
                </div>

                {/* <label htmlFor="file">File</label>
                <input
                  type="file"
                  id="file"
                  value={addPrescription}
                  className={classes.input}
                  onChange={(event) => {
                    handleChange("addPrescription");
                  }}
                /> */}

                <div class="form-group">
                  <div class="row">
                    <div class="col-md-5">
                      <TextField
                        id="date"
                        label="From"
                        type="date"
                        onChange={handleChange("dateFrom")}
                        defaultValue="select date"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                    <div class="col-md-5">
                      <TextField
                        id="date"
                        label="To"
                        type="date"
                        onChange={handleChange("dateTo")}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-5">
                      <TextField
                        id="time"
                        label="Time From"
                        type="time"
                        defaultValue="07:30"
                        onChange={handleChange("timeFrom")}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </div>
                    <div class="col-md-5">
                      <TextField
                        id="time"
                        label="Time To"
                        type="time"
                        defaultValue="07:30"
                        onChange={handleChange("timeTo")}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Payment Method</FormLabel>
                    <RadioGroup
                      row
                      aria-label="paymentMethod"
                      name="paymentMethod"
                      defaultValue={paymentMethod}
                      onChange={handleChange("paymentMethod")}
                    >
                      <FormControlLabel
                        checked={paymentMethod === "cash"}
                        value="cash"
                        defaultValue={paymentMethod}
                        control={<Radio />}
                        label="Cash On Delivery"
                      />
                      <FormControlLabel
                        checked={paymentMethod === "bkash"}
                        value="bkash"
                        defaultValue={paymentMethod}
                        control={<Radio />}
                        label="Bkash"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <div class="form-group">
                  <div class="row">
                    <div class="col-md-2">
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={(e) => Back(e)}
                      >
                        Back
                      </Button>
                    </div>
                    <div class="col-md-2">
                      <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        onClick={(e) => Continue(e)}
                      >
                        Continue
                      </Button>
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

export default FormMedicalDetails;
