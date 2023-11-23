import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import React, { useEffect, useState } from "react"
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

function Hourslist (){
  // State variables to handle working hours data, snackbar visibility, and messages
  const [workingHours, setWorkingHours] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState([]);

  // Function to fetch working hours data from the server
  const fetchWorkingHours = () => {
    fetch('/api/userdetails', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.workingHours && Array.isArray(data.workingHours)) {
        setWorkingHours(data.workingHours);
      }
    })
    .catch((err) => console.log(err));
  };
  
  // Fetch working hours data on component mount
  useEffect(() => {
    fetchWorkingHours();
  }, []);

  // Function to handle delete action on a specific working hour entry
  const handleDelete = (id) => {
    if (window.confirm('Confirm delete')) {
      fetch(`/api/delete/${id}`, {
        method: 'GET'
      })
      .then(response => {
        if (response.ok) {
          setMsg("Entry deleted successfully");
          setOpen(true);
          fetchWorkingHours(); // Fetch updated data after deletion
        } else {
          setMsg("Failed to delete entry");
          setOpen(true);
        }
      })
      .catch(err => {
        console.error(err);
        setMsg("An error occurred");
        setOpen(true);
      });
    }
  };

  // Define column configurations for the grid
  const[columnDefs] = useState([
    {field: "startTime", sortable: true, filter: true, flex: 1 },
    {field: "endTime", sortable: true, filter: true, flex: 1 },
    {field: "id", headerName: "Delete", sortable: true, filter: true, flex: 1,
    // Define a cell renderer to create a delete button in each row
    cellRenderer: (params) => {
      return (
        <Button startIcon={<DeleteIcon />} size="small" color="error" onClick={() => handleDelete(params.data.id)}>Delete</Button>
      );
    }
  },
]);

// Render the AgGridReact component with the specified configurations and data
return(
  <div className="ag-theme-material"
    style={{ height: 600, width: "90%", margin: "3%" }}>

    <AgGridReact
      pagination={true}
      paginationPageSize={10}
      rowData={workingHours}
      columnDefs={columnDefs}>
    </AgGridReact>
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={() => setOpen(false)}
      message={msg}
    />
  </div>
)
}

export default Hourslist;
