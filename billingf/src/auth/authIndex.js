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
export const SignIn = async (user) => {
  const formData = new FormData();
  for (const name in user) {
    console.log(name,user[name])
    formData.append(name, user[name]);
  }
  try {
    const resp = await fetch(`${API}user/login/`, {
      method: "POST",
      body: formData,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data_1 = await resp.json();
    let m = await fetch(`${API}user/register/bill_info/getd/${data_1.user.id}`)
      .then((response) => {
        return response.json();
      })
      .then((data_2) => {
        return data_2;
      })
      .catch((err) => {
        console.log(err);
      });
    return await [data_1, m];
  } catch (err_1) {
    console.log(err_1);
  }
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
export const isAuthenticatedBilling = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("BillingData")) {
    return JSON.parse(localStorage.getItem("BillingData"));
  } else {
    return false;
  }
};

export default function SignOut(next) {
  const UserID = isAuthenticated() && isAuthenticated().user.id;

  if (typeof window !== undefined) {
    localStorage.removeItem("Data");
    localStorage.removeItem("BillingData")
    console.log("LOGOUT USER successful");

    return fetch(`${API}user/logout/${UserID}`, {
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => {
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
//When registeration is done by owner
if (user[0].role_id===3){
  // formDataUser.append("dist_ID_data", user[0].dist_ID_data);
  formDataUser.append("creator_id", user[0].creator_id);//current user id 
}
//When registeration is done by distribtuor
if (user[0].role_id===4){
  // formDataUser.append("dist_ID_data", user[0].dist_ID_data);
  formDataUser.append("owner_id_data",user[0].owner_id_data); // id of owner
  formDataUser.append("creator_id", user[0].creator_id);//current user id 
}
  //When registeration is done by Sales
  if (user[0].role_id===5){
    formDataUser.append("dist_ID_data", user[0].dist_ID_data);
    formDataUser.append("owner_id_data",user[0].owner_id_data);
    formDataUser.append("creator_id", user[0].creator_id);//current user id 
  }
  //When registering is done by Head Office
  if (user[0].role_id===6){
    formDataUser.append("dist_ID_data", user[0].dist_ID_data);//dist id for branch
    formDataUser.append("sales_ID_data",user[0].sales_ID_data);// sales id for branch 
    formDataUser.append("owner_id_data",user[0].owner_id_data);
    formDataUser.append("creator_id", user[0].creator_id);//current user id 
  }


  formDataUser.append("email", user[0].email);
  formDataUser.append("password", user[0].password);
  formDataUser.append("password2", user[0].password2);
  formDataUser.append("user_name", user[0].username);
  formDataUser.append("first_name", user[0].first_name);
  formDataUser.append("role_id", user[0].role_id);
  formDataUser.append("role_id_of_creator", user[0].role_id_of_creator);
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
export async function UpdateMadeUserRq(user){
  const formDataUser = new FormData();
  const formDataBill = new FormData();

  formDataUser.append("password",user.password)
  formDataUser.append("first_name",user.first_name)
  formDataUser.append("user_name",user.user_name)
  formDataUser.append("role_id",user.role_id)
  formDataUser.append("email",user.email)
  formDataUser.append("role_id",user.role_id)

  formDataBill.append("user_id",user.id)
  formDataBill.append("landlineNUM",user.bill_manage_info__landlineNUM)
  formDataBill.append("system_credit",user.bill_manage_info__system_credit );
  formDataBill.append("system_debit",user.bill_manage_info__system_debit);
  formDataBill.append("sms_credit",user.bill_manage_info__sms_credit );
  formDataBill.append("sms_debit",user.bill_manage_info__sms_debit );
  formDataBill.append("whatsapp_credit",user.bill_manage_info__whatsapp_credit );
  formDataBill.append("whatsapp_debit",user.bill_manage_info__whatsapp_debit );
  formDataBill.append("stateCode",user.bill_manage_info__stateCode);
  formDataBill.append("gstNum",user.bill_manage_info__gstNum);
  formDataBill.append("pan_card",user.bill_manage_info__pan_card);
  formDataBill.append("kyc",user.bill_manage_info__kyc);
  formDataBill.append("reason",user.bill_manage_info__reason );
  formDataBill.append("actual_billQty",user.bill_manage_info__actual_billQty); // pass values as they won't have any effect on backend just need to be there reomve or append as per convinece and code.
  formDataBill.append("edit_status",user.bill_manage_info__edit_status);
  formDataBill.append("reg_dealer_type",user.bill_manage_info__reg_dealer_type);
  formDataBill.append("pin_code",user.bill_manage_info__pin_code);
  formDataBill.append("status_type",user.bill_manage_info__status_type);
  formDataBill.append("cin_number",user.bill_manage_info__cin_number);
  formDataBill.append("shortname",user.bill_manage_info__shortname);
  formDataBill.append("is_regdealer",user.bill_manage_info__is_regdealer);


  try {
    const resp = await fetch(`${API}user/update/${user.id}`, {
      method: "PUT",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data = await resp.json();
    let m = await fetch(`${API}user/update/Bill/${user.id}`, {
      method: "PUT",
      body: formDataBill,
      headers: { Authorization: null },
      withCredentials: true,
    })
      .then((response) => {
        return response.json();
      })
      .then((data_1) => {
        return data_1;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return true;
  }catch (err_1) {
    console.log(err_1);
  }

}
export async function UpdateRY(user){
  const formDataUser = new FormData();

  formDataUser.append("password",user.password)
  formDataUser.append("first_name",user.first_name)
  // formDataUser.append("user_name",user.user_name)
  formDataUser.append("email",user.email)
  formDataUser.append("role_id",user.role_id)
  formDataUser.append("renew_year",user.renew_year)
  console.log(user)
  try {
    const resp = await fetch(`${API}user/update/${user.id}`, {
      method: "PUT",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    return resp.json();
  }catch (err_1) {
    console.log(err_1);
  }

}
export async function UpdateUser(user,bill){

  const formDataUser = new FormData();
  const formDataBill = new FormData();

  formDataUser.append("password",user.password)
  formDataUser.append("first_name",user.first_name)
  formDataUser.append("user_name",user.user_name)
  formDataUser.append("role_id",user.role_id)
  formDataUser.append("email",user.email)

  formDataBill.append("landlineNUM",bill.landlineNUM)
  formDataBill.append("system_credit",bill.system_credit );
  formDataBill.append("sms_credit",bill.sms_credit );
  formDataBill.append("whatsapp_credit",bill.whatsapp_credit );
  formDataBill.append("stateCode",bill.stateCode);
  formDataBill.append("gstNum",bill.gstNum);
  formDataBill.append("pan_card",bill.pan_card);
  formDataBill.append("kyc",bill.kyc);
  formDataBill.append("reason",bill.reason );
  formDataBill.append("actual_billQty",bill.actual_billQty); // pass values as they won't have any effect on backend just need to be there reomve or append as per convinece and code.
  formDataBill.append("edit_status",bill.edit_status);
  formDataBill.append("reg_dealer_type",bill.reg_dealer_type);
  formDataBill.append("pin_code",bill.pin_code);
  formDataBill.append("status_type",bill.status_type);
  formDataBill.append("cin_number",bill.cin_number);
  formDataBill.append("shortname",bill.shortname);
  formDataBill.append("is_regdealer",bill.is_regdealer);


  try {
    const resp = await fetch(`${API}user/update/${user.id}`, {
      method: "PUT",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data = await resp.json();
    formDataBill.append("user_id", data);
    let m = await fetch(`${API}user/update/Bill/${data}`, {
      method: "PUT",
      body: formDataBill,
      headers: { Authorization: null },
      withCredentials: true,
    })
      .then((response) => {
        return response.json();
      })
      .then((data_1) => {
        return data_1;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return true;
  } catch (err_1) {
    console.log(err_1);
  }
}

export function JdateGet(JD){
  return new Date(JSON.stringify(JD).slice(0, 11).split("-", 3).join("-")).toLocaleDateString("en-IN")
}
export function getExpiry(dt, rnyr) {
  const Jdate = new Date(
    JSON.stringify(dt).slice(0, 11).split("-", 3).join("-")
  );
  const Edate = new Date(
    Jdate.getFullYear() + rnyr,
    Jdate.getMonth(),
    Jdate.getDate()
  );

  return Edate.toLocaleDateString("en-IN");
}

export async function AddBankHO(user){
  const formDataUser = new FormData();
  formDataUser.append("user_id",user.user_id)
  formDataUser.append("bank_name",user.bank_name)
  formDataUser.append("account_num",user.account_num)
  formDataUser.append("ifsc_code",user.ifsc_code)
  formDataUser.append("Branch",user.Branch)
  formDataUser.append("StateCode",user.StateCode)
  formDataUser.append("gstNumber",user.gstNumber)
  formDataUser.append("account_type",user.account_type)
  formDataUser.append("open_balance",user.open_balance)
  formDataUser.append("Primary_type",user.Primary_type)

  try {
    const response = await fetch(`${API}bill/bank/HO/addbank/${user.user_id}`, {
      method: "POST",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data_1 = await response.json();
    return data_1;
  } catch (err) {
    console.log(err);
  }
}