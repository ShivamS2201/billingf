import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navb from "../navbar";
import { SignoutNav } from "../../UserView/singoutnav";
import { isAuthenticated } from "../../auth/authIndex";
import SeriesHolder from "./SeriesHolder";
import { API } from "../../backend";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import FooterC from "../footer";

/*
Call series data 
Call Invoice Data
Call Invoice for preview - open in another tab with dummy data i.e prepare a component for this

Start with num of series and put the element into a map state which changes if the count cghanges
*/
const InvoiceDesign  = ()=>{
  let icon1 = require("../../assets/images/blackPerson.png");
  const nav = useNavigate();
  const [CurrencyData, setCurrency] = useState();
  const [templatesData, settemplates] = useState();

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
              onChange={handleChangeInvoice("invoice_design_temp")}
              value={billInvoice.data!=="" && billInvoice.data[0].invoice_design_temp_id}
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
        return (//billInvoice.data[0].currency_id!=="" &&
          <Form.Group>
            <Form.Label className="RowBoxHeading">Currency: *</Form.Label>
            <Form.Select
              size="md"
              aria-label="Default select example"
              value={billInvoice.data!=="" && billInvoice.data[0].currency_id}
              onChange={handleChangeInvoice("currency")}
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
      const getInvoiceDetails = async () => {
        try {
          const resp = await fetch(`${API}bill/getInvoice`, {
            method: "GET",
          });
          const data = await resp.json();
          setbillInvoice({ ...billInvoice, data });
          setInvoiceHolderData(data)
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
          setSeriersHolderData(data)
          return data;
        } catch (err) {
          console.log(err);
        }
      };

      const handleChangeInvoice = (name) => (event) => {
        if (name === "Image") {
          setbillInvoice({
            ...billInvoice,
            ImageUrl: URL.createObjectURL(event.target.files[0]),
            Image: event.target.files[0],
          });
        }
        else{
          setbillInvoice({ ...billInvoice, [name]: event.target.value });
        }
      };
      const handlechangeSeries = (name) => (event) =>{
        if(name === "prefix_surfix_type") 
        {
          setbillseries({ ...billseries, [name]: event.target.value });
        }
        setbillseries({...billseries, [name]:event.target.value});
      }

    const [InvoiceHolderData,setInvoiceHolderData] = useState('')
    const [SeriersHolderData,setSeriersHolderData] = useState('')
    
    useEffect(()=>{
        getInvoiceDetails();
        getSeriesDetails();
        getTemplates();
        getCurrency();
    },[])
    
    return (<>
      <div className="name__top" style={{ background: "#313493" }}>
        Welcome to Head Office {isAuthenticated().user.first_name}
      </div>

      <Navb component={<SignoutNav />} state={"headOffice"} />
      <div className="DashContainer">
        <div className="DashboardBarM">
          <h3>Invoice Master</h3>
          <div className="MasterButton">  <div className="ButtonTextWrapper">
         <div className="LOS"></div>
         <div className="ButtonContainerm">
           <Link to="/user/dashboard/headOffice/addcustomer/">
             <button  onClick={() => {
                              nav(-1);
                            }}> Back </button>
           </Link>
         </div>{" "}
       </div></div>
        </div>
      </div>


      <SeriesHolder series={SeriersHolderData} invoice = {InvoiceHolderData} />

      <div className="s">
        <Container>
        <Row style={{ border:"1px solid black"}}>
                        <Form.Label className="RowBoxHeading TopMargin">
                          Invoice Details :
                        </Form.Label>
                      </Row>
                      <Row
                        style={{ border:"1px solid black"}}
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
                                  inline
                                  value={true}
                                  label="Logo"
                                  name="group4"
                                  type="radio"
                                  checked={
                                    billInvoice.is_logo_img === "true" ||
                                    billInvoice.is_logo_img === true
                                  }
                                  onChange={handleChangeInvoice("is_logo_img")}
                                  id={`inline-radio-1`}
                                />
                              </Col>
                              <Col xs={3}>
                                <Form.Check
                                  inline
                                  value={false}
                                  label="Text"
                                  name="group4"
                                  type="radio"
                                  onChange={handleChangeInvoice("is_logo_img")}
                                  id={`inline-radio-2`}
                                />
                              </Col>
                            </Row>
                          </Col>

                          {(billInvoice.is_logo_img === "true" ||
                            billInvoice.is_logo_img === true) && (
                            <>
                              <Col xs={4}>
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
                              </Col>
                              <Col xs={4}>
                                <Form.Label className="RowBoxHeading TopMargin">
                                  Image: *
                                </Form.Label>
                                {billInvoice.data[0].logo && (
                                  <>
                                    <Image
                                      className="TopMargin"
                                      required
                                      src={( billInvoice.data !== "")?
                                      `${billInvoice.data[0].logo}`:icon1
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
                            onChange={handleChangeInvoice("logo_text")} // add change condition and function call to check for uniqueness from backend.
                            size="md"
                            type="input"
                            className="form-control"
                            placeholder="2 Characters"
                            isInvalid = {billInvoice.logo_text!=="" && billInvoice.logo_text.length>2}
                          />
                          <Form.Control.Feedback type="invalid">
                            Only 2 Characters allowed.                       </Form.Control.Feedback>

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
                            onChange={handlechangeSeries("name")} // add change condition and function call to check for uniqueness from backend.
                            size="md"
                            type="input"
                            className="form-control"
                            placeholder="2 Characters"
                          />
                          <Form.Control.Feedback type="invalid">
                            Only 2 Characters allowed.                       </Form.Control.Feedback>
                          </Col>
                          <Col>
                            <Form.Label className="RowBoxHeading TopMargin">
                              Prefix/Sufix: *
                            </Form.Label>
                            <Form.Check style={{transform:"scale(0.9)"}}
                        inline
                        value={true}
                        label="Prefix"
                        name="group10"
                        type="radio"
                        checked={
                          billseries.prefix_surfix_type === "true" ||
                          billseries.prefix_surfix_type === true
                        }
                        onChange={handlechangeSeries("prefix_surfix_type")}
                        id={`inline-radio-1`}
                      />
                      <Form.Check style={{transform:"scale(0.9)"}}
                        inline
                        value={false}
                        label="Suffix"
                        name="group10"
                        type="radio"
                        checked={
                          billseries.prefix_surfix_type === "false" ||
                          billseries.prefix_surfix_type === false
                        }
                        onChange={handlechangeSeries("prefix_surfix_type")}
                        id={`inline-radio-1`}
                      />    
                       <Form.Control
                            onChange={handlechangeSeries("prefix_surfix")} // add change condition and function call to check for uniqueness from backend.
                            size="md"
                            type="input"
                            className="form-control"
                            disabled
                            value={(billseries.prefix_surfix_type === "true" ||
                            billseries.prefix_surfix_type === true )?fiscalyear("pref"):fiscalyear("suf")}
                          />
                          <Form.Control.Feedback type="invalid">
                            Only 2 Characters allowed.                       </Form.Control.Feedback>
                          </Col>
                          <Col>
                            <Form.Label className="RowBoxHeading TopMargin">
                              Starting Serial num: *
                            </Form.Label>
                            <Form.Control
                            onChange={handlechangeSeries("sl_num")} // add change condition and function call to check for uniqueness from backend.
                            size="md"
                            type="input"
                            className="form-control"
                            placeholder="Serial Number"
                            value={billseries.sl_num}
                            isInvalid = {billseries.sl_num.length > 0 && !/^\d+$/.test(billseries.sl_num)}
                          />
                          <Form.Control.Feedback type="invalid">
                            Should be an Integer</Form.Control.Feedback>

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
                                rows={3}
                                isInvalid={billInvoice.term_condition.length>100}
                                onChange={handleChangeInvoice("term_condition")}
                                value={billInvoice.data!=="" && billInvoice.data[0].term_condition}
                              />
                              <Form.Control.Feedback type="invalid">
                            Maximum Character Length Reached!                      </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Row>
                      <Row style={{ border:"1px solid black"}}>
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
                            inline
                            value={true}
                            label="Yes"
                            name="group5"
                            type="radio"
                            checked={billInvoice.additional_option_type === "true" || billInvoice.additional_option_type === true}
                            onChange={handleChangeInvoice("additional_option_type")}
                            id={`inline-radio-1`}
                          />
                        </Col>
                        <Col
                          xs={1}
                          className="TopMargin"
                          style={{ transform: "scale(0.9)" }}
                        >
                          <Form.Check
                            inline
                            value={false}
                            label="No"
                            name="group5"
                            type="radio"
                            onChange={handleChangeInvoice("additional_option_type")}
                            id={`inline-radio-2`}
                          />
                        </Col>
                      </Row>
                      <Row style={{ border:"1px solid black"}}>
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
                                  value={true}
                                  label="Yes"
                                  name="group6"
                                  type="radio"
                                  checked={billInvoice.ecommerce_trader === "true"|| billInvoice.ecommerce_trader === true}
                                  onChange={handleChangeInvoice("ecommerce_trader")}
                                  id={`inline-radio-1`}
                                />
                              </Col>
                              <Col>
                                <Form.Check
                                  inline
                                  value={false}
                                  label="No"
                                  name="group6"
                                  type="radio"
                                  onChange={handleChangeInvoice("ecommerce_trader")}
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
                                  value={true}
                                  label="Yes"
                                  name="group7"
                                  type="radio"
                                  checked={billInvoice.reverse_charge === "true"|| billInvoice.reverse_charge===true}
                                  onChange={handleChangeInvoice(
                                    "reverse_charge"
                                  )}
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
                                  onChange={handleChangeInvoice(
                                    "reverse_charge"
                                  )}
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
                                  value={true}
                                  label="Yes"
                                  name="group8"
                                  type="radio"
                                  checked={billInvoice.to_bill_ship_applicable === "true"||billInvoice.to_bill_ship_applicable===true}
                                  onChange={handleChangeInvoice("to_bill_ship_applicable")}
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
                                  onChange={handleChangeInvoice("to_bill_ship_applicable")}
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
                                  value={true}
                                  label="Yes"
                                  name="group9"
                                  type="radio"
                                  checked={billInvoice.gst_shipping_address === "true"|| billInvoice.gst_shipping_address===true}
                                  onChange={handleChangeInvoice("gst_shipping_address")}
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
                                  onChange={handleChangeInvoice("gst_shipping_address")}
                                  id={`inline-radio-2`}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Row>
        </Container>
      </div>
      <br/>
      <br/>

      <FooterC/>
        </>)
};

export default InvoiceDesign;
