import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
// import React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import DashboardTitle from '../../Components/DashboardTitle/DashboardTitle';
import DashboardLayout from '../../Components/layout/DashboardLayout';
// import * as XLSX from 'xlsx';
import { BackendAPI } from '../../lib/api';
import MUIDataTable from "mui-datatables";
// import moment from 'moment'
import { Link} from 'react-router-dom';
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

export const EditCandidate = ({match, location}) =>{
  const params = new URLSearchParams(location.search);
  const rgNumber = params.get('registrationNumber');
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
  // const { registrationNumber } = match.params;
	const [student, setStudent] = useState(null)
	// const [settings, setSettings] = useState()

	useEffect(()=>{
			fetchStudent(rgNumber)
	},[])

	const fetchStudent = async () => {
    console.log(`/students/${rgNumber}`)
			await BackendAPI.get(`/students/${rgNumber}`).then(({data})=>{
					setStudent(data)
					console.log(data);
			})
	}  

        return <DashboardLayout>
            <div>
                <DashboardTitle title="Edit Candidate" />
                <InputLabel>First Name</InputLabel>
                
                           
            </div>
        </DashboardLayout>
    }
