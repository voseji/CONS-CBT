import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Modal, Select, Typography } from '@material-ui/core';
// import React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import DashboardTitle from '../../Components/DashboardTitle/DashboardTitle';
import DashboardLayout from '../../Components/layout/DashboardLayout';
// import * as XLSX from 'xlsx';
import { APIErrorHandler, BackendAPI } from '../../lib/api';
import MUIDataTable from "mui-datatables";
// import moment from 'moment'
import { Link } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import { remainingTime } from '../../lib/time.lib';
import { modalStyle } from '../../lib/styles';
import { Box } from '@mui/material';
import Swal from 'sweetalert2';
// import Button from '@material-ui/core/Button';

const columns = [

  { label: "Batch Name", name: "batch" },
  { label: "Day", name: "day" },
  { label: "Time", name: "time" },
  { label: "Status", name: "status", options: {
    customBodyRender: (status) => {
     return <span className={`status ${status}`}>{status}</span>
    } 
  } },
  {
    label: "Action", name: "", options: {filter: false, sort: false}
  },
];



// export default class Candidates extends React.Component{

export const Batches = () => {
  // render(){

  const [batches, setBatches] = useState([]);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [activeBatch, setActiveBatch] = useState(null);
  
  const fetchAllBatches = async () => {
    await BackendAPI.get(`/batches`).then(({ data }) => {
      // setFacilityType1(data?.data)
      setBatches(data)
    })
  }
  useEffect(() => {
    fetchAllBatches()
  }, [])


  const handleUpdatebatch = async () => {
    // CREATE NEW OBJECT BECAUSE JAVASCRIPT USES REFERENCE TYPE FOR OBJECTS
    const batchToUpdate = {...activeBatch};
    batchToUpdate.status = activeBatch?.status === 'active' ? 'inactive' : 'active';

    try{
      const res = await BackendAPI.patch(`/batches/${activeBatch?.id}`,batchToUpdate);
      setShowChangeStatusModal(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Batch status has been changed!',
      })
      return setBatches(prevState => prevState.map(batch => {
        if(batch.id === batchToUpdate.id) return batchToUpdate;
        return batch;
      }))
    }catch(error){
      Swal.fire({
        icon: 'error',
        title: 'Questions upload error',
        text: APIErrorHandler(error),
      })
    }

  }

  return <DashboardLayout>
    <div>
      <DashboardTitle title="Batches" />
      <Link to="/create_batch">
        <Button variant="contained" color='secondary'>Create New Batch</Button>
      </Link>
      <MUIDataTable
        columns={columns}
        data={batches.map((batchItem, index) => {
          const {batch, day, time, status} = batchItem;
          return [
          // index +1, 
          // registration.createdAt,
          batch,
          day,
          time,
          status,
          <Button 
            variant='contained' 
            color={status === 'active' ? 'secondary' : 'primary'}
            onClick={() => {
              setActiveBatch(batchItem)
              setShowChangeStatusModal(true)
            }}
            >
              {status === 'active' ? "Deactivate" : "Activate"}
        </Button>

        ]}
        )}

        options={{ selectableRows: 'none', elevation: 0 }}
      />
    </div>


    <Modal
    open={showChangeStatusModal}
    onClose={() => setShowChangeStatusModal(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={modalStyle}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {activeBatch?.status === "active" ? "Deactivate" : "Activate"} Batch
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        You are about to change the status of this batch. This may affect people already writing exams. Continue?
      </Typography>
      <Button 
      variant='contained'
      onClick={handleUpdatebatch} 
      color={activeBatch?.status === "active" ? "secondary" : "primary"}>
        {activeBatch?.status === "active" ? "Deactivate" : "Activate"}
      </Button>
    </Box>
  </Modal>
  </DashboardLayout>
}
// }