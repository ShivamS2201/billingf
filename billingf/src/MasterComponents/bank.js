import React from "react";
import Navb from "../Components/navbar";
import { SignoutNav } from "../UserView/singoutnav";
import { isAuthenticated } from "../auth/authIndex";
import "./css/bank.css"
export function MasterRoute() {
  return (
    <>
      <div className="name__top" style={{background:"#313493"}}>
        Welcome to Head Office {isAuthenticated().user.first_name}
      </div>

      <Navb component={<SignoutNav />} state={"headOffice"} />
      <div className="DashContainer">
        <div className="DashboardBar">
          <h3>Bank Master</h3>
        </div>
      </div>
      <div className="BankContainer">
        <div className="BCContainer">
        <div className="BCContainerbutt">
            <button>BANK</button>
            <button>CASH</button>
        </div>
        </div>
      </div>
    </>
  );
}
