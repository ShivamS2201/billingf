import React, { useEffect, useState } from "react";
import Navb from "../navbar";
import FooterC from "../footer";
import { SignoutNav } from "../../UserView/singoutnav";
import { isAuthenticated, isAuthenticatedBilling } from "../../auth/authIndex";
import { Col, Container, Form, Row } from "react-bootstrap";
import { API } from "../../backend";

export default function EditProfile() {

    const [values, setvalues] = useState(isAuthenticated().user);
    const [manageValue,setManageVal] = useState(isAuthenticatedBilling())
    const [stateChoice, SetStatechoice] = useState();

    const [RegisterDtype, SetRegDealer] = useState();
    const [billInvoice,setbillInvoice] = useState("false");
    const [billseries,setbillseries] = useState("false");
    const [CurrencyData, setCurrency] = useState();
    const [templatesData, settemplates] = useState();
    const [Bank,setBank] = useState(
     { isBank:false,
      bank_name:"",}
    );



    
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
      <Form.Group>
        <Form.Label className="RowBoxHeading">Currency: *</Form.Label>
        <Form.Select
          size="md"
          aria-label="Default select example"
          value={values.cust_currency}
          onChange={handleChangeInvoice("cust_currency")}
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
          aria-label="Default select example"
          onChange={handleChange("cust_template")}
          // isInvalid={}
          // isValid={values.state !== ""}
          required// a disbaled constion if again logged in !!!!
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
  const handleChangeInvoice = (name) =>(event)=>{
    setbillInvoice({...billInvoice,[name]:event.target.value})
  }
    const handleChange = (name) => (event) => {
        if (name === "Image") {
          setvalues({
            ...values,
            ImageUrl: URL.createObjectURL(event.target.files[0]),
            Image: event.target.files[0],
          });
          console.log(values);
        } else {
            setvalues({ ...values, [name]: event.target.value });
          }
        };
  const handleChangeBank = (name) =>(event)=>{
    setBank({...Bank,[name]:event.target.value})
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
        function states() {
          return (
            <Form.Group>
              <Form.Label className="RowBoxHeading TopMargin" >State Name: *</Form.Label>
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
    const [validated, setValidated] = useState(false);

        useEffect(() => {
          setValidated(false);
          getState();
          // getPlacebymaster();
          getDealerType();
          getCurrency();
          // fetchGroup();
          getTemplates();
          // getExport();
        }, []);
  return (
    <>            <div className="name__top">Welcome to Head Office {isAuthenticated().user.first_name}</div>

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
              if (form.checkValidity() === false) {
                event.preventDefault(); // refresh problem is here
                event.stopPropagation();
              } else {
                event.preventDefault();
                setValidated(true);
                // CustomerAdd(values,Limit_values).then((data) => {
                //   if (data) {
                //     console.log(data);
                //     setvalues({
                //       ...values,
                //       didNavigate: true,
                //       loading: false,
                //     });
                //     <Navigate to="/user/dashboard/headOffice/customer" />
                //   } else {
                //     console.log(data);
                //     setvalues({ ...values, loading: false });
                //   }
                // })
                // .catch((ee) => {
                //   console.log(ee);
                // });         
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
                      value= {values && values.first_name} 
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
                      Short Name: *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange("cust_name")} // add change condition and function call to check for uniqueness from backend.
                      size="md"
                      type="input"
                      className="form-control"
                      value={manageValue && manageValue.shortname}
                      required
                      isInvalid={/^\d+$/.test(values.cust_name)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Bank Name Incorrect
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="RowBoxHeading TopMargin">
                Address :
              </Row>
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

              <Row className="RowBoxHeading TopMargin">
                Contact Details :
              </Row>

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
                      value = {values && values.email}
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
                      <Row className="RowBoxHeading TopMargin">Is Registered Dealer :</Row>
                      <Row
                        style={{ transform: "scale(0.9)", marginTop: "12px" }}
                      >
                        <Col xs={2}>
                          <Form.Check
                            inline
                            value={true}
                            label="Yes"
                            name="group1"
                            type="radio"
                            checked={manageValue.is_regdealer === "true" || manageValue.is_regdealer === true}
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
                      <Row className="RowBoxHeading TopMargin">Actual Bill Quantity Differ :</Row>
                      <Row
                        style={{ transform: "scale(0.9)", marginTop: "12px" }}
                      >
                        <Col xs={2}>
                          <Form.Check
                            inline
                            value={true}
                            label="Yes"
                            name="group2"
                            type="radio"
                            checked={manageValue.actual_billQty === true || manageValue.actual_billQty === "true"}
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
                       {(manageValue.is_regdealer==="true"|| manageValue.is_regdealer === true) && (
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
                  {manageValue.is_regdealer==="false"  && (
                    <div className="DealerSelectionf"> </div>
                  )}
              </Row>
              {billInvoice !==false && billseries !==false &&
              <>
             
              {isAuthenticated().user.last_login && <>
              Log in not forst.
              <Row style={{background:"#eee "}}>
              <Col className="TopMargin" xs={2}><Form.Label className="RowBoxHeading" >
              Bank Details: *
                    </Form.Label></Col>
                    <Col xs={1} className="TopMargin">
                          <Form.Check
                            inline
                            value={true}
                            label="Yes"
                            name="group3"
                            type="radio"
                            checked={Bank.isBank === "true" || Bank.isBank === true}
                            onChange={handleChangeBank("isBank")}
                            id={`inline-radio-1`}
                          />
                        </Col>
                        <Col xs={1} className="TopMargin">
                          <Form.Check
                            inline
                            value={false}
                            label="No"
                            name="group3"
                            type="radio"
                            checked={Bank.isBank === "false" || Bank.isBank === false}
                            onChange={handleChangeBank("isBank")}
                            id={`inline-radio-2`}
                          />
                        </Col>
              </Row>
              {(Bank.isBank === "true" || Bank.isBank === true ) &&
              <>
              <Row>
                <Col>
                <Form.Group>
                            <Form.Label className="RowBoxHeading TopMargin">
                              Bank Name:
                            </Form.Label>
                            <Form.Control
                              onChange={handleChangeBank("bank_name")} // add change condition and function call to check for uniqueness from backend.
                              size="md"
                              type="input"
                              className="form-control"
                              // isInvalid={values.error && values.Etype === "GST"}
                            />
                            <Form.Control.Feedback type="invalid">
                             Valid Name
                            </Form.Control.Feedback>
                          </Form.Group>                
                </Col>
              </Row>
              <Row>
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
              <Row>
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
                <Col>Cuurency</Col>
              </Row>
              </> }
              <Row style={{background:"#eee "}}>
              <Form.Label className="RowBoxHeading TopMargin">
              Invoice Details :
                    </Form.Label>
              </Row>
              <Row style={{background:"#eee "}} className="AddressContainer">
              <Row style={{padding:"0 2vw 0 2vw"}}>
                <Col>
                <Row><Form.Label className="RowBoxHeading TopMargin">
                      Want to Print *
                    </Form.Label>
                </Row>
                <Row  style={{ transform: "scale(0.9)"}}>
                <Col xs={2}>
                          <Form.Check
                            inline
                            value={true}
                            label="Yes"
                            name="group4"
                            type="radio"
                            checked={values.logo_text === "true"}
                            onChange={handleChangeInvoice("logo_text")}
                            id={`inline-radio-1`}
                          />
                        </Col>
                        <Col xs={2}>
                          <Form.Check
                            inline
                            value={false}
                            label="No"
                            name="group4"
                            type="radio"
                            onChange={handleChangeInvoice("logo_text")}
                            id={`inline-radio-2`}
                          />
                        </Col>

                </Row>
                </Col>
                <Col>
                {
                  
                }
                <Form.Label className="RowBoxHeading TopMargin">
                      Logo/immage: *
                    </Form.Label>
                </Col>
                <Col>
                <Form.Label className="RowBoxHeading TopMargin">
                      Image: *
                    </Form.Label>
                
                </Col>
              </Row>
              <Row style={{padding:"0 2vw 0 2vw"}}>
                <Col>
                <Form.Label className="RowBoxHeading TopMargin">
                      Display name: *
                    </Form.Label></Col>
                <Col><Form.Label className="RowBoxHeading TopMargin">
                      prefix/Sufix: *
                    </Form.Label></Col>
                <Col><Form.Label className="RowBoxHeading TopMargin">
                      Starting Serial num: *
                    </Form.Label></Col>


              </Row>
              <Row style={{padding:"0 2vw 0 2vw"}}>
              <Col>
              {templatesData && Template()}
              </Col>
                    <Col>
                    {CurrencyData && Currency()}

                    </Col>
              </Row>
              <Row style={{padding:"0 2vw 0 2vw"}}>
                    <Col >
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label className="RowBoxHeading TopMargin">
                        Terms & Conditions: *
                      ({100})
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      // isInvalid={}
                      onChange={handleChangeInvoice("msg")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              </Row>
              <Row style={{background:"#eee "}}>
              <Col className="TopMargin" xs={2}><Form.Label className="RowBoxHeading" >
              Additional Option : *
                    </Form.Label></Col>
                    <Col xs={1} className="TopMargin" style={{ transform: "scale(0.9)"}}>
                          <Form.Check
                            inline
                            value={true}
                            label="Yes"
                            name="group5"
                            type="radio"
                            checked={values.bankDetails === "true"}
                            onChange={handleChangeInvoice("additional_options")}
                            id={`inline-radio-1`}
                          />
                        </Col>
                        <Col xs={1} className="TopMargin" style={{ transform: "scale(0.9)"}}>
                          <Form.Check
                            inline
                            value={false}
                            label="No"
                            name="group5"
                            type="radio"
                            onChange={handleChangeInvoice("additional_options")}
                            id={`inline-radio-2`}
                          />
                        </Col>
              </Row>
              <Row style={{background:"#eee "}}>
              <Form.Label className="RowBoxHeading TopMargin">
                      Additional Description : *
                    </Form.Label>
                <Row style={{padding:"0px 3.3vw"}}>
                  <Col>
                  <Row><Form.Label className="RowBoxHeading TopMargin">
                  Are you a E-Commerce Trader * : *
                    </Form.Label></Row>
                  <Row style={{ transform: "scale(0.9)"}}>
                  <Col >
                          <Form.Check
                            inline
                            value={true}
                            label="Yes"
                            name="group6"
                            type="radio"
                            checked={values.logo_text === "true"}
                            onChange={handleChangeInvoice("ECommerce")}
                            id={`inline-radio-1`}
                          />
                        </Col>
                        <Col >
                          <Form.Check
                            inline
                            value={false}
                            label="No"
                            name="group6"
                            type="radio"
                            onChange={handleChangeInvoice("ECommerce")}
                            id={`inline-radio-2`}
                          />
                        </Col>
                  </Row>
                  
                  </Col>
                  <Col>
                  <Row><Form.Label className="RowBoxHeading TopMargin">
                  Are you liable to reverse charge : *
                    </Form.Label></Row>
                    <Row style={{ transform: "scale(0.9)"}}>
                  <Col>
                          <Form.Check
                            inline
                            value={true}
                            label="Yes"
                            name="group7"
                            type="radio"
                            checked={values.logo_text === "true"}
                            onChange={handleChangeInvoice("revserseCharge")}
                            id={`inline-radio-1`}
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            inline
                            value={false}
                            label="No"
                            name="group7"
                            type="radio"
                            onChange={handleChangeInvoice("reverseCharge")}
                            id={`inline-radio-2`}
                          />
                        </Col></Row>
                  </Col>
                  <Col>
                  <Row><Form.Label className="RowBoxHeading TopMargin">
                  Bill to / Ship to applicable : *
                    </Form.Label></Row>
                    <Row style={{ transform: "scale(0.9)"}}>
                  <Col>
                          <Form.Check
                            inline
                            value={true}
                            label="Yes"
                            name="group8"
                            type="radio"
                            checked={values.logo_text === "true"}
                            onChange={handleChangeInvoice("Bill_to")}
                            id={`inline-radio-1`}
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            inline
                            value={false}
                            label="No"
                            name="group8"
                            type="radio"
                            onChange={handleChangeInvoice("Bill_to")}
                            id={`inline-radio-2`}
                          />
                        </Col></Row>
                  </Col>
                  <Col>
                  <Row><Form.Label className="RowBoxHeading TopMargin">
                  Charge GST on shipping address : *
                    </Form.Label></Row>
                    <Row style={{ transform: "scale(0.9)"}}>
                  <Col>
                          <Form.Check
                            inline
                            value={true}
                            label="Yes"
                            name="group9"
                            type="radio"
                            checked={billInvoice.ChargeGST === "true"}
                            onChange={handleChangeInvoice("ChargeGST")}
                            id={`inline-radio-1`}
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            inline
                            value={false}
                            label="No"
                            name="group9"
                            type="radio"
                            onChange={handleChangeInvoice("ChargeGST")}
                            id={`inline-radio-2`}
                          />
                        </Col></Row>
                  </Col>
                </Row>
              </Row>
              </>
              }
              </>
              }
              {billInvoice ===false && billseries ===false &&
              <>
              
              </>
              }

              </Container>
              </Form>
              </div>
              </div>
              

      <>
      ...
      </>
      <FooterC />
..<br/>      {JSON.stringify(values)}
 ..<br/>     {JSON.stringify(manageValue)}
..<br/>      {JSON.stringify(billInvoice)}
..<br/>       {JSON.stringify(Bank)}


    </>
  );
}
