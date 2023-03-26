import React from "react";
import FooterC from "./footer";
import Navb from "./navbar";
import "./css/addsales.css";
import { SignoutNav } from "../UserView/singoutnav";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export function SalesForm() {

  return (
    <>
      <Navb component={<SignoutNav />} />
      <div className="FormSet">
        <div className="HeadingWrapper">
          <h2>ADD SALES</h2>
        </div>
        <div className="Formhandler">
          <Form onSubmit={(event)=>{
 event.preventDefault()
 console.log("Content: "+ event.target.values);

          }}>
            <div className="parent">
              <div className="pad div1">
              <Form.Group >
                  <Form.Label>Email :</Form.Label>
                  <Form.Control
                    size="sm" type="text"
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                </Form.Group>
                
              </div>
              <div className="pad div2">
                <Form.Group
                size="sm"
                  controlId="formBasicPassword"
                  autoComplete="off"
                >
                  <Form.Label >Password</Form.Label>
                  <Form.Control
                  size="sm" 
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
              </div>
              <div className="pad div3">
              <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                  size="sm"
                    type="username"
                    placeholder="Username"
                    autoComplete="off"
                  />
                </Form.Group>
                </div>
              <div className="pad div4"> <Form.Group>
        <Form.Label>System (Data)</Form.Label>
        <Form.Control size="sm" type="text" placeholder="System Credit" />
      </Form.Group> </div>
              <div className="pad div5"> <Form.Group>
        <Form.Label>SMS ()</Form.Label>
        <Form.Control size="sm" type="text" placeholder="SMS credit" />
        
      </Form.Group> </div>
              <div className="pad div6"> <Form.Group>
        <Form.Label>Whatsapp ()</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Whatsapp Credit" />
        
      </Form.Group> </div>
              <div className="pad div7"> <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Phone Number" />
        
      </Form.Group> </div>
              <div className="pad div8"> <Form.Group>
        <Form.Label>State</Form.Label>
        <Form.Select aria-label="Default select example">
      <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        
      </Form.Group> </div>
              <div className="pad div9"> <Form.Group>
        <Form.Label>GST No.</Form.Label>
        <Form.Control size="sm" type="text" placeholder="GST Number" />
        
      </Form.Group> </div>
              <div className="pad div10"> <Form.Group>
        <Form.Label>Pan Card No.</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Pancard number" />
        
      </Form.Group> </div>
      <div className="pad div11"> <Form.Group>
        <Form.Label>KYC No.</Form.Label>
        <Form.Control size="sm" type="text" placeholder="KYC Number" />
        
      </Form.Group> </div>
      <div className="pad div12"> <Form.Group  controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Address" />
        
      </Form.Group> </div>
      <div className="pad div13"> <Form.Group>
        <Form.Label>Reason</Form.Label>
        <Form.Control as="textarea" />
        
      </Form.Group> </div>
            </div>
            <Button type="submit">Submit form</Button>
          </Form>
        </div>
      </div>


      <FooterC />
    </>
  );
}
