import { API } from "../backend";
import { useState } from "react";

export const GetRole = (roleID) => {
  const role = {
    owner: false,
    distributor: false,
    sales: false,
    headOffice: false,
    Branch: false,
    Cust: false,
  };
  if (roleID == "2") {
    return { ...role, owner: true };
  } else if (roleID == "3") {
    return { ...role, distributor: true };
  } else if (roleID == "4") {
    return { ...role, sales: true };
  } else if (roleID == "5") {
    return { ...role, headOffice: true };
  } else if (roleID == "6") {
    return { ...role, Branch: true };
  } else if (roleID == "7") {
    return { ...role, Cust: true };
  }
};
export const SignIn = (user) => {
  const formData = new FormData();
  for (const name in user) {
    formData.append(name, user[name]);
  }
  console.log(formData.values("email"));
  return fetch(`${API}user/login/`, {
    method: "POST",
    body: formData,
    headers: { Authorization: null },
    withCredentials: true,
  })
    .then((resp) => {
      return resp.json();
    })
    .then(async (data) => {
      console.log(data.user.id);
      let m = await fetch(`${API}user/register/bill_info/getd/${data.user.id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });

      return [data, m];
    })
    .catch((err) => {
      console.log(err);
    });
}; // Returns a token to sign in the user and calls for user info and bill info, which is later used to do multiple tasks,like:
// Add sales, show Number in credits and debits.

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("Data", JSON.stringify(data[0]));
    localStorage.setItem("BillingData", JSON.stringify(data[1][0]));

    next();
  }
}; // returns current user details from user table

export const GetBillingInfo = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("BillingData")) {
    return JSON.parse(localStorage.getItem("BillingData"));
  } else {
    return false;
  }
}; // returns billing info for a signed in user from bill info table.

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("Data")) {
    return JSON.parse(localStorage.getItem("Data"));
  } else {
    return false;
  }
};

export default function SignOut(next) {
  const UserID = isAuthenticated() && isAuthenticated().user.id;

  if (typeof window !== undefined) {
    localStorage.removeItem("Data");
    console.log("LOGOUT USER successful");

    return fetch(`${API}user/logout/${UserID}`, {
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => {
        console.log("SIGNOUT/ Nikalo");
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function RegisterUser(...user) {
  const formDataUser = new FormData();
  const formDataBilling = new FormData();
  // User registeration data as form body

  //When registeration is done by Sales
  if (user[0].role_id===5){
    formDataUser.append("dist_ID_data", user[0].dist_ID_data);
    console.log("user is sales creating HOffice")
  }
  //When registering is done by Head Office
  if (user[0].role_id===6){
    formDataUser.append("dist_ID_data", user[0].dist_ID_data);//dist id for branch
    console.log("user is sales creating HOffice");
    formDataUser.append("sales_ID_data",user[0].sales_ID_data);// sales id for branch 
  }


  formDataUser.append("email", user[0].email);
  formDataUser.append("password", user[0].password);
  formDataUser.append("password2", user[0].password2);
  formDataUser.append("user_name", user[0].username);
  formDataUser.append("first_name", user[0].first_name);
  formDataUser.append("role_id", user[0].role_id);
  formDataUser.append("role_id_of_creator", user[0].role_id_of_creator);
  formDataUser.append("creator_id", user[0].creator_id);//current user id 
  //Billing INfo data as body
  formDataBilling.append("system_credit",user[0].system_credit );
  formDataBilling.append("sms_credit",user[0].sms_credit );
  formDataBilling.append("whatsapp_credit",user[0].whatsapp_credit );
  formDataBilling.append("landlineNUM",user[0].phone);
  formDataBilling.append( "stateCode",user[0].state);
  formDataBilling.append("gstNum",user[0].GSTno);
  formDataBilling.append("pan_card",user[0].pancardNo );
  formDataBilling.append("kyc",user[0].KYC_no );
  // formDataBilling.append("address",); // There is no entry for address ask if he wants?
  formDataBilling.append("reason",user[0].reason );
  formDataBilling.append("actual_billQty","true");
  formDataBilling.append("edit_status","true");
  formDataBilling.append("reg_dealer_type","1");
  formDataBilling.append("pin_code","110085");
  formDataBilling.append("status_type","1");
  formDataBilling.append("cin_number","12");
  formDataBilling.append("shortname","Hey");
  formDataBilling.append("is_regdealer","true");

  return fetch(`${API}user/register`, {
    method: "POST",
    body: formDataUser,
    headers: { Authorization: null },
    withCredentials: true,
  })
    .then((resp) => {
      return resp.json();
    })
    .then(async (data) => {
      formDataBilling.append("user_id",data);
      let m = await fetch(`${API}user/register/bill_info/${data}`, {
        method: "POST",
        body: formDataBilling,
        headers: {
          Authorization: null },
        withCredentials: true,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
      return [data,true];
    })
    .catch((err) => {
      console.log(err);
    });
}
