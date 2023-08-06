import React, { useEffect, useState } from "react";
import Navb from "../Components/navbar";
import { SignoutNav } from "../UserView/singoutnav";
import { useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth/authIndex";
import { Button, Form } from "react-bootstrap";
import "./css/places.css";
export function Place() {
  const [places, setplaces] = useState();
  const [groups, setgroups] = useState();
  const [cat, setcat] = useState();
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    setValidated(false);
  });
  const handleChange = () => {};
  return (
    <>
      <div className="name__top" style={{ background: "#313493" }}>
        Welcome to Head Office {isAuthenticated().user.first_name}
      </div>
      <Navb component={<SignoutNav />} state={"headOffice"} />
      <div className="DashContainer">
        <div className="DashboardBar">
          <h3>Place Master</h3>
        </div>
      </div>

      <div class="parentplace">
<div class="divp1">
    <Form
              noValidate
              validated={validated}
              onSubmit={(event) => {
                places.loading = true;
                const form = event.currentTarget;
                if (form.checkValidity() === false) {
                  event.preventDefault(); // refresh problem is here
                  event.stopPropagation();
                } else {
                  event.preventDefault();
                  setValidated(true);
                  console.log(places);
                  //Function here to add
                }
              }}
            >
              <Form.Group>
                <Form.Label>Add Places (Customers):</Form.Label>
                <Form.Control
                  onChange={handleChange("Places")} // add change condition and function call to check for uniqueness from backend.
                  size="sm"
                  type="input"
                  className="form-control"
                  placeholder="Places"
                  required
                /></Form.Group></Form> </div>
<div class="divp2"><Button type="submit" style={{fontSize: "14px"}}> Save </Button>
 </div>
<div class="divp3"><Form
              noValidate
              validated={validated}
              onSubmit={(event) => {
                places.loading = true;
                const form = event.currentTarget;
                if (form.checkValidity() === false) {
                  event.preventDefault(); // refresh problem is here
                  event.stopPropagation();
                } else {
                  event.preventDefault();
                  setValidated(true);
                  console.log(places);
                  //Function here to add
                }
              }}
            >
              <Form.Group>
                <Form.Label>Add Group (Customers):</Form.Label>
                <Form.Control
                  onChange={handleChange("Group")} // add change condition and function call to check for uniqueness from backend.
                  size="sm"
                  type="input"
                  className="form-control"
                  placeholder="Group"
                  required
                /></Form.Group></Form></div>
<div class="divp4"><Button type="submit" style={{fontSize: "14px"}}> Save </Button> </div>
<div class="divp5"><Form
              noValidate
              validated={validated}
              onSubmit={(event) => {
                places.loading = true;
                const form = event.currentTarget;
                if (form.checkValidity() === false) {
                  event.preventDefault(); // refresh problem is here
                  event.stopPropagation();
                } else {
                  event.preventDefault();
                  setValidated(true);
                  console.log(places);
                  //Function here to add
                }
              }}
            >
              <Form.Group>
                <Form.Label>Add Category (Items):</Form.Label>
                <Form.Control
                  onChange={handleChange("Category")} // add change condition and function call to check for uniqueness from backend.
                  size="sm"
                  type="input"
                  className="form-control"
                  placeholder="Category"
                  required
                /></Form.Group></Form> </div>
<div class="divp6"><Button type="submit" style={{fontSize: "14px"}}> Save </Button> </div>
</div>
    </>
  );
}
