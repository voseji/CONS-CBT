import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
// import React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import DashboardTitle from '../../Components/DashboardTitle/DashboardTitle';
import DashboardLayout from '../../Components/layout/DashboardLayout';
// import * as XLSX from 'xlsx';
import { BackendAPI } from '../../lib/api';
import MUIDataTable from "mui-datatables";
// import moment from 'moment'
import { Link } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import { remainingTime } from '../../lib/time.lib';
// import Button from '@material-ui/core/Button';

const columns = [

  { label: "Batch Name", name: "batch" },
  { label: "Day", name: "day" },
  { label: "Time", name: "time" },
  { label: "Status", name: "status" },
  {
    label: "Action", name: "", options: {
      customBodyRender: (batchId) => {
        return <Link to={`/edit_batch?batchId=${batchId}`}>Edit Batch</Link>
      }
    }
  },
];



// export default class Candidates extends React.Component{

export const Batches = () => {
  // render(){

  const [allregdetails, setAllRegDetails] = useState([])
  useEffect(() => {
    fetchAllRegDetails()
  }, [])
  const fetchAllRegDetails = async () => {
    await BackendAPI.get(`/batches`).then(({ data }) => {
      // setFacilityType1(data?.data)
      setAllRegDetails(data)
      console.log(data);
    })
  }

  return <DashboardLayout>
    <div>
      <DashboardTitle title="Batches" />
      <Link to="/create_batch">
        <Button variant="contained" color='secondary'>Create New Batch</Button>
      </Link>
      <MUIDataTable
        columns={columns}
        data={allregdetails.map((registration, index) => [
          // index +1, 
          // registration.createdAt,
          registration.batch,
          registration.day,
          registration.time,
          registration.status,
          registration.batchId,

        ])}

        options={{ selectableRows: 'none', elevation: 0 }}
      />
    </div>
  </DashboardLayout>
}
// }