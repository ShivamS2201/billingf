import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React,{ useState }  from "react";
import { Navbar } from "react-bootstrap";
import Card from "react-bootstrap/Card";
// import { useHistory } from "react-router";



import "./css/login.css";
const LOGIN = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const history = useHistory();
  const handleLogin = (email, password) => {
  }
  

  console.log("LOGIN Enabled");
  return (
    <div>
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
        <Card>
          <Card.Body>
            <div className="FormWrapper">
            <Form onSubmit={console.log("email")}>
              <div className="TextPay">
                <div className="HeadTP">WELCOME TO PAY</div>
                <br />
                (A PRODUCT OF MAPROLE) 
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Email :</Form.Label>
                <Form.Control type="text" className="form-control" id="validationCustom01" placeholder="Username" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password :</Form.Label>
                <Form.Control type="password" placeholder="Password" required />
              </Form.Group>
              <div className="ButtonLogin">
                <div className="FoPass">
                  Forgot Password ?
                </div>
              <Button type="submit" onClick={console.log('LOGININGIN')}>
                LOGIN
              </Button>
              </div>
            </Form>
            </div>
          </Card.Body>
          <Card.Footer>
            COPYRIGHT ©2017 - Click Pe Bill - All rights reserved <br />
            MADE BY MAPROLE
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default LOGIN;
