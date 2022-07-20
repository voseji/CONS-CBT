import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React from 'react';
import DashboardTitle from '../../Components/DashboardTitle/DashboardTitle';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import * as XLSX from 'xlsx';
import { BackendAPI } from '../../lib/api';


export default class DashboardHome extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            file: null,
            subject: '',
            batch: '',
            questions: [],

        }

        this.fileRef = React.createRef();

        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleShowFileUpload = this.handleShowFileUpload.bind(this);
        this.handleUploadQuestions = this.handleUploadQuestions.bind(this);
    }

    async handleFileChange(e){
        // e.stopPropagation();
        e.preventDefault();
        var file = e.target.files[0];
        await this.readFile(file);
        this.setState({ file });
    }

     readFile(file) {
        var f = file;
        var name = f.name;
        const reader = new FileReader();
        let data;
        reader.onload = (evt) => {
        // evt = on_file_select event
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        /* Update state */
        this.setState({questions: this.convertToJson(data)}); // shows data in json format
        // return this.convertToJson(data);
        };
        reader.readAsBinaryString(f);
        // return this.convertToJson(data);
    }

  convertToJson(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[j] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return result; //JSON
  }

  handleInputChange(e){
    console.log(e.target.name, e.target.value);
    this.setState({[e.target.name]: e.target.value})
  }

  handleShowFileUpload(){
    this.fileRef.current.click()
  }

  async handleUploadQuestions(){
    
    const {subject, batch, file, questions} = this.state;
    if (!file) {
        return alert('You must upload a questions file');
    }

    if(!questions || !questions.length) return alert("No question found in uploaded file.");

    try {
        const res = await BackendAPI.post('/questions',{
            subject,
            batchNumber: batch,
            questions,
        })
    } catch (error) {
        console.log(error);
    }finally{

    }
  }

    render(){
        
        return <DashboardLayout>
            <div>
                <DashboardTitle title="Questions upload" />
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="batch">Enter Exam Batch</InputLabel>
                            <Input placeholder='Enter Exam batch Number' type='text' value={this.state.batch} name='batch' onChange={this.handleInputChange} />

                        </FormControl>
                        {/* <Typography variant='subtitle' >Enter Batch</Typography> */}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Subject</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.subject}
                            label="Age"
                            name='subject'
                            onChange={this.handleInputChange}
                        >
                            <MenuItem value="">Select Subject</MenuItem>
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Mathematics">Mathematics</MenuItem>
                            <MenuItem value="Chemistry">Chemistry</MenuItem>
                            <MenuItem value="Physics">Physics</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            {/* <InputLabel id="questions">Upload Exam Questions</InputLabel> */}
                            <input ref={this.fileRef} type='file' onChange={this.handleFileChange}  style={{width:0, height: 0}} />
                            <Button onClick={this.handleShowFileUpload} color="default" style={{margin: '1rem 0', background: "#f1f1f1", borderRadius: '20px'}}>Click to Upload Excel File</Button>
                            {this.state.file && <Typography>{this.state.file.filename}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{marginTop: '1rem'}}>
                        <Button onClick={this.handleUploadQuestions} variant='contained' color="secondary">Upload Questions</Button>
                    </Grid>
                </Grid>
            </div>
        </DashboardLayout>
    }
}