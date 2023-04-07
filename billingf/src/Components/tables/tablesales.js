import React, { useEffect, useState } from "react";
import { API } from "../../backend";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory,{PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { Table } from "react-bootstrap";
 
require("react-bootstrap-table-next/dist/react-bootstrap-table2.min.css");

const columns = [
  {
      sort: true
,dataField: "first_name",
    text: "Name",
  },
  {
      sort: true
,dataField: "email",
    text: "Email ID",
  },
  {
      sort: true
,dataField: "bill_manage_info__landlineNUM",
    text: "Contact No.",
  },
  {
      sort: true
,dataField: 'bill_manage_info__sms_credit',
        text: 'SMS',
        formatter: (cell, row, rowIndex, extraData) => (
          <div>
            <span>{cell}({JSON.stringify(row["bill_manage_info__sms_debit"])})</span>
          </div>
        )
      },
      {
          sort: true
,dataField: 'bill_manage_info__system_credit',
            text: 'System',
            formatter: (cell, row, rowIndex, extraData) => (
              <div>
                <span>{cell}({JSON.stringify(row["bill_manage_info__system_debit"])})</span>
              </div>
            )
          },
          {
              sort: true
,dataField: 'bill_manage_info__whatsapp_credit',
                text: 'Whatsapp',
                formatter: (cell, row, rowIndex, extraData) => (
                  <div>
                    <span>{cell}({JSON.stringify(row["bill_manage_info__whatsapp_debit"])})</span>
                  </div>
                )
              },
              {
                  sort: true
,dataField: "joining_date",
                text: "Joining Date",
              },
];
export function SalesTable() {
  const [TableValue,SetTableValue] = useState();
  const SalesTableData = async () => {
    await fetch(`${API}user/register/salesdata/4/4`, {
      method: "GET",
    }).then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      SetTableValue(data);
    })
    .catch((err) => {
      console.log(err);
    })
    ;}
useEffect(()=>{
  SalesTableData();
},[])
const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing { from } to { to } of { size } Results
  </span>
);

const options = {
  
  paginationSize: 4,
  pageStartIndex: 0,
  // alwaysShowAllBtns: true, // Always show next and previous button
  // withFirstAndLast: false, // Hide the going to First and Last page button
  // hideSizePerPage: true, // Hide the sizePerPage dropdown always
  // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  firstPageText: 'First',
  prePageText: 'Back',
  nextPageText: 'Next',
  lastPageText: 'Last',
  nextPageTitle: 'First page',
  prePageTitle: 'Pre page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
  showTotal: true,
  paginationTotalRenderer: customTotal,
  disablePageTitle: true,
  sizePerPageList: [{
    text: '5', value: 5
  }, {
    text: '10', value: 10
  }, {
    text: 'All', value: TableValue?TableValue.length:0
  }] // A numeric array is also available. the purpose of above example is custom the text
};
    return (
      TableValue&&<>
        Sales Table
        <div>
          <PaginationListStandalone />
          <BootstrapTable bootstrap4 keyField="id" data={TableValue} columns={columns} pagination={ paginationFactory(options) }/>
        </div>
      </>
    );
  };

