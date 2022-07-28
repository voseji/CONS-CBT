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
// import Button from '@material-ui/core/Button';

const columns = [

  { label: "Question", name: "question" },
  { label: "", name: "" },

  {
    label: "Action", name: "", options: {
      customBodyRender: (id) => {
        return <Link to={`/edit_question?qid=${id}`}>Edit Question</Link>
      }
    }
  },
];



// export default class Candidates extends React.Component{

export const Questions = () => {
  const params = new URLSearchParams(location.search);
  const sid = params.get('sid');
  const [question, setQuestion] = useState([])
  const [subject, setSubject] = useState([])
  // render(){
  useEffect(() => {
    fetchQuestion(sid)
    fetchSubject(sid)
  }, [])

  const fetchQuestion = async () => {
    // console.log(`/subject_questions/${sid}`)
    await BackendAPI.get(`/subject_questions/${sid}`).then(({ data }) => {
      setQuestion(data)
      console.log(data);
    })
  }

  const fetchSubject = async () => {
    // console.log(`/subject_questions/${sid}`)
    await BackendAPI.get(`/subject/${sid}`).then(({ data }) => {
      setSubject(data)
      console.log(data);
    })
  }


  return <DashboardLayout>
    <div>

      <Link to="/upload_questions">
        <Button variant="contained" color='secondary'>Upload Questions</Button>
      </Link>

      <DashboardTitle title={`${subject?.subject} Questions`} />
      <MUIDataTable
        columns={columns}
        data={question.map((question, index) => [
          // index +1, 
          // registration.createdAt,
          question.question,

          question.question2,

          question.id,

        ])}

        options={{ selectableRows: 'none', elevation: 0 }}
      />
    </div>
  </DashboardLayout>
}
// }