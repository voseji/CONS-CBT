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
  { label: "Question", name: "question" },

  {
    label: "Action", name: "", options: {
      customBodyRender: (registrationNumber) => {
        return <Link to={`/edit_candidate?registrationNumber=${registrationNumber}`}>View Questions</Link>
      }
    }
  },
  //  { label: "Action", name: "", options: {customBodyRender: (registrationNumber) => {
  //   return <Icon color="primary"
  //   component={Link}
  //   to={{pathname: `/edit_candidate?registrationNumber=${registrationNumber}`}}
  //   >edit</Icon>
  // }} },


];



// export default class Candidates extends React.Component{

export const Questions = () => {
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
      <DashboardTitle title="Questions" />
      <Link to="/upload_questions">
        <Button variant="contained" color='secondary'>Upload Questions</Button>
      </Link>
      <MUIDataTable
        columns={columns}
        data={allregdetails.map((registration, index) => [
          // index +1, 
          // registration.createdAt,
          registration.subject,

          registration.question,

          registration.registrationNumber,

        ])}

        options={{ selectableRows: 'none', elevation: 0 }}
      />
    </div>
  </DashboardLayout>
}
// }