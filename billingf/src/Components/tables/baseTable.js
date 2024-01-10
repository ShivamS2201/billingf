import React from 'react';
import TableComponent from './Tablecomponent';
const TestTable = ({datac}) => {
  const columns = [
    {
        name: 'email',
        selector: row => row.email,
    },
    {
        name: 'Is Active',
        selector: row => row.is_active,
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
 return (<>
    {JSON.stringify(datac)}
    <TableComponent columns={columns} datac={datac} />
    </>);
};

export default TestTable;