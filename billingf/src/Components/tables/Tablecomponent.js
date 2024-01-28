import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import {Button} from 'react-bootstrap'
import differenceBy from 'lodash/differenceBy';
import { updateActiveStatus } from '../../auth/authIndex';
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
		const handleActivate = () => {
			if (window.confirm(`Do you want to activate selected Distrib:\r ${selectedRows.map(r => r.title)}?`)) {
				setToggleCleared(!toggleCleared);
				console.log(selectedRows)
				updateActiveStatus(selectedRows,true);
				selectedRows.map((item)=>{
					item["is_active"]=true;
				})
				setData(differenceBy(data, selectedRows, 'id'));
			}
		};
		const handleDeactivate = () => {
			if (window.confirm(`Do you want to deactivate selected Distrib:\r ${selectedRows.map(r => r.title)}?`)) {
				setToggleCleared(!toggleCleared);
				console.log(selectedRows)
				updateActiveStatus(selectedRows,false);
				selectedRows.map((item)=>{
					item["is_active"]=false;
				})
				setData(differenceBy(data, selectedRows, 'id'));
			}
		};

		return (<span>
			<Button key="isActive" onClick={handleActivate} style={{ border:"0",backgroundColor: 'rgba(11, 176, 92, 0.9)',padding:'5px',fontSize:'70%',margin:'0 8px 0 0' }} >
				Activate
			</Button>

			<Button key="Renew Year" onClick={handleDeactivate} style={{ border:"0",backgroundColor: 'rgb(125, 132, 138)',padding:'5px',fontSize:'70%',margin:'0 8px 0 0'}} >
			Deactivate
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