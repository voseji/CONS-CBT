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

  { label: "Subject", name: "subject" },
  { label: "", name: "" },

  {
    label: "Action", name: "", options: {
      customBodyRender: (id) => {
        return <Link to={`/questions?sid=${id}`}>View Questions</Link>
      }
    }
  },
];



// export default class Candidates extends React.Component{

export const Subjects = () => {
  // render(){

  const [allregdetails, setAllRegDetails] = useState([])
  useEffect(() => {
    fetchAllRegDetails()
  }, [])
  const fetchAllRegDetails = async () => {
    await BackendAPI.get(`/subjects`).then(({ data }) => {
      // setFacilityType1(data?.data)
      setAllRegDetails(data)
      console.log(data);
    })
  }

  return <DashboardLayout>
    <div>

      <Link to="/upload_questions">
        <Button variant="contained" color='secondary'>Upload Questions</Button>
      </Link>
      <DashboardTitle title="Subject (Questions)" />
      <MUIDataTable
        columns={columns}
        data={allregdetails.map((registration, index) => [
          // index +1, 
          // registration.createdAt,
          registration.subject,

          registration.question,

          registration.id,

        ])}

        options={{ selectableRows: 'none', elevation: 0 }}
      />
    </div>
  </DashboardLayout>
}
// }