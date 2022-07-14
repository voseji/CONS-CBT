import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';
import { BackendAPI } from '../../lib/api';

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            studentId: 'RG0001',
        }
        this.handleSearchCandidate = this.handleSearchCandidate.bind(this);
    }
    // const [studentId, setStudentId] = useState('');
    
    async handleSearchCandidate(e){
        e.preventDefault();
        this.setState({isLoading: true})
        try {
            const res = await BackendAPI.get(`/students/${this.state.studentId}`);
            if (res.data && (res.data.time_left < 1 || res.data.exam_status === "FINISHED")) {
                alert("You have exhaused your time or you have completed your exam.")
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
                    <h1>School of Nurseing CBT</h1>
                    <p>Enter your candidate ID to get started</p>
                    <Input 
                        fullWidth 
                        placeholder='Candidate ID' 
                        value={studentId}
                        onChange={(e) => this.setState({studentId: e.target.value})}
                        autoComplete='false' />
                    <Button 
                    type='submit'
                    style={{marginTop: '1rem'}} 
                    variant='contained' 
                    color="secondary" 
                    disabled={isLoading}
                    className="mt-2">{isLoading ? "Please wait..." : 'Get started'}</Button>

                </form>
            </div>
            <div className='cbt_login_instructions'>

            </div>
        </div>
    );
    } 
}

export default SignIn;