import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Typography } from '@material-ui/core';
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
import Select from 'react-select';

const columns = [

    { label: "Application Number", name: "registrationNumber" },
    { label: "Candidate Name", name: "formNumber" },
    { label: "Form Number", name: "formNumber" },
    { label: "Phone Number", name: "phoneNumber1" },
    { label: "State Of Origin", name: "stateOfOrigin" },
    { label: "Score", name: "batch" },
  ];

  const batch = [

    { label: "1A", name: "1A" },
    { label: "1B", name: "1B" },
    { label: "1C", name: "1C" },
    { label: "1D", name: "1D" },
    { label: "2A", name: "2A" },
    { label: "2B", name: "2B" },
  ];

  const sor = [
    { value: 'ABIA', label: 'ABIA' },
    { value: 'ADAMAWA', label: 'ADAMAWA' },
    { value: 'AKWA-IBOM', label: 'AKWA-IBOM' },
    { value: 'ADAMAWA', label: 'ADAMAWA' },
    { value: 'ANAMBRA', label: 'ANAMBRA' },
    { value: 'BAUCHI', label: 'BAUCHI' },
    { value: 'BAYELSA', label: 'BAYELSA' },
    { value: 'BENUE', label: 'BENUE' },
    { value: 'BORNO', label: 'BORNO' },
    { value: 'CROSS-RIVER', label: 'CROSS-RIVER' },
    { value: 'DELTA', label: 'DELTA' },
    { value: 'EBONYI', label: 'EBONYI' },
    { value: 'EDO', label: 'EDO' },
    { value: 'EKITI', label: 'EKITI' },
    { value: 'FCT', label: 'FCT' },
    { value: 'GOMBE', label: 'GOMBE' },
    { value: 'IMO', label: 'IMO' },
    { value: 'JIGAWA', label: 'JIGAWA' },
    { value: 'KADUNA', label: 'KADUNA' },
    { value: 'KANO', label: 'KANO' },
    { value: 'KATSINA', label: 'KATSINA' },
    { value: 'KEBBI', label: 'KEBBI' },
    { value: 'KOGI', label: 'KOGI' },
    { value: 'KWARA', label: 'KWARA' },
    { value: 'LAGOS', label: 'LAGOS' },
    { value: 'NASARAWA', label: 'NASARAWA' },
    { value: 'NIGER', label: 'NIGER' },
    { value: 'OGUN', label: 'OGUN' },
    { value: 'ONDO', label: 'ONDO' },
    { value: 'OSUN', label: 'OSUN' },
    { value: 'OYO', label: 'OYO' },
    { value: 'PLATEAU', label: 'PLATEAU' },
    { value: 'RIVERS', label: 'RIVERS' },
    { value: 'SOKOTO', label: 'SOKOTO' },
    { value: 'TARABA', label: 'TARABA' },
    { value: 'YOBE', label: 'YOBE' },
    { value: 'ZAMFARA', label: 'ZAMFARA' },
  ];

// export default class Candidates extends React.Component{

  export const Results = () =>{
    // render(){
      const [selectedOption, setSelectedOption] = useState(null);

      const [allregdetails, setAllRegDetails] = useState([])
  useEffect(()=>{
    fetchAllRegDetails()
    },[])
  const fetchAllRegDetails = async () => {
    await BackendAPI.get(`/student/result2`).then(({data})=>{
      // setFacilityType1(data?.data)
      setAllRegDetails(data)
      console.log(data);
    })
    }

        return <DashboardLayout>
          
            <div>
                <DashboardTitle title="Candidate Results" />
                <div style={{width: '300px'}}>
                <Select
                styles={{position: 'albsolute', zIndex: '5000'}}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={sor}
        placeholder='Filter by State'
      /><br/></div>

<div style={{width: '300px'}}>
                <Select
                styles={{position: 'albsolute', zIndex: '-5000'}}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={batch}
        placeholder='Filter by Batch'
      /><br/></div>

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
                registration.total_score,
                // registration.registrationNumber,
           
              ])}
             />
            </div>
        </DashboardLayout>
    }
// }