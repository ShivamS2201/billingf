import { API } from "../backend";
import { useState } from "react";

export const GetRole = (roleID) => {
  const role = {'owner':false,'distributor': false,
  'sales':false,
  'headOffice':false,
  'Branch':false,
  'Cust':false
}
  if(roleID =="2"){
    return {...role,'owner':true}
  }
  else if (roleID =="3"){
   return {...role,'distributor':true}
  }
  else if(roleID =="4"){
    return {...role,'sales':true}
  }
  else if(roleID =="5"){
    return {...role,'headOffice':true}
  }
  else if (roleID =="6"){
    return {...role,'Branch':true}
  }
  else if (roleID =="7"){
    return {...role,'Cust':true}
  }
};
export const SignIn = (user) => {
  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
  }

  for (var key of formData.keys()) {
    console.log("keys", key);
  }
  return fetch(`${API}user/login/`, {
    method: "POST",
    body: formData,
    headers: { Authorization: null },
    withCredentials: true,
  })
    .then((resp) => {
      return resp.json();
    }).then(async (data)=>{
      console.log(data.user.id);
      let m = await fetch(`${API}user/register/bill_info/getd/${data.user.id}`).then((response)=>{
      return response.json()
      }).then((data)=>{
        return data  
        ;}).catch((err)=>{console.log(err)})

      return [data,m];
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
};// returns current user details from user table

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

export function RegisterUser(...user){
  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
  }

  for (var key of formData.keys()) {
    console.log("keys", key);
  }
  console.log(user);

}