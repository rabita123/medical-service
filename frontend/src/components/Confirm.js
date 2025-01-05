import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetail from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListItemText from "@material-ui/core/ListItemText";
import { Form, Row, Col } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { ToastProvider, useToasts } from "react-toast-notifications";

import { physiotherapySaveForm } from "../actions/physiotherapyActions";

const Confirm = ({ nextStep, prevStep, values, history, image }) => {
  const Continue = (event) => {
    event.preventDefault();
    nextStep();
  };
  const { addToast } = useToasts();
  // const { go } = prevStep;
  const Back = (event) => {
    event.preventDefault();
    prevStep();
  };
  const {
    name,
    user_id,
    phone,
    physiotherapyId,
    types,
    age,

    address,
    gender,
    bloodGroup,
    diagnosis,

    department,
    dateFrom,
    dateTo,
    timeFrom,
    timeTo,
    concernDoctor,

    paymentMethod,
  } = values;

  const dispatch = useDispatch();
  const physiotherapy = useSelector((state) => state.physiotherapy);
  const { physiotherapies } = physiotherapy;

  const [agree, setAgree] = useState(false);

  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree);
    // Don't miss the exclamation mark
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (agree) {
      dispatch(
        physiotherapySaveForm(
          name,
          user_id,
          phone,
          physiotherapyId,
          types,

          age,

          address,
          gender,
          bloodGroup,
          diagnosis,
          image,
          department,
          dateFrom,
          dateTo,
          timeFrom,
          timeTo,
          concernDoctor,

          paymentMethod
        )
      );
      // history.push("/success");
      swal({
        title: "Successfully Submitted!!",
        text:
          "Thank you for providing your information. you will get a call shortly !",
        icon: "success",
      }).then(function () {
        window.location = "/";
      });
    } else {
      // alert("please check  term and conditions");

      swal({
        title: "please check  term and conditions!",

        icon: "error",
      }).then(function () {
        //window.location = "/";
      });
      // addToast("please check  term and conditions", {
      //   appearance: "error",
      //   autoDismiss: "true",
      //   autoDismissTimeout: 2000,
      //   placement: "top-center",
      // });
    }
  };
  console.log(agree);
  return (
    <div class="row">
      <div class="col-md-6">
        <form onSubmit={submitHandler}>
          <input type="hidden" value={name} />
          <input type="hidden" value={phone} />
          <input type="hidden" value={physiotherapyId} />
          <input type="hidden" value={values.types} />
          <input type="hidden" value={age} />
          <input type="hidden" value={values.address} />
          <input type="hidden" value={values.gender} />

          <input type="hidden" value={values.bloodGroup} />
          <input type="hidden" value={values.diagnosis} />
          <input type="hidden" value={image} />

          <input type="hidden" value={values.department} />
          <input type="hidden" value={values.dateFrom} />
          <input type="hidden" value={values.dateTo} />

          <input type="hidden" value={values.timeFrom} />
          <input type="hidden" value={values.timeTo} />

          <input type="hidden" value={values.concernDoctor} />
          <input type="hidden" value={values.paymentMethod} />

          <Container maxWidth="sm">
            <h3>Review</h3>
            <RenderAccordion
              summary="User Information"
              // go={go}
              details={[
                { " Name": values.name },
                { Phone: phone },
                { Gender: gender },
              ]}
            />
            <RenderAccordion
              summary="Personal Information"
              // go={go}
              details={[
                { Address: address },
                { "Blood Group ": bloodGroup },
                { Age: age },
              ]}
            />
            <RenderAccordion
              summary="Medical Information"
              // go={go}
              details={[
                { Diagnosis: diagnosis },
                { "Concern Doctor": concernDoctor },
                { Department: department },
                { "Date From": dateFrom },
                { "Date To": dateTo },
                { "Time From": timeFrom },
                { "Time To": timeTo },
                { Prescription: image },
              ]}
            />

            <RenderAccordion
              summary="Payment Option"
              // go={go}
              details={[{ " Payment Method": paymentMethod }]}
            />
            <div class="row">
              <div class="col-md">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checkedB"
                      onChange={checkboxHandler}
                      color="primary"
                    />
                  }
                  label="I agree and continue"
                />
              </div>

              <div class="col-md">
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  // onClick={(e) => Continue(e)}
                  style={{ marginTop: "3.5rem", marginLeft: "-16.5rem" }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Container>
        </form>
      </div>
    </div>
  );
};

const RenderAccordion = ({ summary, details, go }) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      {summary}
    </AccordionSummary>
    <AccordionDetail>
      <div>
        {details.map((data, index) => {
          const objKey = Object.keys(data)[0];
          const objValue = data[Object.keys(data)[0]];

          return (
            <ListItemText key={index}>{`${objKey}: ${objValue}`}</ListItemText>
          );
        })}
        <IconButton
          color="primary"
          component="span"
          onClick={() => go(`${summary.toLowerCase()}`)}
        >
          <EditIcon />
        </IconButton>
      </div>
    </AccordionDetail>
  </Accordion>
);

export default Confirm;
