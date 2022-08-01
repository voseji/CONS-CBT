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
import { getUser, removeUserSession } from '../../admin/Common';

const columns = [

  { label: "Application Number", name: "registrationNumber" },
  { label: "Candidate Name", name: "formNumber" },
  { label: "Form Number", name: "formNumber" },
  { label: "Phone Number", name: "phoneNumber1" },
  { label: "State Of Origin", name: "stateOfOrigin" },
  { label: "Batch", name: "batch" },
  { label: "Status", name: "Status" },
  { label: "Time Left", name: "timeleft" },
  {
    label: "Action", name: "", options: {
      customBodyRender: (registrationNumber) => {
        return <Link to={`/edit_candidate?registrationNumber=${registrationNumber}`}>Edit/Rebatch</Link>
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

export const Candidates = (props) => {
  // render(){
  const user = getUser();
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/admin_login');
  }
  const [allregdetails, setAllRegDetails] = useState([])
  useEffect(() => {
    fetchAllRegDetails()
  }, [])
  const fetchAllRegDetails = async () => {
    await BackendAPI.get(`/students`).then(({ data }) => {
      // setFacilityType1(data?.data)
      setAllRegDetails(data)
      console.log(data);
    })
  }

  return <DashboardLayout>
    <div>
      <h2>Hi {user.name}! <Button variant='contained' color='primary' onClick={handleLogout}>Logout</Button></h2>
      <DashboardTitle title="Candidates" />
      <MUIDataTable
        columns={columns}
        data={allregdetails.map((registration, index) => [
          // index +1, 
          // registration.createdAt,
          registration.registrationNumber,
          registration.firstName + ' ' + registration.lastName + ' ' + (registration.otherNames ?? ''),
          registration.formNumber,
          registration.phoneNumber1,
          registration.stateOfOrigin,
          registration.batch,
          registration.exam_status,
          remainingTime(registration.time_left),
          registration.registrationNumber,

        ])}

        options={{ selectableRows: 'none', elevation: 0 }}
      />
    </div>
  </DashboardLayout>
}
// }