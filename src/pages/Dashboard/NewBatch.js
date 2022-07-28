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



// export default class Candidates extends React.Component{

export const NewBatch = ({ match, location }) => {
  const [batch, setBatch] = useState("")
  const [day, setDay] = useState("")
  const [time, setTime] = useState("")

  const createBatch = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    // console.log(student)
    // formData.append('_method', 'PUT');
    formData.append('batch', batch)
    formData.append('day', day)
    formData.append('time', time)


    await BackendAPI.post(`/batches`, formData).then(({ data }) => {

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
  const handleBatchFieldChange = event => {
    return setStudent(prevState => ({
      [event.target.name]: event.target.value
    }))
  }
  return <DashboardLayout>
    <div style={{ width: '50%' }}>
      <DashboardTitle title="New Batch" />
      <TextField
        label="Batch name"
        variant="outlined"
        name="batch"
        fullWidth
        placeholder={"Batch Name"}
        value={batch}
        sx={{ my: 3, mx: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          )
        }}
        onChange={(event) => {
          setBatch(event.target.value)
        }}
      />
      <TextField
        label="Exam Day"
        variant="outlined"
        fullWidth
        name="day"
        placeholder={"Exam Day"}
        value={day}
        sx={{ my: 3, mx: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          )
        }}
        onChange={(event) => {
          setDay(event.target.value)
        }}
      />
      <br />

      <TextField
        label="Exam Time"
        variant="outlined"
        fullWidth
        name="time"
        placeholder={"Exam Time"}
        value={time}
        sx={{ my: 3, mx: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          )
        }}
        onChange={(event) => {
          setTime(event.target.value)
        }}
      />
      <br />



      <Button variant="contained" color='secondary' onClick={createBatch}>Submit</Button>
      <br />
    </div>
  </DashboardLayout>
}
