import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import {Button} from 'react-bootstrap'
import differenceBy from 'lodash/differenceBy';

function TableComponent({ columns, datac }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [data, setData] = useState(datac);

  const [search, SetSearch]= useState('');
  const [filter, setFilter]= useState([]);

	const handleRowSelected = React.useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

	const contextActions = React.useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
				setToggleCleared(!toggleCleared);
				console.log("DELETED",data,selectedRows)
				setData(differenceBy(data, selectedRows, 'id'));
				console.log("DELETED",data,selectedRows)
			}
		};

		return (<span>
			<Button key="isActive" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
				Active
			</Button>

			<Button key="Renew Year" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
			Inactive
		</Button>
		</span>
		);
	}, [data, selectedRows, toggleCleared]);

	useEffect(()=>{
			const result= datac.filter((item)=>{
				console.log(item.first_name)
				return item.first_name.toLowerCase().match(search.toLocaleLowerCase()) || item.email.toLowerCase().match(search.toLocaleLowerCase()) || item.bill_manage_info__landlineNUM.toLowerCase().match(search.toLocaleLowerCase()) ;
			});
			setFilter(result);
    },[search]);

	const conditionalRowStyles = [
		{
			when: row => row["is_active"],
			style: {
				marginBottom:"0.6px",
				backgroundColor: 'rgb(11 176 92 / 0.9)',
				color: 'white',
				'&:hover': {
					cursor: 'pointer',
					content:"Inactive"	
				},
			},
		},
		{
			when: row => !row["is_active"],
			style: {
				marginBottom:"0.6px",
				backgroundColor: 'rgb(125 132 138)',
				color: 'rgb(90 82 82)',
				'&:hover': {
					cursor: 'pointer',
					content:"Inactive"
				},
			},
		},
		
	];
	return (
		data && 
		<DataTable
			title=" "
			columns={columns}
			data={filter}
			selectableRows
			conditionalRowStyles={conditionalRowStyles}
			contextActions={contextActions}
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
			pagination
			subHeader
			subHeaderComponent={
			   <input type="text"
			   className="w-25 form-control"
			   placeholder="Search..."
			   value={ search}
			   onChange={(e)=>SetSearch(e.target.value)}
			   
			   />
			}
			subHeaderAlign="right"
		/>
	);
}
 export default TableComponent
// A full table with sorting call to action on selection and csearch bar. Also has conditional rendering