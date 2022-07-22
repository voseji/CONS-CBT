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

    { label: "Registration Number", name: "registrationNumber" },
    { label: "Candidate Name", name: "formNumber" },
    { label: "Form Number", name: "formNumber" },
    { label: "Phone Number", name: "phoneNumber1" },
    { label: "State Of Origin", name: "stateOfOrigin" },
    { label: "Score", name: "batch" },

 

  ];



// export default class Candidates extends React.Component{

  export const Results = () =>{
    // render(){

      const [allregdetails, setAllRegDetails] = useState([])
  useEffect(()=>{
    fetchAllRegDetails()
    },[])
  const fetchAllRegDetails = async () => {
    await BackendAPI.get(`/students`).then(({data})=>{
      // setFacilityType1(data?.data)
      setAllRegDetails(data)
      console.log(data);
    })
    }

        return <DashboardLayout>
            <div>
                <DashboardTitle title="Candidate Results" />
                <MUIDataTable 
              columns={columns}
              data={allregdetails.map((registration, index) => [
                // index +1, 
                // registration.createdAt,
                registration.registrationNumber,
                registration.firstName + ' ' + registration.lastName + ' ' + registration.otherNames,
                registration.formNumber,
                registration.phoneNumber1,
                registration.stateOfOrigin,
                registration.batch,
                registration.registrationNumber,
           
              ])}
             />
            </div>
        </DashboardLayout>
    }
// }