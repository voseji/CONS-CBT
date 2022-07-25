import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';
import { BackendAPI } from '../../lib/api';
import Swal from 'sweetalert2';

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            studentId: '',
        }
        this.handleSearchCandidate = this.handleSearchCandidate.bind(this);
    }
    // const [studentId, setStudentId] = useState('');
    
    async handleSearchCandidate(e){
        e.preventDefault();
        const {studentId} = this.state;
        if(!studentId)
        return Swal.fire({
                icon: 'error',
                title: "Notification:",
                text: 'You must enter your student ID',
                });
        this.setState({isLoading: true})
        try {
            const res = await BackendAPI.get(`/students/${this.state.studentId}`);
            const student = res.data;

            if(student?.exam_status === "STARTED"){
                return Swal.fire({
                icon: 'error',
                title: "Notification:",
                text: 'You are currently signed into another computer. Please log out first',
                });
            }

            if (student && (student.time_left < 1 || student.exam_status === "FINISHED")) {
                // alert("You have exhaused your time or you have completed your exam.")
                Swal.fire({
                icon: 'error',
                title: "Notification:",
                text: 'You have exhaused your time or you have completed your exam',
                });
                return localStorage.removeItem('studentId')
            }
            localStorage.setItem('studentId',res.data.registrationNumber);
            this.props.onStageChange(1);
        } catch (error) {
            console.log(error)
            alert("Candidate not found");
        }finally{
            this.setState({isLoading: false})
        }
    }

    render(){
        const {studentId, isLoading} = this.state;
        return (
        <div className='cbt_login_container'>
            <div className='cbt_login_banner'>
            &nbsp;
            </div>
            <div className='cbt_login_form_container'>
                <form onSubmit={this.handleSearchCandidate}>
                    <img src='images/bg/FCT-logo4.png' width='20%'/>
                    <h1>FCT College of Nursing Sciences</h1>
                    <h2>2022 Midwifery Entrance Examinations</h2>
                    <p>Enter your Application Number to get started</p>
                    <Input 
                
                        fullWidth 
                        placeholder='Application Number' 
                        value={studentId}
                        onChange={(e) => this.setState({studentId: e.target.value})}
                        autoComplete='false' />
                    <Button 
                    type='submit'
                    style={{marginTop: '1rem'}} 
                    variant='contained' 
                    color="secondary" 
                    disabled={isLoading}
                    className="mt-2">{isLoading ? "Please wait..." : 'Login'}</Button>

                </form>
            </div>
            <div className='cbt_login_instructions'>

            </div>
        </div>
    );
    } 
}

export default SignIn;