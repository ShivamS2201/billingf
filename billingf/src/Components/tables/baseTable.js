import React from "react";
import TableComponent from "./Tablecomponent";

const TestTable = ({ columns,datac }) => {

  return (
    <>
      <TableComponent columns={columns} datac={datac} />
    </>
  );
};

export default TestTable;
