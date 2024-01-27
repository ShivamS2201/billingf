import React from "react";
import TableComponent from "./Tablecomponent";
import { JdateGet, UpdateRY, expBR, getExpiry } from "../../auth/authIndex";
import { Button, Form, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./css/basetable.css"
const TestTable = ({ datac }) => {
  const tooltip = <Tooltip id="tooltip">Renew Subscription</Tooltip>;
  const nav = useNavigate();
  const handleChange = (name, idx) => (event) => {
    if (name === "renew_year") {
      if (
        window.confirm(
          `Renew ${datac[idx].first_name} by ${event.target.value} year`
        )
      ) {
        alert("Changed");
        UpdateRY({ ...datac[idx], renew_year: event.target.value });
      } else {
        alert("Not changed");
      }
    }
  };
  const columns = [
    {
      sortable: true,
      name: "Name",
      selector: (row) => row.first_name,
    },
    {
      sortable: true,
      name: "Email Id",
      selector: (row) => row.email,
    },
    {
      sortable: true,
      name: "Contact No.",
      selector: (row) => row.bill_manage_info__landlineNUM,
    },
    {
      sortable: true,
      name: "SMS",
      selector: (row) => (
        <span>
          {row.bill_manage_info__sms_debit}
          <span>({row.bill_manage_info__sms_credit})</span>
        </span>
      ),
    },
    {
      sortable: true,
      name: "System",
      selector: (row) => (
        <span>
          {row.bill_manage_info__system_debit}
          <span>({row.bill_manage_info__system_credit})</span>
        </span>
      ),
    },
    {
      sortable: true,
      name: "Whatsapp",
      selector: (row) => (
        <span>
          {row.bill_manage_info__whatsapp_debit}
          <span>({row.bill_manage_info__whatsapp_credit})</span>
        </span>
      ),
    },
    {
      sortable: true,
      name: "Joining Date",
      selector: (row) => <span>{JdateGet(row["joining_date"])}</span>,
    },
    {
      sortable: true,
      name: "Expiration Date",
      selector: (row) => (
        <span>{expBR(row["joining_date"], row["renew_year"])}</span>
      ),
    },
    {
      name: "User Actions",
      selector: (row, rowIndex) => (
        <div>
          <span>
            {(row["is_active"] === true && (
              <div className="tableOptions">
                <div className="container">
                  <div className="element">
                    <OverlayTrigger placement="top" overlay={tooltip}>
                      <Form.Group>
                        <Form.Select
                          size="sm"
                          aria-label="Default select example"
                          value={row.renew_year}
                          onChange={handleChange("renew_year", rowIndex)}
                          required
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </Form.Select>
                      </Form.Group>
                    </OverlayTrigger>
                  </div>
                  <div className="element">
                    <i
                      className="bi bi-pencil-fill"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        nav(`/user/dashboard/edit/user/${row.id}`);
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            )) ||
              (row["is_active"] === false && (
                <div className="tableOptions">
                  <div>
                    <i
                      className="bi bi-pencil-fill"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        nav(`/user/dashboard/edit/user/${row.id}`);
                      }}
                    >
                      {" "}
                    </i>
                  </div>
                  <Form.Group>
                    <Form.Select
                      size="sm"
                      aria-label="Default select example"
                      value={row.renew_year}
                      onChange={handleChange("renew_year", rowIndex)}
                      required
                      title="Renew Year"
                    >
                      <option value="1">Renew</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              ))}
          </span>
        </div>
      ),
    },
  ];

  // const datac = [
  //     {
  //         id: 1,
  //         title: 'Beetlejuice',
  //         year: '1988',
  //     },
  //     {
  //         id: 2,
  //         title: 'Ghostbusters',
  //         year: '1984',
  //     },
  //     {
  //         id: 3,
  //         title: 'Ghostbusters',
  //         year: '1984',
  //     },
  //     {
  //         id: 4,
  //         title: 'Ghostbusters',
  //         year: '1984',
  //     },
  //     {
  //         id: 5,
  //         title: 'Ghostbusters',
  //         year: '1984',
  //     },
  //     {
  //         id: 6,
  //         title: 'Ghostbusters',
  //         year: '1984',
  //     },
  //     {
  //         id: 7,
  //         title: 'Ghostbusters',
  //         year: '1984',
  //     },
  //     {
  //         id: 8,
  //         title: 'Ghostbusters',
  //         year: '1984',
  //     },
  //     {
  //         id: 9,
  //         title: 'Ghostbusters',
  //         year: '1984',
  //     },
  // ]

  // ... your TableComponent implementation
  return (
    <>
      <TableComponent columns={columns} datac={datac} />
    </>
  );
};

export default TestTable;
