import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {Navigate} from "react-router-dom";
import "./css/login.css";
import { authenticate, isAuthenticated, SignIn } from "../auth/authIndex";
/// take on submit error messgae suucess mesg onsubit
const LOGIN = () => {
  const [values, setvalues] = useState({
    name: "ALPHA",
    email: "al@gmail.com",
    password: "test@123",
    error: "",
    success: false,
    loading: false,
    didNavigate: false,
  });
  const { name, email, password, error, success, loading, didNavigate } =
    values;

    const loadingMsg=()=>{
      return (
        loading && (
          <div className="alert alert-info">
            Loading . . .
        </div>)
      )
    }
  const successmsg = () => {
    return (
      <div>
        <div
          className="alert alert-danger"
          style={{ display: success ? "" : "none" }}
        >
          {" "}
          LOGGED IN
        </div>
      </div>
    );
  };
  const errormsg = () => {
    return (
      <div>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {" "}
          {error} caused
        </div>
      </div>
    );
  };
  const handleChange = (name) => (event) => {
    setvalues({ ...values, error: false, [name]: event.target.value });
  };

  const performNavigate = ()=>{
    if(isAuthenticated()){
      return <Navigate to='/user/dashboard'/>
    }
  }
  // Handles the data as it is getting filled
  // const submit = (event) => {
  //   event.preventDefault();
  //   setvalues({ ...values, error: false, loading: true });
  //   SignIn({ email, password })
  //     .then((data) => {
  //       console.log("signin", data);
        
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   // Call to login api
  // };
  // Handles user submit event and takes specific action as per requirement.
  return (
    <div className="LoginWrapper">
      <Navbar className="navbar_login">
        <Navbar.Brand href="#home">
          <img
            alt="nothong"
            src={require("../imgs/email-logo.png")}
            width="200"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Navbar>
      <div className="BodyFooterContainer">
        {loadingMsg()}
        <Card>
          <Card.Body>
            <div className="FormWrapper">
              {successmsg()}
              {errormsg()}
              <Form>
                <div className="TextPay">
                  <div className="HeadTP">WELCOME TO PAY</div>
                  <br />
                  (A PRODUCT OF MAPROLE)
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Email :</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={handleChange("email")}
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Username"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password :</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={handleChange("password")}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <div className="ButtonLogin">
                  <div className="FoPass">Forgot Password ?</div>
                  <Button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setvalues({ ...values, error: false, loading: true });
                      SignIn({ email, password })
                        .then((data) => {
                          console.log("signin", data);
                          if (data.token){
                            let sessiontoken = data.token;
                            authenticate(sessiontoken,()=>{
                              console.log("token added");
                              setvalues({...values,didNavigate:true})
                            })
                          }
                          else{
                            setvalues({...values,loading:false})
                          }
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }}
                  >
                    LOGIN
                  </Button>
                </div>
              </Form>
            </div>
          </Card.Body>
          <Card.Footer>
            COPYRIGHT ©2017 - Click Pe Bill - All rights reserved <br />
            MADE BY MAPROLE
            {JSON.stringify(values)}
            {performNavigate()}
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default LOGIN;
