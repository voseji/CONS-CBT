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

const columns = [

    { label: "eID", name: "eID" },
    { label: "KIV", name: "KIV" },
    { label: "Rgistration Number", name: "registrationNumber" },
    { label: "Facility Name", name: "facilityName" },
    { label: "Facility Type", name: "facilityType" },
//     { label: "Action", name: "", options: {customBodyRender: (eID) => {
//       return <Icon color="primary"
//       component={Link}
//       to={{pathname: `/dps/registration/print?eID=${eID}`, data:allregdetails}}
//       >print</Icon>
//  }} },
 

  ];


  // const [allregdetails, setAllRegDetails] = useState([])
  // useEffect(()=>{
  //   fetchAllRegDetails()
  //   },[])
  // const fetchAllRegDetails = async () => {
  //   await BackendAPI.get(`/students`).then(({data})=>{
  //     // setFacilityType1(data?.data)
  //     setAllRegDetails(data)
  //     console.log(data);
  //   })
  //   }
export default class Candidates extends React.Component{


    render(){

        return <DashboardLayout>
            <div>
                <DashboardTitle title="Dashboard" />
                {/* <MUIDataTable 
              columns={columns}
              data={allregdetails.map((registration, index) => [
                // index +1, 
                registration.createdAt,
                registration.eID,
                registration.KIV,
                registration.registrationNumber,
                registration.facilityName,
                registration.facility_type.facilityType,
                registration.eID,
           
              ])}
             /> */}
            </div>
        </DashboardLayout>
    }
}