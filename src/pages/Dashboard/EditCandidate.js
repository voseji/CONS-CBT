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
import Swal from 'sweetalert2';

// import { useParams, useSearchParams } from 'react-router-dom';



// export default class Candidates extends React.Component{

export const EditCandidate = ({ match, location }) => {
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
    formData.append('batch', batch)



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
    <div>
      <DashboardTitle title="Edit Candidate" />
      <InputLabel>First Name</InputLabel>
      <br />
      <Input
        variant='outlined'
        name='firstName'
        placeholder={"First Name"}
        value={student?.firstName}
      />
      <br />

      <br />
      <InputLabel>Lastname</InputLabel>
      <br />
      <Input
        variant='outlined'
        name='firstName'
        placeholder={"First Name"}
        value={student?.lastName}
      />
      <br />

      <br />
      <InputLabel>Othernames</InputLabel>
      <br />
      <Input
        variant='outlined'
        name='firstName'
        placeholder={"First Name"}
        value={student?.otherNames}
      />
      <br />

      <br />

      <br />
      <InputLabel>Batch</InputLabel>
      <br />
      <Input
        variant='outlined'
        name='batch'
        placeholder={"Batch"}
        value={student?.batch}
        onChange={handleStudentFieldChange}
      /><br />
      <br />
      <Button variant="contained" color='secondary' onClick={updateProduct}>Submit</Button>
      <br />
    </div>
  </DashboardLayout>
}
