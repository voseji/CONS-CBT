// import React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import SignInForm from '../form/SignInForm';
import Candidates from '../Candidates';
import { BackendAPI } from './api.utility';
import axios from 'axios';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    textAlign: 'center',
    margin: '60px 50px'
  },
  text: {
    margin: 10
  }
});


class Register extends React.Component {

 
  render() {
    const { classes, authenticated } = this.props;
    // const req = async () => {
    //   const response = await axios.get('https://dog.ceo/api/breeds/list/all')
    //   console.log("Hi"+response)
    // }
    const req = fetch('http://localhost:8000/api/students')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));

    return (
      <div>
        <Paper className={classes.root} elevation={0}>
          <Typography variant="headline" component="h3">
            ENTER APPLICATION NUMBER
              </Typography>
          <Divider className={classes.divider} />
          <SignInForm
            // candidates={Candidates}
            candidates={req}
            authenticated={authenticated} />
        </Paper>
      </div>
    );

  }

}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
