import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
// import React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import DashboardTitle from '../../Components/DashboardTitle/DashboardTitle';
import DashboardLayout from '../../Components/layout/DashboardLayout';
// import * as XLSX from 'xlsx';
import { BackendAPI } from '../../lib/api';
import MUIDataTable from "mui-datatables";
// import moment from 'moment'
import { Link, useParams  } from 'react-router-dom';
import Icon from '@mui/material/Icon';
// import { useParams, useSearchParams } from 'react-router-dom';
const columns = [

  { label: "Application Number", name: "registrationNumber" },
  { label: "Candidate Name", name: "formNumber" },
  { label: "Form Number", name: "formNumber" },
  { label: "Phone Number", name: "phoneNumber1" },
  { label: "State Of Origin", name: "stateOfOrigin" },
  { label: "Batch", name: "batch" },
  { label: "Batch", name: "score" },


];



// export default class Candidates extends React.Component{

export const EditCandidate = () =>{
  // const { registrationNumber } = useParams();
	const [registration, setRegistration] = useState(null)

	// useEffect(()=>{
  //   fetchRegistration(registrationNumber)
	// },[])
  
  // const [searchParams, setSearchParams] =useSearchParams()
	// const fetchRegistration = async () => {
  //   await BackendAPI.get(`/student/${searchParams.get('registrationNumber')}`).then(({data})=>{
  //     setRegistration(data)
  //     console.log(data);
  //   })
	// }
  const { registrationNumber } = useParams();
	const [student, setStudent] = useState(null)
	// const [settings, setSettings] = useState()

	useEffect(()=>{
			fetchStudent(registrationNumber)
	},[])

	const fetchStudent = async () => {
			await BackendAPI.get(`/students/${registrationNumber}`).then(({data})=>{
					setStudent(data.data)
					console.log(data.data);
			})
	}  

        return <DashboardLayout>
            <div>
                <DashboardTitle title="Edit Candidate" />
                <InputLabel>First Name</InputLabel>
                
                           
            </div>
        </DashboardLayout>
    }
