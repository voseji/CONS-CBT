import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';
import { BackendAPI } from '../lib/api';
import Swal from 'sweetalert2';
import axios from 'axios';
import { setUserSession } from './Common';
// class AdminLogin extends React.Component {
function Login(props) {
    const [loading, setLoading] = useState(false);
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);

    // handle button click of login form
    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post('http://localhost:8000/api/auth/login', { email: email.value, password: password.value }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            props.history.push('/dashboard');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Incorrect credentials.");
        });
    }
    // const { isLoading } = this.state;

    return (
        <div className='cbt_login_container'>
            <div className='cbt_login_banner'>
                &nbsp;
            </div>
            <div className='cbt_login_form_container'>
                <form >
                    <img src='images/bg/FCT-logo4.png' width='20%' />
                    <h1>FCT College of Nursing Sciences</h1>
                    <h2>2022 Midwifery Entrance Examinations</h2><br />
                    <h3>ADMIN SECTION</h3>

                    <div>
                        Email<br />
                        <input type="text"
                            {...email}
                            autoComplete="new-password"
                            style={{ padding: '15px 80px', fontSize: '25px', color: 'black', backgroundColor: '#fff', display: 'inline-block', textAlign: 'center' }}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        Password<br />
                        <input type="password" {...password} autoComplete="new-password"
                            style={{ padding: '15px 80px', fontSize: '25px', color: 'black', backgroundColor: '#fff', display: 'inline-block', textAlign: 'center' }}
                        />
                    </div>
                    {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                    <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin}
                        style={{ padding: '15px 32px', border: 'none', color: 'white', backgroundColor: '#4CAF50', display: 'inline-block', textAlign: 'center' }}
                        disabled={loading} /><br />

                </form>
            </div>
            <div className='cbt_login_instructions'>

            </div>
        </div>
    );
}
const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Login;