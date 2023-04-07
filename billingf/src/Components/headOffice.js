import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, Navigate, NavLink } from "react-router-dom";
import { isAuthenticated } from "../auth/authIndex";
import "./css/distributor.css";
import { API } from "../backend";
// Before making add branch remeber to change role id values elese user won't be created
const HeadOfficeComponent = () => {
  const [dataholder, changeDataholder] = useState([8]);
  const [states, setstates] = useState({
    profile: false,
    Hoffice: true,
    Branch: false,
  });
  const dataFetch = async () => {
    return await fetch(
      `${API}user/register/bill_info/getd/${isAuthenticated().user.id}`,
      { method: "GET" }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        changeDataholder(data[0]);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    // set state when the data received
  };
  useEffect(() => {
    dataFetch();
    // fetch data
  }, []);

  function ProfileClick() {
    // Profile update form comes here.
    return states.profile && <>Profile</>;
  }
  function HofficeClick() {
    return states.Hoffice && <>Sales Table
    <div>
    <Link to="/user/dashboard/register/addBranch">
      <button>
       Add Branch</button></Link>
    </div>
    </>;
  }
  function BranchClick() {
    return states.Branch && <>Branch Table</>;
  }
  return (
    <>
      <div className="distributorWrapper">
        <div className="buttoncontentwrapper">
          <div className="flexContainer">
            <div className="buttoncontainer">
              <div className="buttonwrapper">
                <button
                  style={{
                    backgroundColor: states.profile ? "#2f3192" : "",
                    color: states.profile ? "white" : "",
                    borderLeft: states.profile
                      ? "5px solid #2088cb"
                      : "",
                  }}
                  className="beforeSelect"
                  onClick={() => {
                    setstates({
                      profile: true,
                      Hoffice: false,
                      Branch: false,
                    });
                  }}
                >
                  Profile
                </button>
                <button
                  style={{
                    backgroundColor: states.Hoffice ? "#2f3192" : "",
                    color: states.Hoffice ? "white" : "",
                    borderLeft: states.Hoffice
                      ? "5px solid #2088cb"
                      : "",
                  }}
                  className="beforeSelect"
                  onClick={() => {
                    setstates({
                      Hoffice: true,
                      profile: false,
                      Branch: false,
                    });
                  }}
                >
                  Head Office
                </button>
                <button
                  style={{
                    backgroundColor: states.Branch ? "#2f3192" : "",
                    color: states.Branch ? "white" : "",
                    borderLeft: states.Branch
                      ? "5px solid #2088cb"
                      : "",
                  }}
                  className="beforeSelect"
                  onClick={() => {
                    setstates({
                      Branch: true,
                      profile: false,
                      Hoffice: false,
                    });
                  }}
                >
                  Branch
                </button>
              </div>
            </div>
            {states.profile && (
              <div className="profileWrapper">PROFILE Comes here</div>
            )}
            <div
              className="cardconatiner"
              style={{ display: states.profile ? "none" : "" }}
            >
              <div className="CardGrid">
                <div className="cards card1">
                  <div className="cardWrapper">
                    <div className="imgcontainer">
                      <i
                        className="bi bi-person"
                        style={{ fontSize: "3.8em" }}
                      ></i>
                    </div>
                    <div className="dataconatiner">
                      <div className="textholder">Sales</div>
                      <div className="dataholder">
                        {JSON.stringify(dataholder.sms_credit)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cards card2">
                  <div className="cardWrapper">
                    <div className="imgcontainer">
                      <i
                        className="bi bi-person"
                        style={{ fontSize: "3.8em" }}
                      ></i>
                    </div>
                    <div className="dataconatiner">
                      <div
                        className="dataconatinerMSG"
                        style={{ display: "flex" }}
                      >
                        <div className="textholdermsg">
                          SYSTEM ({JSON.stringify(dataholder.system_credit)})
                        </div>
                        <div className="dataholdermsg">
                          {JSON.stringify(dataholder.system_debit)}
                        </div>
                      </div>
                      <div
                        className="dataconatinerMSG"
                        style={{ display: "flex" }}
                      >
                        <div className="textholdermsg">
                          SMS ({JSON.stringify(dataholder.sms_credit)})
                        </div>
                        <div className="dataholdermsg">
                          {JSON.stringify(dataholder.sms_debit)}
                        </div>
                      </div>
                      <div
                        className="dataconatinerMSG"
                        style={{ display: "flex" }}
                      >
                        <div className="textholdermsg">
                          Whatsup ({JSON.stringify(dataholder.whatsapp_credit)})
                        </div>
                        <div className="dataholdermsg">
                          {JSON.stringify(dataholder.whatsapp_debit)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cards card3">
                  <div className="cardWrapper">
                    <div className="imgcontainer">
                      <i
                        className="bi bi-person"
                        style={{ fontSize: "3.8em" }}
                      ></i>
                    </div>
                    <div className="dataconatiner">
                      <div className="textholder">Head Office</div>
                      <div className="dataholder">{JSON.stringify(9)}</div>
                    </div>
                  </div>
                </div>
                <div className="cards card4">
                  <div className="cardWrapper">
                    <div className="imgcontainer">
                      <i
                        className="bi bi-person"
                        style={{ fontSize: "3.8em" }}
                      ></i>
                    </div>
                    <div className="dataconatiner">
                      <div className="textholder">Branch</div>
                      <div className="dataholder">{JSON.stringify(9)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tablewrapper">
          Table
          <ProfileClick />
          <HofficeClick />
          <BranchClick />
        </div>
      </div>
    </>
  );
};

export default HeadOfficeComponent;
