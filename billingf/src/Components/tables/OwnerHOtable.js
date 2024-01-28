import React, { useEffect, useState } from "react";
import { API } from "../../backend";
import { Link, useNavigate } from "react-router-dom";
import { JdateGet, UpdateRY, expBR, getExpiry, isAuthenticated } from "../../auth/authIndex";
import { Button,Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./css/tablesales.css";
import TestTable from "./baseTable";

export function OwnerHOTable() {
  const tooltip = <Tooltip id="tooltip">Renew Subscription</Tooltip>;
  const nav = useNavigate();
  
  const handleChange = (name,idx)=>(event)=>{
    if (name === "renew_year") {
    if (window.confirm(`Renew ${TableValue[idx].first_name} by ${event.target.value} year`)){
      alert("Changed")
      UpdateRY({...TableValue[idx], "renew_year":event.target.value})
    }
    else{
      alert("Not changed")
    }
}
}
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
      sortable:true,
      name:"Distributor",
      selector:(row)=> row.first_name_dist,
    }
    ,
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
      name: "Joining",
      selector: (row) => <span>{JdateGet(row["joining_date"])}</span>,
    },
    {
      sortable: true,
      name: "Expiration",
      selector: (row) => (
        <span>{expBR(row["joining_date"], row["renew_year"])}</span>
      ),
    },
    {
      name: "User Actions",
      right:true,
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
                  {/* <div className="element">
                    <i
                      className="bi bi-pencil-fill"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        nav(`/user/dashboard/edit/user/${row.id}`);
                      }}
                    ></i>
                  </div> */}
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

  const [TableValue, SetTableValue] = useState();
  const HOTableData = async () => {
    await fetch(`${API}user/register/ownerHOdata/${isAuthenticated().user.id}/${5}`, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        SetTableValue(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    HOTableData();
  }, []);
  return (
    <>
      <div className="ButtonTextWrapper">
        <div className="LOS">List of Head Offices</div>
      </div>
      {TableValue && (
        <div className="TableContainer" style={{}}>
          <TestTable columns={columns} datac={TableValue}/>
        </div>
      )}
    </>
  );
}
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Pagination&selectedStory=Custom%20Pagination%20with%20Search&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
              // for making the required type of table with custom pagination and search bar
              // and hooks to chnages: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Row%20Selection&selectedStory=Selection%20Hooks&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
              