import React, { useState, useEffect, lazy } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Confirm from "../../components/Confirm";
import { Form } from "react-bootstrap";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import NativeSelect from "@material-ui/core/NativeSelect";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Stepper, StepLabel, Step } from "@material-ui/core";
import {
  ThemeProvider as MuiThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

const Header = lazy(() => import("../../components/Header"));
const Footer = lazy(() => import("../../components/Footer"));
const Message = lazy(() => import("../../components/Message"));
const FormMedicalDetails = lazy(() =>
  import("../../components/FormMedicalDetails")
);
const FormUserDetails = lazy(() => import("../../components/FormUserDetails"));
const FormPersonalDetails = lazy(() =>
  import("../../components/FormPersonalDetails")
);

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

const PhysiotherapyFormScreen = ({ match, history, location }) => {
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;
  const { register, handleSubmit } = useForm();

  const [diagnosisError, setDiagnosisError] = useState("");
  const [concernDoctorError, setConcernDoctorError] = useState("");

  const [imageError, setImageError] = useState("");
  const [dateFromError, setDateFromError] = useState("");
  const [dateToError, setDateToError] = useState("");
  const [timeFromError, setTimeFromError] = useState("");
  const [timeToError, setTimeToError] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState("");

  const newDate = new Date();
  const date = newDate.getDate();

  const Back = (event) => {
    event.preventDefault();
    prevStep();
  };

  const [image, setImage] = useState("");

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
    } catch (error) {
      console.error(error);
    }
  };
  const pathtype = location.pathname;
  const pathtypes = pathtype.split("/");
  const testtype = pathtypes[2];
  const id = pathtypes[3];

  const [values, setValues] = useState({
    name: userInfo.name,
    user_id: userInfo._id,
    phone: userInfo.phone,
    physiotherapyId: id,
    types: testtype,
    age: "",

    address: "",
    gender: "",
    bloodGroup: "",
    diagnosis: "",

    department: "",
    dateFrom: "",
    dateTo: "",
    timeFrom: "",
    timeTo: "",
    concernDoctor: "",

    paymentMethod: "",
  });

  const {
    diagnosis,
    concernDoctor,
    dateFrom,
    dateTo,
    timeFrom,
    timeTo,
    paymentMethod,
  } = values;
  console.log(image);

  const Continue = async (event) => {
    event.preventDefault();
    if (diagnosis === "") {
      setDiagnosisError("Diagnosis cant be blank");
      return true;
    }

    if (concernDoctor === "") {
      setConcernDoctorError("Concern Doctor cant be blank");
      return true;
    }

    // if (image === "") {
    //   setImageError("Image cant be blank");
    //   return true;
    // }

    if (dateFrom === "") {
      setDateFromError("Date From cant be blank");
      return true;
    }
    if (dateTo === "") {
      setDateToError("Date To cant be blank");
      return true;
    }
    if (timeFrom === "") {
      setTimeFromError("Time From cant be blank");
      return true;
    }
    if (timeTo === "") {
      setTimeToError("Time to  cant be blank");
      return true;
    }
    if (paymentMethod === "") {
      setPaymentMethodError("Time to  cant be blank");
      return true;
    } else {
      setDiagnosisError("");
      setConcernDoctorError("");
      setDateFromError("");
      setDateToError("");
      setTimeFromError("");
      setTimeToError("");
      setImageError("");
      setPaymentMethodError("");
      nextStep();
    }
  };

  //   const { name, age } = values;
  const [step, setStep] = useState(1);

  //proceed to next step

  const nextStep = () => {
    setStep(step + 1);
  };

  //go back  to previous step

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (input) => (e) => {
    setValues({
      ...values,

      [input]: e.target.value,
    });
  };

  // const onFileChange = (input) => (e) => {
  //   //this.setState({ [e.target.name]: e.target.files[0] })
  //   setValues({ ...values, [input]: e.target.files[0] });
  // };

  const showStep = (step) => {
    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={nextStep}
            prevStep={prevStep}
            values={values}
            handleChange={handleChange}
          />
        );

      case 2:
        return (
          <FormPersonalDetails
            nextStep={nextStep}
            prevStep={prevStep}
            values={values}
            handleChange={handleChange}
          />
        );

      case 3:
        const Departments = () => {
          return (
            <div class="form-group">
              <FormControl className={classes.formControl}>
                <NativeSelect
                  defaultValue={values.department}
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
          );
        };

        return (
          // <FormMedicalDetails
          //   nextStep={nextStep}
          //   prevStep={prevStep}
          //   values={values}
          //   handleChange={handleChange}
          //   tests={tests}
          // />
          <div class="row">
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">
                    Medical Information and Payment Option
                  </h4>
                </div>
                <div class="card-body">
                  <form action="" method="post">
                    <div class="form-group">
                      <TextField
                        placeholder="Enter Your  Diagnosis"
                        label="Diagnosis"
                        onChange={handleChange("diagnosis")}
                        defaultValue={values.diagnosis}
                        margin="normal"
                        fullWidth
                      />
                    </div>
                    {diagnosisError && (
                      <Message variant="danger">{diagnosisError}</Message>
                    )}
                    <div class="form-group">
                      <TextField
                        placeholder="Enter your Concern Docotor"
                        label="Concern Doctor"
                        onChange={handleChange("concernDoctor")}
                        defaultValue={values.concernDoctor}
                        margin="normal"
                        fullWidth
                      />
                    </div>
                    {concernDoctorError && (
                      <Message variant="danger">{concernDoctorError}</Message>
                    )}

                    {testtype === "physio" ? <Departments /> : ""}

                    <Form.Group controlId="image">
                      <Form.Label>Image</Form.Label>
                      <div class="col-lg-9">
                        <Form.Control
                          type="text"
                          placeholder="Enter image url"
                          defaultValue={image}
                          onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        <Form.File
                          id="image-file"
                          label="Choose File"
                          custom
                          onChange={uploadFileHandler}
                        ></Form.File>
                        {/* {uploading && <Loader />} */}
                      </div>
                    </Form.Group>
                    {imageError && (
                      <Message variant="danger">{imageError}</Message>
                    )}
                    <div class="form-group">
                      <div class="row">
                        <div class="col-md-5">
                          <TextField
                            id="date"
                            label="From"
                            type="date"
                            onChange={handleChange("dateFrom")}
                            defaultValue={dateFrom}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </div>
                        {dateFromError && (
                          <Message variant="danger">{dateFromError}</Message>
                        )}

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
                        {dateToError && (
                          <Message variant="danger">{dateToError}</Message>
                        )}
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
                    {timeFromError && (
                      <Message variant="danger">{timeFromError}</Message>
                    )}

                    {timeToError && (
                      <Message variant="danger">{timeToError}</Message>
                    )}
                    <div class="form-group">
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Payment Method</FormLabel>
                        <RadioGroup
                          row
                          aria-label="paymentMethod"
                          name="paymentMethod"
                          defaultValue={values.paymentMethod}
                          onChange={handleChange("paymentMethod")}
                        >
                          <FormControlLabel
                            checked={values.paymentMethod === "cash"}
                            value="cash"
                            defaultValue={values.paymentMethod}
                            control={<Radio />}
                            label="Cash On Delivery"
                          />
                          <FormControlLabel
                            checked={values.paymentMethod === "bkash"}
                            value="bkash"
                            defaultValue={values.paymentMethod}
                            control={<Radio />}
                            label="Bkash"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                    {paymentMethodError && (
                      <Message variant="danger">{paymentMethodError}</Message>
                    )}
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
        );

      case 4:
        return (
          <Confirm
            nextStep={nextStep}
            prevStep={prevStep}
            values={values}
            history={history}
            image={image}
          />
        );
    }
  };

  return (
    <>
      <div class="main-wrapper">
        <Header />
        <div class="breadcrumb-bar">
          <div class="container-fluid">
            <div class="row align-items-center">
              <div class="col-md-12 col-12">
                <nav aria-label="breadcrumb" class="page-breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      PhysioTherapy Sevice
                    </li>
                  </ol>
                </nav>
                <h2 class="breadcrumb-title">
                  <span class="text-small text-white ml-2">
                    {" "}
                    <b>Request Form</b>
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div class="row ">
          <div class="col-md-1"></div>
          <div class="col-md-9">
            <Stepper
              style={{ width: "48%" }}
              activeStep={step - 1}
              orientation="horizontal"
            >
              <Step>
                <StepLabel></StepLabel>
              </Step>
              <Step>
                <StepLabel></StepLabel>
              </Step>
              <Step>
                <StepLabel></StepLabel>
              </Step>
            </Stepper>
            {showStep(step)}
          </div>
        </div>
      </div>
    </>
  );
};

export default PhysiotherapyFormScreen;
