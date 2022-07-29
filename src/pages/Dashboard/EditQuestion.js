import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
// import React from 'react';
import React, { useState, useEffect, useRef, Component, PropTypes } from 'react';
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
import { QuestionAnswer } from '@mui/icons-material';
// import { useParams, useSearchParams } from 'react-router-dom';
// import RichTextEditor from 'react-rte';


// export default class Candidates extends React.Component{

export const EditQuestion = ({ match, location }) => {


  const params = new URLSearchParams(location.search);
  const qid = params.get('qid');
  // const { registrationNumber } = useParams();
  const [registration, setRegistration] = useState(null)



  const [subject, setSubject] = useState([])
  // const [settings, setSettings] = useState()

  useEffect(() => {
    fetchSubject(qid)
  }, [])

  const fetchSubject = async () => {
    await BackendAPI.get(`/one_question/${qid}`).then(({ data }) => {
      setSubject(data)
      console.log(data);
    })
  }

  const updateProduct = async (e) => {
    e.preventDefault();

    // const formData = new FormData()
    // formData.append('_method', 'PUT');
    // formData.append('batch', student?.batch)
    console.log(subject)


    await BackendAPI.put(`/questions/${qid}`, subject).then(({ data }) => {

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

  const handleAnswerChange = (e) => {
    setSubject(prevState => ({
      ...prevState,
      answers: prevState.answers.map(answer => {
        if (answer.id == e.target.name) {
          answer.answer = e.target.value;
          return answer;
        }
        return answer;
      })
    }))
  }


  return <DashboardLayout>
    <div style={{ width: '50%' }}>
      <DashboardTitle title="Edit Candidate" />

      <TextField
        label="Question"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        placeholder={"Question"}
        value={subject?.question}
        sx={{ my: 3, mx: 2 }}
        name='question'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <QuestionAnswer />
            </InputAdornment>
          )
        }}
        onChange={handleStudentFieldChange}
      />
      {
        subject.answers && subject.answers.map((answer, index) => {
          return <TextField
            label="Option"
            variant="outlined"
            fullWidth
            placeholder={"Answer"}
            value={answer?.answer}
            sx={{ my: 3, mx: 2 }}
            name={answer.id}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Book />
                </InputAdornment>
              )
            }}
            onChange={handleAnswerChange}
          />
        })
      }


      <br />

      <Button variant="contained" color='secondary' onClick={updateProduct}>Submit</Button>
      <br />
    </div>
  </DashboardLayout>
}
