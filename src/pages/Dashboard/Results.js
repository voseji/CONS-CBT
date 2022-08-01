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
import { getUser, removeUserSession } from '../../admin/Common';
import ResultService from './service';
import { BACKEND_HOST } from '../../Components/welcome/api.utility';

const sampleData = [
  {
    id: 1,
    name: "Damilola Akinde",
    state: "Enugu",
    batch: "1A"

  },
  {
    id: 2,
    name: "Sam wise",
    state: "Enugu",
    batch: "1B"

  },
  {
    id: 3,
    name: "Victor Oseji",
    state: "Delta",
    batch: "1A"

  },
  {
    id: 4,
    name: "Chinedu Ukpe",
    state: "Plateau",
    batch: "1C"

  },

]

// const [isLoading, setIsLoading] = useState(false);
const columns = [

  { label: "SN", name: "sn" },
  { label: "Application Number", name: "registrationNumber" },
  { label: "Candidate Name", name: "formNumber" },
  { label: "Form Number", name: "formNumber" },
  { label: "Phone Number", name: "phoneNumber1" },
  { label: "State Of Origin", name: "stateOfOrigin" },
  { label: "Batch", name: "batch" },
  { label: "Score", name: "score" },
];

// const batch = [

//   { label: "1A", name: "1A" },
//   { label: "1B", name: "1B" },
//   { label: "1C", name: "1C" },
//   { label: "1D", name: "1D" },
//   { label: "2A", name: "2A" },
//   { label: "2B", name: "2B" },
// ];

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

export const Results = () => {
  const user = getUser();
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/admin_login');
  }

  // const [batch, setBatch] = useState('');

  // render(){
  // const [selectedOption, setSelectedOption] = useState(null);

  const [batches, setBatches] = useState([])
  useEffect(() => {
    fetchBatches()
  }, [])

  const fetchBatches = async () => {
    await BackendAPI.get(`/batches`).then(({ data }) => {
      setBatches(data)
      console.log(data)
    })
  }

  // const [state, setState] = useState(initial_state)
  // const setStateValue = (key, value) => {
  //   return setState(prevState => ({
  //     ...prevState,
  //     [key]: value,
  //   }))
  // }

  const [students, setStudents] = useState([])
  const [repo, setStudentsRepository] = useState([])

  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {

    /**
    *	Call an API END POint to get all students or record
    */


    const studentAPIResponse = await BackendAPI.get(`/student/result2`); // Assume Sample data above

    /**
    *	This will display all the sudents at first. 
    */
    setStudents(studentAPIResponse.data)
    console.log(studentAPIResponse)
    // console.log('Hi')

    /**
    *	This will simply also hold a duplicate of the records from the server for filtering. 
    */
    setStudentsRepository(studentAPIResponse.data);
  }
  const [selectedBatch] = useState(null);
  const handleSelectBatchState = e => {
    const selectedBatch = e.value;

    setStudents(repo.filter(
      batch => batch.state === selectedBatch
    ))
  }




  return <DashboardLayout>

    <div>
      <h2>Hi {user.name}! <Button variant='contained' color='primary' onClick={handleLogout}>Logout</Button></h2>

      <DashboardTitle title="Candidate Results" />
      <table style={{ width: "50%" }} border={1}>
        <tr>
          <td>
            <Select
              styles={{ position: 'fixed !important', zIndex: '1000 !important' }}
              // defaultValue={selectedOption}
              // onChange={setSelectedOption}
              options={sor}
              placeholder='Filter by State'
            />
          </td>
          <td>
            {/* <Select
            styles={{ position: 'albsolute', zIndex: '-5000' }}
            // defaultValue={selectedOption}
            onChange={handleSelectBatchState}
            options={batch}
            value={selectedBatch}
            // onChange={e => setBatch(e.target.value)}
            placeholder='Filter by Batch'
          /> */}
          </td>
        </tr>
        <br />
        {/* <Input type='text' value={batch} onChange={e => setBatch(e.target.value)} />
        <Button
          variant='contained'
          // disabled={isLoading}
          onClick={fetchSales}
          color='primary' >Search</Button> */}
        <Select
          options={batches.map(product => ({
            label: `${product.batch} `,
            value: product.selectedBatch,
          }))}
          onChange={handleSelectBatchState}
        />
      </table>

      <MUIDataTable
        columns={columns}
        data={students.map((registration, index) => [
          index + 1,
          // registration.createdAt,
          registration.registrationNumber,
          registration.firstName + ' ' + registration.lastName + ' ' + registration.otherNames,
          registration.formNumber,
          registration.phoneNumber1,
          registration.stateOfOrigin,
          registration.batch,
          registration.total_score,
          // registration.registrationNumber,

        ])}
      />
    </div>
  </DashboardLayout>
}
// }