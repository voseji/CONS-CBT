import { AppBar, IconButton, Menu, Toolbar, Typography } from '@material-ui/core';
import { Adjust, CameraFront, Dashboard, MenuOutlined, Power, QuestionAnswerOutlined } from '@material-ui/icons';
import React from 'react';

export default class DashboardLayout extends React.Component{

    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style={{backgroundColor: '#fafafa'}}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <div className="dashboard_header_container">
                            <div className="dashboard_header_brand">
                                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                <MenuOutlined />
                                </IconButton>
                                <Typography variant="h6" color="inherit" component="div">
                                FCT College of Nursing Sciences
                                </Typography>
                            </div>
                            <div className="dashboard_header_navigator">
                                <div className="dashboard_header_initial">
                                    <span>S</span>
                                    <span>A</span>
                                </div>
                                <p>System Admin</p>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className='dashboard_sidebar'>
                    <div className="dashboard_sidebar_top">
                        <img src='/images/avatar/passport.png' />
                        <h3>Username</h3>
                        <hr style={{color: '#fff'}} />
                    </div>
                    <div className="dashboard_sidebar_links">
                        <ul>
                            <li className='active'><a href="/admin"> <Dashboard/> <span>Dashboard</span> </a></li>
                            <li><a href="/candidates"> <CameraFront /> <span>Candidates</span> </a></li>
                            <li><a href="/questions"> <QuestionAnswerOutlined /> <span>Questions</span> </a></li>
                            <li><a href="/results"> <Adjust /> <span>Results</span> </a></li>
                        </ul>
                        <div className="dashboard_sidebar_logout">

                        <button className=''><Power /> Logout</button>
                        </div>
                    </div>
                </div>
                <div className="dashboard_content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}