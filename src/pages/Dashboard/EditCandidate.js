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
import { InputAdornment, TextField } from "@mui/material"
import Swal from 'sweetalert2';
import { Person } from '@mui/icons-material';
import { Book } from '@mui/icons-material';
// import { useParams, useSearchParams } from 'react-router-dom';
import { getUser, removeUserSession } from '../../admin/Common';



// export default class Candidates extends React.Component{

export const EditCandidate = ({ match, location }) => {
  const user = getUser();
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/admin_login');
  }

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
  // const [formNumber, setFormNumber] = useState("")
  const [batch, setBatch] = useState("")
  const [firstName, setFirstname] = useState("")
  const [student, setStudent] = useState(null)
  // const [settings, setSettings] = useState()

  useEffect(() => {
    fetchStudent(rgNumber)
  }, [])

  const fetchStudent = async () => {
    console.log(`/students/${rgNumber}`)
    await BackendAPI.get(`/students/${rgNumber}`).then(({ data }) => {
      setStudent(data)
      console.log(data);
    })
  }

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PUT');
    formData.append('batch', student?.batch)
    formData.append('firstName', student?.firstName)


    await BackendAPI.post(`/students/${rgNumber}`, formData).then(({ data }) => {

      Swal.fire({
        icon: "success",
        text: data.message
      })

      // navigate("/")
    }).catch(({ response }) => {
      if (response.status === 422) {
        setValidationError(response.data.errors)
      } else {
        Swal.fire({
          text: response.data.message,
          icon: "error"
        })
      }
    })
  }
  const handleStudentFieldChange = event => {
    return setStudent(prevState => ({
      [event.target.name]: event.target.value
    }))
  }

  return <DashboardLayout>
    <div style={{ width: '50%' }}>
      <h2>Hi {user.name}! <Button variant='contained' color='primary' onClick={handleLogout}>Logout</Button></h2>
      <DashboardTitle title="Edit Candidate" />
      {/* <TextField
        label="First name"
        variant="outlined"
        fullWidth
        name='firstName'
        placeholder={"First Name"}
        value={student?.firstName}
        sx={{ my: 3, mx: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          )
        }}
        onChange={handleStudentFieldChange}
      />
      <TextField
        label="Lastname"
        variant="outlined"
        fullWidth
        placeholder={"Last Name"}
        value={student?.lastName}
        sx={{ my: 3, mx: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          )
        }}
        onChange={handleStudentFieldChange}
      />
      <br />

      <TextField
        label="Othernames"
        variant="outlined"
        fullWidth
        placeholder={"Othernames"}
        value={student?.otherNames}
        sx={{ my: 3, mx: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          )
        }}
        onChange={handleStudentFieldChange}
      />
      <br /> */}

      <TextField
        label="Batch"
        variant="outlined"
        fullWidth
        name='batch'
        placeholder={"Batch"}
        value={student?.batch}
        sx={{ my: 3, mx: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Book />
            </InputAdornment>
          )
        }}
        onChange={handleStudentFieldChange}
      />
      <br />

      <Button variant="contained" color='secondary' onClick={updateProduct}>Submit</Button>
      <br />
    </div>
  </DashboardLayout>
}
