import React, { useEffect, useState } from "react";
import Navb from "../navbar";
import FooterC from "../footer";
import { SignoutNav } from "../../UserView/singoutnav";
import {
  AddInvoice_Series,
  UpdateUser,
  isAuthenticated,
  isAuthenticatedBilling,
} from "../../auth/authIndex";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { API } from "../../backend";
import Select from "react-select";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import EditProfileNew from "./editProfileNew";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";

export default function EditProfile() {
  const nav = useNavigate();
  const [values, setvalues] = useState({
    ...isAuthenticated().user,
    password: "",
  });
  const [manageValue, setManageVal] = useState(isAuthenticatedBilling());
  const [stateChoice, SetStatechoice] = useState();

  const [RegisterDtype, SetRegDealer] = useState();
  const [billInvoice, setbillInvoice] = useState({
    user_id: isAuthenticated().user.id,
    is_logo_img: true,
    logo: "",
    logo_text: "",
    invoice_design_temp: "",
    currency: "",
    term_condition: "",
    additional_option_type: true,
    option_values: "",
    ecommerce_trader: true,
    reverse_charge: true,
    to_bill_ship_applicable: true,
    gst_shipping_address: true,
    from_date: "",
    till_date: "",
    bank_def: "",
    data: "",
  });
  const [billseries, setbillseries] = useState({
    user_id: isAuthenticated().user.id,
    invoice_id: "", //passed in authindex after call.
    series_num: 1,
    name: "",
    prefix_surfix_type: true,
    sl_num: "",
    prefix_surfix: fiscalyear("pref"), //Intially for Prefix as pref is true
    primary_type: true,
    genrate_invoice: false,
  });
  const [CurrencyData, setCurrency] = useState();
  const [templatesData, settemplates] = useState();
  const [Bank, setBank] = useState({ isBank: false });

  function fiscalyear(pre_suf) {
    var fiscalyear = "";
    var today = new Date();
    if (pre_suf === "pref") {
      if (today.getMonth() + 1 <= 3) {
        fiscalyear =
          JSON.stringify(today.getFullYear() - 1) +
          "-" +
          JSON.stringify(today.getFullYear()).slice(-2);
      } else {
        return (
          JSON.stringify(today.getFullYear()) +
          JSON.stringify(today.getFullYear() + 1).slice(-2)
        );
      }
    } else if (pre_suf === "suf") {
      if (today.getMonth() + 1 <= 3) {
        fiscalyear =
          JSON.stringify(today.getFullYear() - 1) +
          "-" +
          JSON.stringify(today.getFullYear()).slice(-2);
      } else {
        fiscalyear =
          JSON.stringify(today.getFullYear()) +
          JSON.stringify(today.getFullYear() + 1).slice(-2);
      }
      return fiscalyear;
    }
  }
  const getInvoiceDetails = async () => {
    try {
      const resp = await fetch(`${API}bill/getInvoice`, {
        method: "GET",
      });
      const data = await resp.json();
      setbillInvoice({ ...billInvoice, data });
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const getSeriesDetails = async () => {
    try {
      const resp = await fetch(
        `${API}bill/getseries/${isAuthenticated().user.id}`,
        {
          method: "GET",
        }
      );
      const data = await resp.json();
      setbillseries({ ...billseries, data });
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  let icon1 = require("../../assets/images/blackPerson.png");

  const getBanks = async () => {
    try {
      const resp = await fetch(
        `${API}bill/bank/selectbank/${isAuthenticated().user.id}`,
        {
          method: "GET",
        }
      );
      const data = await resp.json();
      setBank({ ...Bank, data });
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
  function DealerType() {
    return (
      <Form.Group>
        <Form.Label className="RowBoxHeading TopMargin">
          Registered Dealer Type:
        </Form.Label>
        <Form.Select
          size="md"
          aria-label="Default select example"
          value={manageValue.reg_dealer_type}
          onChange={handleChange("cust_dealer_type")}
          // isInvalid={}
          // isValid={values.state !== ""}
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
  const getCurrency = async () => {
    try {
      const resp = await fetch(`${API}bill/bank/HO/fetchcurrency/`, {
        method: "GET",
      });
      const data = await resp.json();
      setCurrency(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  function Currency() {
    return (
      //billInvoice.data[0].currency_id!=="" &&
      <Form.Group>
        <Form.Label className="RowBoxHeading">Currency: *</Form.Label>
        <Form.Select
          disabled
          size="md"
          aria-label="Default select example"
          value={billInvoice.data !== "" && billInvoice.data[0].currency_id}
          // isInvalid={}
          // isValid={values.state !== ""}
          required
        >
          <option defaultValue>Select Currency</option>
          {CurrencyData.map((item, index) => (
            <option key={index} value={item.id}>
              {item.type_C}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Select a Currency code!
        </Form.Control.Feedback>
      </Form.Group>
    );
  }

  const getTemplates = async () => {
    try {
      const resp = await fetch(`${API}bill/HO/fetchtemplates`, {
        method: "GET",
      });
      const data = await resp.json();
      settemplates(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  function Template() {
    return (
      <Form.Group>
        <Form.Label className="RowBoxHeading">Invoice Template: *</Form.Label>
        <Form.Select
          size="md"
          disabled
          aria-label="Default select example"
          value={
            billInvoice.data !== "" &&
            billInvoice.data[0].invoice_design_temp_id
          }
          // isInvalid={}
          // isValid={values.state !== ""}
          required // a disbaled constion if again logged in !!!!
        >
          <option defaultValue>Select Invoice template</option>
          {templatesData.map((item, index) => (
            <option key={index} value={item.id}>
              {item.temp_name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Select a Template.
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  const handleChangeManage = (name) => (event) => {
    setManageVal({ ...manageValue, [name]: event.target.value });
  };
  const handleChange = (name) => (event) => {
    setvalues({ ...values, [name]: event.target.value });
  };
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
  function states() {
    return (
      <Form.Group>
        <Form.Label className="RowBoxHeading TopMargin">
          State Name: *
        </Form.Label>
        <Form.Select
          size="md"
          aria-label="Default select example"
          value={manageValue && manageValue.stateCode_id}
          onChange={handleChangeManage("stateCode_id")}
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
  const Tool = () => {
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Provide old Password in case no new password is set.
      </Tooltip>
    );
    return (
      <>
        {!values.password && (
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <i className="bi bi-info-circle"></i>
          </OverlayTrigger>
        )}
      </>
    );
  };
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setValidated(false);
    getState();
    // getPlacebymaster();
    getDealerType();
    if (Bank) {
      getBanks();
    }
    getCurrency();
    // fetchGroup();
    getTemplates();
    // getExport();
    getInvoiceDetails();
    getSeriesDetails();
  }, []);
  return (
    <>
      <div className="name__top">
        Welcome to Head Office {isAuthenticated().user.first_name}
      </div>
      <Navb component={<SignoutNav />} state={"headOffice"} />
      <div className="DashContainer">
        <div className="DashboardBar">
          <h3>Profile Master</h3>
        </div>
      </div>
      <div className="FormSet">
        <div className="Formhandlercust">
          <Form
            noValidate
            validated={validated}
            onSubmit={(event) => {
              values.loading = true;
              const form = event.currentTarget;
              AddInvoice_Series(billInvoice, billseries); // requires to setup API
              UpdateUser(values, manageValue); // working
              if (form.checkValidity() === false) {
                event.preventDefault(); // refresh problem is here
                event.stopPropagation(); // Add Login Logout just like update componenet for new info updateon.
              } else {
                event.preventDefault();
                setValidated(true);
                //AddInvoice_Series(billInvoice);
              }
            }}
          >
            <Container fluid="lg" className="Container">
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="RowBoxHeading TopMargin">
                      Head Office Name: *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange("first_name")} // add change condition and function call to check for uniqueness from backend.
                      size="md"
                      type="input"
                      className="form-control"
                      value={values && values.first_name}
                      required
                      isInvalid={/^\d+$/.test(values.cust_name)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Bank Name Incorrect
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="RowBoxHeading TopMargin">
                      New Password :
                    </Form.Label>
                    <Tool />
                    <Form.Control
                      value={values.password}
                      onChange={handleChange("password")} // add change condition and function call to check for uniqueness from backend.
                      size="md"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Need Password
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="RowBoxHeading TopMargin">
                      Short Name: *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChangeManage("shortname")} // add change condition and function call to check for uniqueness from backend.
                      size="md"
                      type="input"
                      className="form-control"
                      value={manageValue && manageValue.shortname}
                      required
                      isInvalid={/^\d+$/.test(manageValue.shortname)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Bank Name Incorrect
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="RowBoxHeading TopMargin">Address :</Row>
              <Row className="AddressContainer">
                <Col>
                  <Form.Group>
                    <Form.Label className="RowBoxHeading TopMargin">
                      Address (Max 100 Characters): *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange("cust_name")} // add change condition and function call to check for uniqueness from backend.
                      size="md"
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
                <Col>{stateChoice && states()}</Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="RowBoxHeading TopMargin">
                      Pin Code: *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange("cust_pincode")} // add change condition and function call to check for uniqueness from backend.
                      size="md"
                      type="input"
                      className="form-control"
                      value={manageValue && manageValue.pin_code}
                      required
                      // isInvalid={/^\d+$/.test(values.cust_code)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Bank Name Incorrect
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label className="RowBoxHeading TopMargin">
                      Status Type : *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange("cust_name")} // add change condition and function call to check for uniqueness from backend.
                      size="md"
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

              <Row className="RowBoxHeading TopMargin">Contact Details :</Row>

              <Row className="AddressContainer ">
                <Col>
                  <Form.Group>
                    <Form.Label className="RowBoxHeading TopMargin">
                      Mobile Number: *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange("cust_mobile")} // add change condition and function call to check for uniqueness from backend.
                      size="md"
                      type="input"
                      className="form-control"
                      value={manageValue && manageValue.landlineNUM}
                      required
                      // isInvalid={values.cust_mobile.length > 10}
                    />
                    <Form.Control.Feedback type="invalid">
                      Bank Name Incorrect
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="RowBoxHeading TopMargin">
                      Landline Number :
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange("cust_name")} // add change condition and function call to check for uniqueness from backend.
                      size="md"
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
                <Col>
                  <Form.Group>
                    <Form.Label className="RowBoxHeading TopMargin">
                      Email : *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange("cust_name")} // add change condition and function call to check for uniqueness from backend.
                      size="md"
                      type="input"
                      className="form-control"
                      value={values && values.email}
                      required
                      disabled
                      isInvalid={/^\d+$/.test(values.cust_name)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Bank Name Incorrect
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="RowBoxHeading TopMargin">
                Registeration Details :
              </Row>

              <Row className="AddressContainer">
                <Col>
                  <Form.Group>
                    <Form.Label className="RowBoxHeading TopMargin">
                      Pan No. : *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange("cust_name")} // add change condition and function call to check for uniqueness from backend.
                      size="md"
                      type="input"
                      className="form-control"
                      value={manageValue && manageValue.pan_card}
                      required
                      isInvalid={/^\d+$/.test(values.cust_name)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Bank Name Incorrect
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Row className="RowBoxHeading TopMargin">
                    Is Registered Dealer :
                  </Row>
                  <Row style={{ transform: "scale(0.9)", marginTop: "12px" }}>
                    <Col xs={2}>
                      <Form.Check
                        inline
                        value={true}
                        label="Yes"
                        name="group1"
                        type="radio"
                        checked={
                          manageValue.is_regdealer === "true" ||
                          manageValue.is_regdealer === true
                        }
                        onChange={handleChangeManage("is_regdealer")}
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
                        onChange={handleChangeManage("is_regdealer")}
                        id={`inline-radio-2`}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row className="RowBoxHeading TopMargin">
                    Actual Bill Quantity Differ :
                  </Row>
                  <Row style={{ transform: "scale(0.9)", marginTop: "12px" }}>
                    <Col xs={2}>
                      <Form.Check
                        inline
                        value={true}
                        label="Yes"
                        name="group2"
                        type="radio"
                        checked={
                          manageValue.actual_billQty === true ||
                          manageValue.actual_billQty === "true"
                        }
                        onChange={handleChangeManage("actual_billQty")}
                        id={`inline-radio-1`}
                      />
                    </Col>
                    <Col xs={2}>
                      <Form.Check
                        inline
                        value={false}
                        label="No"
                        name="group2"
                        type="radio"
                        onChange={handleChangeManage("actual_billQty")}
                        id={`inline-radio-2`}
                      />
                    </Col>
                  </Row>
                </Col>
                {(manageValue.is_regdealer === "true" ||
                  manageValue.is_regdealer === true) && (
                  <>
                    <Row className="DealerSelection">
                      <Col>{RegisterDtype && DealerType()}</Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="RowBoxHeading TopMargin">
                            Enter GST Number:
                          </Form.Label>
                          <Form.Control
                            onChange={handleChange("cust_gst")} // add change condition and function call to check for uniqueness from backend.
                            size="md"
                            type="input"
                            className="form-control"
                            value={manageValue && manageValue.gstNum}
                            isInvalid={values.error && values.Etype === "GST"}
                          />
                          <Form.Control.Feedback type="invalid">
                            GST number Invalid !
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}
                {manageValue.is_regdealer === "false" && (
                  <div className="DealerSelectionf"> </div>
                )}
              </Row>
              {billInvoice !== false && billseries !== false && (
                <>
                  {isAuthenticated().user.last_login && (
                    <>
                      <Row style={{ background: "#eee " }}>
                        <Col className="TopMargin" xs={2}>
                          <Form.Label className="RowBoxHeading">
                            Bank Details: *
                          </Form.Label>
                        </Col>
                        <Col xs={1} className="TopMargin">
                          <Form.Check
                            inline
                            disabled
                            value={true}
                            label="Yes"
                            name="group3"
                            type="radio"
                            checked={
                              Bank.isBank === "true" || Bank.isBank === true
                            }
                            id={`inline-radio-1`}
                          />
                        </Col>
                        <Col xs={1} className="TopMargin">
                          <Form.Check
                            disabled
                            inline
                            value={false}
                            label="No"
                            name="group3"
                            type="radio"
                            checked={
                              Bank.isBank === "false" || Bank.isBank === false
                            }
                            id={`inline-radio-2`}
                          />
                        </Col>
                      </Row>
                      {(Bank.isBank === "true" || Bank.isBank === true) && (
                        <Row style={{ background: "#eee " }}>
                        </Row>
                      )}
                      <Row style={{ background: "#eee " }}>
                        <Form.Label className="RowBoxHeading TopMargin">
                          Invoice Details :
                        </Form.Label>
                      </Row>
                      <Row
                        style={{ background: "#eee " }}
                        className="AddressContainer"
                      >
                        <Row style={{ padding: "0 2vw 0 2vw" }}>
                          <Col>
                            <Row>
                              <Form.Label className="RowBoxHeading TopMargin">
                                Want to Print *
                              </Form.Label>
                            </Row>
                            <Row style={{ transform: "scale(0.9)" }}>
                              <Col xs={3}>
                                <Form.Check
                                  disabled
                                  inline
                                  value={true}
                                  label="Logo"
                                  name="group4"
                                  type="radio"
                                  checked={
                                    billInvoice.is_logo_img === "true" ||
                                    billInvoice.is_logo_img === true
                                  }
                                  id={`inline-radio-1`}
                                />
                              </Col>
                              <Col xs={3}>
                                <Form.Check
                                  disabled
                                  inline
                                  value={false}
                                  label="Text"
                                  name="group4"
                                  type="radio"
                                  id={`inline-radio-2`}
                                />
                              </Col>
                            </Row>
                          </Col>

                          {(billInvoice.is_logo_img === "true" ||
                            billInvoice.is_logo_img === true) && (
                            <>
                              {/* <Col xs={4}>
                                <Form.Label className="RowBoxHeading TopMargin">
                                  Logo / Image: *
                                </Form.Label>
                                <Form.Control
                                  style={{ marginTop: "1vh" }}
                                  size="md"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleChangeInvoice("Image")}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Image
                                </Form.Control.Feedback>
                              </Col> */}
                              <Col xs={4}>
                                <Form.Label className="RowBoxHeading TopMargin">
                                  Image: *
                                </Form.Label>
                                {billInvoice.data !== "" &&
                                  billInvoice.data[0].logo && (
                                    <>
                                      <Image
                                        className="TopMargin"
                                        required
                                        disabled
                                        src={( billInvoice.data && billInvoice.data !== "")?
                                        billInvoice.data[0].logo:icon1
                                        }
                                        height="150px"
                                        width="150px"
                                        style={{ border: "2px solid #4a4d9a" }}
                                        xs={6}
                                        md={4}
                                      />
                                    </>
                                  )}
                              </Col>
                            </>
                          )}
                          {(billInvoice.is_logo_img === "false" ||
                            billInvoice.is_logo_img === false) && (
                            <>
                              <Col>
                                <Form.Label className="RowBoxHeading TopMargin">
                                  Logo Name
                                </Form.Label>
                                <Form.Control
                                  size="md"
                                  disabled
                                  type="input"
                                  className="form-control"
                                  placeholder={`${billInvoice.data[0].logo_text}`}
                                  isInvalid={
                                    billInvoice.logo_text !== "" &&
                                    billInvoice.logo_text.length > 2
                                  }
                                />{" "}
                              </Col>
                            </>
                          )}
                        </Row>
                        <Row style={{ padding: "0 2vw 0 2vw" }}>
                          <Col>
                            <Form.Label className="RowBoxHeading TopMargin">
                              Display name: *
                            </Form.Label>
                            <Form.Control
                              size="md"
                              type="input"
                              className="form-control"
                              placeholder={
                                billseries.data &&
                                billseries.data[0] != "" &&
                                billseries.data[0].name
                              }
                              disabled
                            />
                          </Col>
                          <Col>
                            <Form.Label className="RowBoxHeading TopMargin">
                              Prefix/Sufix: *
                            </Form.Label>
                            <Form.Check
                              style={{ transform: "scale(0.9)" }}
                              inline
                              disabled
                              value={true}
                              label="Prefix"
                              name="group10"
                              type="radio"
                              checked={
                                billseries.prefix_surfix_type === "true" ||
                                billseries.prefix_surfix_type === true
                              }
                              id={`inline-radio-1`}
                            />
                            <Form.Check
                              style={{ transform: "scale(0.9)" }}
                              inline
                              disabled
                              value={false}
                              label="Suffix"
                              name="group10"
                              type="radio"
                              checked={
                                billseries.prefix_surfix_type === "false" ||
                                billseries.prefix_surfix_type === false
                              }
                              id={`inline-radio-1`}
                            />
                            <Form.Control
                              size="md"
                              type="input"
                              className="form-control"
                              disabled
                              value={
                                billseries.prefix_surfix_type === "true" ||
                                billseries.prefix_surfix_type === true
                                  ? fiscalyear("pref")
                                  : fiscalyear("suf")
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              Only 2 Characters allowed.{" "}
                            </Form.Control.Feedback>
                          </Col>
                          <Col>
                            <Form.Label className="RowBoxHeading TopMargin">
                              Starting Serial num: *
                            </Form.Label>
                            <Form.Control
                              size="md"
                              type="input"
                              className="form-control"
                              disabled
                              placeholder="Serial Number"
                              value={
                                billseries.data &&
                                billseries.data[0] != "" &&
                                billseries.data[0].sl_num
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              Should be an Integer
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                        <Row style={{ padding: "0 2vw 0 2vw" }}>
                          <Col>{templatesData && Template()}</Col>
                          <Col>{CurrencyData && Currency()}</Col>
                        </Row>
                        <Row style={{ padding: "0 2vw 0 2vw" }}>
                          <Col>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlTextarea1"
                            >
                              <Form.Label className="RowBoxHeading TopMargin">
                                Terms & Conditions: * ({100})
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                disabled
                                rows={3}
                                isInvalid={
                                  billInvoice.term_condition.length > 100
                                }
                                value={
                                  billInvoice.data !== "" &&
                                  billInvoice.data[0].term_condition
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                Maximum Character Length Reached!{" "}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Row>
                      <Row style={{ background: "#eee " }}>
                        <Col className="TopMargin" xs={2}>
                          <Form.Label className="RowBoxHeading">
                            Additional Option : *
                          </Form.Label>
                        </Col>
                        <Col
                          xs={1}
                          className="TopMargin"
                          style={{ transform: "scale(0.9)" }}
                        >
                          <Form.Check
                            disabled
                            inline
                            value={true}
                            label="Yes"
                            name="group5"
                            type="radio"
                            checked={
                              billInvoice.data !== "" &&
                              (billInvoice.data[0].additional_option_type ===
                                true ||
                                billInvoice.data[0].additional_option_type ===
                                  "true")
                            }
                            id={`inline-radio-1`}
                          />
                        </Col>
                        <Col
                          xs={1}
                          className="TopMargin"
                          style={{ transform: "scale(0.9)" }}
                        >
                          <Form.Check
                            disabled
                            inline
                            value={false}
                            label="No"
                            name="group5"
                            type="radio"
                            checked={
                              billInvoice.data !== "" &&
                              (billInvoice.data[0].additional_option_type ===
                                false ||
                                billInvoice.data[0].additional_option_type ===
                                  "false")
                            }
                            id={`inline-radio-2`}
                          />
                        </Col>
                      </Row>
                      <Row style={{ background: "#eee " }}>
                        <Form.Label className="RowBoxHeading TopMargin">
                          Additional Description : *
                        </Form.Label>
                        <Row style={{ padding: "0px 3.3vw" }}>
                          <Col>
                            <Row>
                              <Form.Label className="RowBoxHeading TopMargin">
                                Are you a E-Commerce Trader * : *
                              </Form.Label>
                            </Row>
                            <Row style={{ transform: "scale(0.9)" }}>
                              <Col>
                                <Form.Check
                                  inline
                                  disabled
                                  value={true}
                                  label="Yes"
                                  name="group6"
                                  type="radio"
                                  checked={
                                    billInvoice.data !== "" &&
                                    (billInvoice.data[0].ecommerce_trader ===
                                      "true" ||
                                      billInvoice.data[0].ecommerce_trader ===
                                        true)
                                  }
                                  id={`inline-radio-1`}
                                />
                              </Col>
                              <Col>
                                <Form.Check
                                  inline
                                  disabled
                                  value={false}
                                  label="No"
                                  name="group6"
                                  type="radio"
                                  checked={
                                    billInvoice.data !== "" &&
                                    (billInvoice.data[0].ecommerce_trader ===
                                      "false" ||
                                      billInvoice.data[0].ecommerce_trader ===
                                        false)
                                  }
                                  id={`inline-radio-2`}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col>
                            <Row>
                              <Form.Label className="RowBoxHeading TopMargin">
                                Are you liable to reverse charge : *
                              </Form.Label>
                            </Row>
                            <Row style={{ transform: "scale(0.9)" }}>
                              <Col>
                                <Form.Check
                                  inline
                                  disabled
                                  value={true}
                                  label="Yes"
                                  name="group7"
                                  type="radio"
                                  checked={
                                    billInvoice.data !== "" &&
                                    (billInvoice.data[0].reverse_charge ===
                                      "true" ||
                                      billInvoice.data[0].reverse_charge ===
                                        true)
                                  }
                                  id={`inline-radio-1`}
                                />
                              </Col>
                              <Col>
                                <Form.Check
                                  inline
                                  disabled
                                  value={false}
                                  label="No"
                                  name="group7"
                                  type="radio"
                                  checked={
                                    billInvoice.data !== "" &&
                                    (billInvoice.data[0].reverse_charge ===
                                      "false" ||
                                      billInvoice.data[0].reverse_charge ===
                                        false)
                                  }
                                  id={`inline-radio-2`}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col>
                            <Row>
                              <Form.Label className="RowBoxHeading TopMargin">
                                Bill to / Ship to applicable : *
                              </Form.Label>
                            </Row>
                            <Row style={{ transform: "scale(0.9)" }}>
                              <Col>
                                <Form.Check
                                  inline
                                  disabled
                                  value={true}
                                  label="Yes"
                                  name="group8"
                                  type="radio"
                                  checked={
                                    billInvoice.data !== "" &&
                                    (billInvoice.data[0]
                                      .to_bill_ship_applicable === "true" ||
                                      billInvoice.data[0]
                                        .to_bill_ship_applicable === true)
                                  }
                                  id={`inline-radio-1`}
                                />
                              </Col>
                              <Col>
                                <Form.Check
                                  inline
                                  disabled
                                  value={false}
                                  label="No"
                                  name="group8"
                                  type="radio"
                                  checked={
                                    billInvoice.data !== "" &&
                                    (billInvoice.data[0]
                                      .to_bill_ship_applicable === "false" ||
                                      billInvoice.data[0]
                                        .to_bill_ship_applicable === false)
                                  }
                                  id={`inline-radio-2`}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col>
                            <Row>
                              <Form.Label className="RowBoxHeading TopMargin">
                                Charge GST on shipping address : *
                              </Form.Label>
                            </Row>
                            <Row style={{ transform: "scale(0.9)" }}>
                              <Col>
                                <Form.Check
                                  inline
                                  disabled
                                  value={true}
                                  label="Yes"
                                  name="group9"
                                  type="radio"
                                  checked={
                                    billInvoice.data !== "" &&
                                    (billInvoice.data[0]
                                      .gst_shipping_address === "true" ||
                                      billInvoice.data[0]
                                        .gst_shipping_address === true)
                                  }
                                  id={`inline-radio-1`}
                                />
                              </Col>
                              <Col>
                                <Form.Check
                                  inline
                                  disabled
                                  value={false}
                                  label="No"
                                  name="group9"
                                  type="radio"
                                  checked={
                                    billInvoice.data !== "" &&
                                    (billInvoice.data[0]
                                      .gst_shipping_address === "false" ||
                                      billInvoice.data[0]
                                        .gst_shipping_address === false)
                                  }
                                  id={`inline-radio-2`}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Row>
                      <Row className="ButtonsForm">
                        <Col xs={1}>
                          <Button
                            type="submit"
                            onClick={() => {
                              nav(-1);
                            }}
                          >
                            Back
                          </Button>
                        </Col>
                        <Col xs={1}>
                          <Button type="submit">Save</Button>
                          {/* {performNavigate()} */}
                        </Col>
                      </Row>
                    </>
                  )}
                </>
              )}
              {billInvoice === false && billseries === false && (
                <>
                  {isAuthenticated().user.last_login && <>{EditProfileNew()}</>}
                </>
              )}

              {/* <Row className="ButtonsForm">
                <Col xs={1}>
                <Button type="submit" onClick={()=>{nav(-1)}} >Back</Button>
                </Col>
                <Col xs={1}>
                <Button type="submit" >Save</Button> 
                {/* {performNavigate()} }
                </Col>
              </Row> */}
            </Container>
          </Form>
        </div>
      </div>
      <FooterC />
    </>
  );
}
