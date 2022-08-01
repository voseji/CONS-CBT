import { AppBar, IconButton, Menu, Toolbar, Typography, Input, Button } from '@material-ui/core';
import { Adjust, CameraFront, BookOutlined, Dashboard, MenuOutlined, Power, QuestionAnswerOutlined } from '@material-ui/icons';
import React from 'react';
import { getUser, removeUserSession } from '../../../admin/Common';


export const AppHeader = (props) => {
    const user = getUser();

    // handle click event of logout button
    const handleLogout = () => {
        removeUserSession();
        props.history.push('/admin_login');
    }

    return <AppBar position="static">
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
                {/* <div className="dashboard_header_navigator">
                    <div className="dashboard_header_initial">
                        <span>S</span>
                        <span>A</span>
                    </div>
                    <h4>Hi {user.name}! <input type="button" onClick={handleLogout} value="Logout" /></h4>
                </div> */}
            </div>
        </Toolbar>
    </AppBar>
}