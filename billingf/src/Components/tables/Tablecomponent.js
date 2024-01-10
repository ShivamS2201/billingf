import React, { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import {Button} from 'react-bootstrap'
import differenceBy from 'lodash/differenceBy';

function TableComponent({ columns, datac }) {
  const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	const [data, setData] = useState(datac);

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

		return (
			<Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
				Delete
			</Button>
		);
	}, [data, selectedRows, toggleCleared]);

	return (
		data && 
		<DataTable
			title="Desserts"
			columns={columns}
			data={data}
			selectableRows
			contextActions={contextActions}
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
			pagination
		/>
	);
}
 export default TableComponent
