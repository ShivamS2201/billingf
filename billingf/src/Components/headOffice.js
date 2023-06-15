import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./css/heado.css";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

// Before making add branch remeber to change role id values elese user won't be created
const HeadOfficeComponent = () => {
  return (
    <>
      <div className="DashContainer">
        <div className="DashboardBar">
          <h3>Dashboard</h3>
        </div>
      </div>
      <Container style={{ maxWidth: "100vw" }}>
        <Row xs={2} md={4} lg={6}>
          <Col id="col1">
            <Carousel>
              <Carousel.Item>
                <Stack direction="horizontal" gap={3}>
                  <Card style={{ width: "13rem", display: "table-cell" }}>
                    <Card.Body id="card1">
                      <Row id="cardHolder">
                        <Col id="iconHolder">
                          <i className="bi bi-cart3"></i>
                        </Col>
                        <Col id="dataholder">
                          <Row id="nameH">Purchase</Row>
                          <Row id="numH">8</Row>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card style={{ width: "13rem", display: "table-cell" }}>
                    <Card.Body id="card1">
                      <Row id="cardHolder">
                        <Col id="iconHolder">
                          <i className="bi bi-people-fill"></i>
                        </Col>
                        <Col id="dataholder">
                          <Row id="nameH">Customer</Row>
                          <Row id="numH">8</Row>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Stack>
              </Carousel.Item>
              <Carousel.Item>
                <Stack direction="horizontal" gap={3}>
                  <Card style={{ width: "13rem", display: "table-cell" }}>
                    <Card.Body id="card1">
                      <Row id="cardHolder">
                        <Col id="iconHolder">
                          <i className="bi bi-gift-fill"></i>
                        </Col>
                        <Col id="dataholder">
                          <Row id="nameH">Stock</Row>
                          <Row id="numH">8</Row>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card style={{ width: "13rem", display: "table-cell" }}>
                    <Card.Body id="card1">
                      <Row id="cardHolder">
                        <Col id="iconHolder">
                          <i className="bi bi-car-front-fill"></i>
                        </Col>
                        <Col id="dataholder">
                          <Row id="nameH">Vehicle</Row>
                          <Row id="numH">8</Row>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Stack>
              </Carousel.Item>
              <Carousel.Item>
                <Stack direction="horizontal" gap={3}>
                  <Card style={{ width: "13rem", display: "table-cell" }}>
                    <Card.Body id="card1">
                      <Row id="cardHolder">
                        <Col id="iconHolder">
                          <i className="bi bi-cash"></i>
                        </Col>
                        <Col id="dataholder">
                          <Row
                            id="nameH"
                            style={{ fontSize: "13px", minWidth: "8vw" }}
                          >
                            Purchase Order
                          </Row>
                          <Row id="numH">8</Row>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card style={{ width: "13rem", display: "table-cell" }}>
                    <Card.Body id="card1">
                      <Row id="cardHolder">
                        <Col id="iconHolder">
                          <i className="bi bi-currency-rupee"></i>
                        </Col>
                        <Col id="dataholder">
                          <Row id="nameH">Bank</Row>
                          <Row id="numH">8</Row>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Stack>
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col id="col2" style={{ padding: "0" }}>
            <div className="parentHO">
              <Link id="linkerho" to={"bank"}>
                <div className="divHO1">
                  <div className="iconHO">
                    <i className="bi bi-receipt"></i>
                  </div>
                  <div className="textHO">Sales invoice</div>
                </div>
              </Link>

              <Link id="linkerho" to={"bank"}>
                <div className="divHO2">
                  <div className="iconHO">
                    <i className="bi bi-table"></i>
                  </div>
                  <div className="textHO">Purchase Invoice</div>
                </div>
              </Link>

              <Link id="linkerho" to={"bank"}>
                <div className="divHO3">
                  <div className="iconHO">
                    <i className="bi bi-person-fill"></i>{" "}
                  </div>
                  <div className="textHO">Edit Profile</div>
                </div>
              </Link>

              <Link id="linkerho" to={"bank"}>
                <div className="divHO4">
                  <div className="iconHO">
                    <i className="bi bi-collection-fill"></i>
                  </div>
                  <div className="textHO">Invoice Design</div>
                </div>
              </Link>

              <Link id="linkerho" to="headOffice/payment">
                <div className="divHO5">
                  <div className="iconHO">
                    <i className="bi bi-credit-card-fill"></i>
                  </div>
                  <div className="textHO">Payements</div>
                </div>
              </Link>

              <Link id="linkerho" to="headOffice/customer">
                <div className="divHO6">
                  <div className="iconHO">
                    <i className="bi bi-people-fill"></i>{" "}
                  </div>
                  <div className="textHO">Customers</div>
                </div>
              </Link>

              <Link id="linkerho" to="headOffice/product">
                <div className="divHO7">
                  <div className="iconHO">
                    <i className="bi bi-gift-fill"></i>
                  </div>
                  <div className="textHO">Products</div>
                </div>
              </Link>

              <Link id="linkerho" to="headOffice/bank">
                <div className="divHO8">
                  <div className="iconHO">
                    <i className="bi bi-currency-rupee"></i>{" "}
                  </div>
                  <div className="textHO">Bank</div>
                </div>
              </Link>
              <Link id="linkerho" to="headOffice/master">

                <div className="divHO9">
                  <div className="iconHO">
                    <i className="bi bi-person-square"></i>{" "}
                  </div>
                  <div className="textHO">Master</div>
                </div>
              </Link>
              <Link id="linkerho" to="headOffice/stock">

              <div className="divHO10">
                <div className="iconHO">
                  <i className="bi bi-stack"></i>{" "}
                </div>
                <div className="textHO">Stock</div>
              </div>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HeadOfficeComponent;
