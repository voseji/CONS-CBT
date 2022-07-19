import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables';
import { BackendAPI } from './services/api.utility';


export default class Candidates extends Component {


  const [allregdetails, setAllRegDetails] = useState([])
  useEffect(()=>{
    fetchAllRegDetails()
	},[])
  const fetchAllRegDetails = async () => {
    await BackendAPI.get(`/facility_type_all`).then(({data})=>{
      // setFacilityType1(data?.data)
      setAllRegDetails(data)
      console.log(data);
    })
	}

  render() {
    console.log(this.state.candidatesRecord);

    return (
      <center>
        <h2 style={{textAlign: "center"}}>Candidates</h2>
        <MUIDataTable 
              columns={columns}
              data={allregdetails.map((registration, index) => [
                // index +1, 
                registration.createdAt,
                registration.eID,
                registration.KIV,
                registration.registrationNumber,
                registration.facilityName,
                registration.facility_type.facilityType,
                registration.eID,
           
              ])}
             />
      </center>
    )
  }
}
