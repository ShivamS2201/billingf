import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./css/distributor.css";

const Distributor = () => {
  const [bstate, setbstate] = useState();
  const [states, setstates] = useState({
    distributor:true,
    profile: false,
    sales: false,
    Hoffice: false,
    Branch: false,
  });
  useEffect(() => {
    setbstate("beforeSelect");
  }, [states]);
  function DistributorClick() {
    return states.distributor && <>Distributor</>;
  }
  function ProfileClick() { // Profile update form comes here.
    return states.profile && <>Profile</>;
  }
  function SalesClick() {
    return states.sales && <>Sales Table</>;
  }
  function HofficeClick() {
    return states.Hoffice && <>Head Office Table</>;
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
                  className={states.distributor && bstate}
                  onClick={(bstate) => {
                    setstates({
                        distributor:true,
                      profile: false,
                      sales: false,
                      Hoffice: false,
                      Branch: false,
                    });
                    setbstate((bstate) =>
                      bstate === "beforeSelect" ? "afterSelect" : "beforeSelect"
                    );
                  }}
                >
                  Distributor
                </button>
                <button
                  className={states.profile && bstate}
                  onClick={(bstate) => {
                    setstates({
                      profile: true,
                      sales: false,
                      Hoffice: false,
                      Branch: false,
                    });
                    setbstate((bstate) =>
                      bstate === "beforeSelect" ? "afterSelect" : "beforeSelect"
                    );
                  }}
                >
                  Profile
                </button>
                <button
                  className={states.sales && bstate}
                  onClick={(bstate) => {
                    setstates({
                      sales: true,
                      profile: false,
                      Hoffice: false,
                      Branch: false,
                    });
                    setbstate((bstate) =>
                      bstate === "beforeSelect" ? "afterSelect" : "beforeSelect"
                    );

                  }}
                >
                  Sales
                </button>
                <button
                  className={states.Hoffice && bstate}
                  onClick={(bstate) => {
                    setstates({
                      Hoffice: true,
                      profile: false,
                      sales: false,
                      Branch: false,
                    });
                    setbstate((bstate) =>
                      bstate === "beforeSelect" ? "afterSelect" : "beforeSelect"
                    );

                  }}
                >
                  Head Office
                </button>
                <button
                  className={states.Branch && bstate}
                  onClick={(bstate) => {
                    setstates({
                      Branch: true,
                      profile: false,
                      sales: false,
                      Hoffice: false,
                    });
                    setbstate((bstate) =>
                      bstate === "beforeSelect" ? "afterSelect" : "beforeSelect"
                    );
                  }}
                >
                  Branch
                </button>
              </div>
            </div>
           { states.profile && <>
            PROFILE COmes here
            </>}
            <div className="cardconatiner" style={{display:(states.profile?"none":"")}}>
        <div className='CardGrid'>
          < div className='card card1'>
           <i class="bi bi-person" style={{fontSize:"23px"}}></i> Sales
          </div>
          < div className='card card2'>
            SYSTEM
            SMS 
            Whatsup
          </div>
          < div className='card card3'>
            Head Offices
          </div>
          < div className='card card4'>
            Branhces
          </div>
      </div></div>
          </div>
        </div>
        <div className="tablewrapper">
          Table
          <DistributorClick />
          <ProfileClick />
          <SalesClick />
          <HofficeClick />
          <BranchClick />
        </div>
      </div>
    </>
  );
};

export default Distributor;
