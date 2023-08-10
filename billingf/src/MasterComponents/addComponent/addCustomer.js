import React, { useEffect, useState } from "react";
import { AddBankHO, isAuthenticated } from "../../auth/authIndex";
import Navb from "../../Components/navbar";
import { SignoutNav } from "../../UserView/singoutnav";
import { Button, Form } from "react-bootstrap";
import "./css/addcustomer.css";
import { API } from "../../backend";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FooterC from "../../Components/footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

// GST ISSUE needs resolution
export function Addcustomer() {
  const nav = useNavigate();
  const [stateChoice, SetStatechoice] = useState();
  const [Placemaster, SetPlacemaster] = useState();
  const [RegisterDtype, SetRegDealer] = useState();
  const [values, setvalues] = useState({
    master_id: isAuthenticated().user.id,
    cust_name: "",
    cust_code: 0,
    Image: "",
    ImageUrl: "",
    cust_state_id: "",
    cust_pincode: "",
    cust_pan: "",
    cust_place: "",
    cust_group: "",
    cust_mobile: "",
    cust_landline: "",
    cust_email: "",
    address: "",
    cust_is_reg: "true",
    cust_dealer_type: "",
    cust_gst: "",
    cust_currency: "",
    export_option: "",
    export_type: "",
    created_at: "",
    modified_by: "",
    status: true,
    error: false,
    loading: false,
    didNavigate: false,
  });
  let icon1 = require("../../assets/images/blackPerson.png");
  // const GSTvalidator = (NUM) => {
  //   const GSTREGEX = new RegExp(
  //     /^([0][1-9]|[1-2][0-9]|[3][0-8])[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/
  //   );
  //   if (GSTREGEX.test(NUM)) {
  //     if (NUM.slice(0, 2) < 10) {
  //       console.log(NUM.slice(0, 2));
  //     } else {
  //       console.log(NUM.slice(0, 2));
  //     }
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  const performNavigate = () => {
    if (values.didNavigate) {
      return <Navigate to="/user/dashboard" />;
    }
  };
  const handleChange = (name) => (event) => {
    if (name === "Image") {
      setvalues({
        ...values,
        ImageUrl: URL.createObjectURL(event.target.files[0]),
        Image: event.target.files[0],
      });
      console.log(values);
    }
    // else if (name === "cust_is_regular") {
    //   if(values.cust_is_reg==="on"){
    //     setvalues({ ...values, [name]:true });
    //   }
    // }
    else {
      setvalues({ ...values, [name]: event.target.value });
    }
  };
  function states() {
    return (
      <Form.Group>
        <Form.Label>State Name</Form.Label>
        <Form.Select
          size="md"
          aria-label="Default select example"
          value={values.cust_state_id}
          onChange={handleChange("cust_state_id")}
          // isInvalid={}
          // isValid={values.state !== ""}
          required
        >
          <option defaultValue>Select State</option>
          {stateChoice.map((item, index) => (
            <option key={index} value={item.id}>
              {item.state_name} ({item.state_code})
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Select a state code!
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  function DealerType() {
    return (
      <Form.Group>
        <Form.Label>Registered Dealer Type:</Form.Label>
        <Form.Select
          size="md"
          aria-label="Default select example"
          value={values.cust_dealer_type}
          onChange={handleChange("cust_dealer_type")}
          // isInvalid={}
          // isValid={values.state !== ""}
          required
        >
          <option defaultValue>Select Dealer Type</option>
          {RegisterDtype.map((item, index) => (
            <option key={index} value={item.id}>
              {item.dealer_name} 
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Select a Dealer Type!
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  function Places() {
    return (
      <Form.Group>
        <Form.Label>Place </Form.Label>
        <Form.Select
        size="md"
          aria-label="Default select example"
          value={values.account_type}
          onChange={handleChange("cust_place")}
          // isInvalid={values.state === ""}
          // isValid={values.state !== ""}
          required
        >
          <option defaultValue>Select Place</option>
          {Placemaster.map((item, index) => (
            <option key={index} value={item.id}>
              {item.place_name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Select a state code!
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  const getState = async () => {
    try {
      const resp = await fetch(`${API}bill/bank/HO/addbank/stateCodes/`, {
        method: "GET",
      });
      const data = await resp.json();
      SetStatechoice(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const getDealerType = async () => {
    try {
      const resp = await fetch(`${API}bill/bank/HO/customer/RegisterDealer`, {
        method: "GET",
      });
      const data = await resp.json();
      SetRegDealer(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const getPlacebymaster = async () => {
    try {
      const resp = await fetch(
        `${API}bill/bank/HO/getplaces/${isAuthenticated().user.id}`,
        {
          method: "GET",
        }
      );
      const data = await resp.json();
      SetPlacemaster(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    setValidated(false);
    getState();
    getPlacebymaster();
    getDealerType();
  }, []);
  return (
    <>
      <div className="name__top" style={{ background: "#313493" }}>
        Welcome to Head Office {isAuthenticated().user.first_name}
      </div>

      <Navb component={<SignoutNav />} state={"headOffice"} />
      <div className="DashContainer">
        <div className="DashboardBar">
          <h3>Add Customer Master</h3>
        </div>
      </div>
      <div className="FormSet">
        <div className="Formhandler">
          <Form
            noValidate
            validated={validated}
            onSubmit={(event) => {
              values.loading = true;
              const form = event.currentTarget;
              if (form.checkValidity() === false) {
                event.preventDefault(); // refresh problem is here
                event.stopPropagation();
              } else {
                event.preventDefault();
                setValidated(true);
                console.log(values);
                AddBankHO(values)
                  .then((data) => {
                    if (data) {
                      console.log(data);
                      setvalues({
                        ...values,
                        didNavigate: true,
                        loading: false,
                      });
                      <Navigate to="/user/dashboard/headOffice/bank" />;
                    } else {
                      console.log(data);
                      setvalues({ ...values, loading: false });
                    }
                  })
                  .catch((ee) => {
                    console.log(ee);
                  });
              }
            }}
          >
            <Container fluid="lg" className="Container">
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Customer Name: *</Form.Label>
                    <Form.Control
                      onChange={handleChange("cust_name")} // add change condition and function call to check for uniqueness from backend.
                      size="sm"
                      type="input"
                      className="form-control"
                      placeholder=""
                      required
                      isInvalid={/^\d+$/.test(values.cust_name)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Bank Name Incorrect
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Code: *</Form.Label>
                    <Form.Control
                      onChange={handleChange("cust_code")} // add change condition and function call to check for uniqueness from backend.
                      size="sm"
                      type="input"
                      className="form-control"
                      placeholder=""
                      required
                      // isInvalid={/^\d+$/.test(values.cust_code)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Code Incorrect
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleChange("Image")}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {values.Image && values.ImageUrl && (
                    <>
                      <Image
                        required
                        src={`${values.ImageUrl}`}
                        height="150px"
                        width="150px"
                        style={{ border: "2px solid #4a4d9a" }}
                        xs={6}
                        md={4}
                      />
                    </>
                  )}
                  {!values.Image && !values.ImageUrl && (
                    <>
                      <Image
                        src={icon1}
                        height="150px"
                        width="150px"
                        style={{ border: "2px solid #4a4d9a" }}
                        xs={6}
                        md={4}
                      />
                    </>
                  )}
                </Col>
              </Row>
              <Row>
                <Row>Address :</Row>
                <Row>
                  <Col>{stateChoice && states()}</Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Pin Code: *</Form.Label>
                      <Form.Control
                        onChange={handleChange("cust_code")} // add change condition and function call to check for uniqueness from backend.
                        size="sm"
                        type="input"
                        className="form-control"
                        placeholder=""
                        required
                        // isInvalid={/^\d+$/.test(values.cust_code)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Bank Name Incorrect
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>{Placemaster && Places()}</Col>
                </Row>

                <Col>
                  <Form.Group>
                    <Form.Label>
                      Address: * (Maximum Characters: 100)
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange("address")} // add change condition and function call to check for uniqueness from backend.
                      size="sm"
                      type="input"
                      className="form-control"
                      placeholder=""
                      required
                      isInvalid={values.address.length > 100}
                    />
                    <Form.Control.Feedback type="invalid">
                      Address Cannot Exceed 100 Characters
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Row>Contact Details</Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Mobile Number: *</Form.Label>
                      <Form.Control
                        onChange={handleChange("cust_mobile")} // add change condition and function call to check for uniqueness from backend.
                        size="sm"
                        type="input"
                        className="form-control"
                        placeholder=""
                        required
                        isInvalid={values.cust_mobile.length > 10}
                      />
                      <Form.Control.Feedback type="invalid">
                        Bank Name Incorrect
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Landline No.: *</Form.Label>
                      <Form.Control
                        onChange={handleChange("cust_landline")} // add change condition and function call to check for uniqueness from backend.
                        size="sm"
                        type="input"
                        className="form-control"
                        placeholder=""
                        required
                        isInvalid={values.cust_landline.length > 10}
                      />
                      <Form.Control.Feedback type="invalid">
                        Invalid Number{" "}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Email: *</Form.Label>
                      <Form.Control
                        onChange={handleChange("cust_email")} // add change condition and function call to check for uniqueness from backend.
                        size="sm"
                        type="input"
                        className="form-control"
                        placeholder=""
                        required
                        // isInvalid={values.cust_landline}
                      />
                      <Form.Control.Feedback type="invalid">
                        Bank Name Incorrect
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>

              <Row>
                <Row>Registeration Details:</Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Pan No.: *</Form.Label>
                      <Form.Control
                        onChange={handleChange("cust_pan")} // add change condition and function call to check for uniqueness from backend.
                        size="sm"
                        type="input"
                        className="form-control"
                        placeholder=""
                        required
                        isInvalid={values.cust_pan.length > 10}
                      />
                      <Form.Control.Feedback type="invalid">
                        Invalid pan
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Row>Is Registered Dealer</Row>
                    <Row style={{ transform: "scale(0.9)" }}>
                      <Col xs={2}>
                        <Form.Check
                          inline
                          value={true}
                          label="Yes"
                          name="group1"
                          type="radio"
                          checked={values.cust_is_reg === "true"}
                          onChange={handleChange("cust_is_reg")}
                          id={`inline-radio-1`}
                        />
                      </Col>
                      <Col xs={2}>
                        <Form.Check
                          inline
                          value={false}
                          label="No"
                          name="group1"
                          type="radio"
                          onChange={handleChange("cust_is_reg")}
                          id={`inline-radio-2`}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {values.cust_is_reg==="true" &&<><Row className="DealerSelection">
                      <Col>{RegisterDtype && DealerType()}</Col>
                      <Col>
                      <Form.Group>
                  <Form.Label>Enter GST Number:</Form.Label>
                  <Form.Control
                    onChange={handleChange("cust_gst")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="input"
                    className="form-control"
                    placeholder="GST number"
                    required
                    isInvalid={values.error && values.Etype === "GST"}
                  />
                  <Form.Control.Feedback type="invalid">
                    GST number Invalid !
                  </Form.Control.Feedback>
                </Form.Group>
                      </Col>
                    </Row></>}
                {values.cust_is_reg==="false" &&<></>}
                
              </Row>

            </Container>
          </Form>
        </div>
        <div></div>
      </div>
      {JSON.stringify(values)}
      <FooterC />
    </>
  );
}
