import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Landing from './welcome/Landing';
import Instruction from './welcome/Instruction';
// import SignIn from './welcome/SignIn';
import { Redirect } from 'react-router-dom';
import SignIn from '../pages/SignIn/SignIn';
import './App.css';
import Instructions from '../pages/SignIn/Instructions/Instructions';
import { BackendAPI } from '../lib/api';
import Swal from 'sweetalert2';
import Login from '../Components/Login/Login';
const styles = theme => ({
  root: {
    width: '100%'
  },
  subContainer: {
    marginBottom: 30
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  buttom: {
    flexDirection: "row",
    justifyContent: "center"
  },
  landing: {
    marginBottom: 30
  },
  signIn: {
    marginBottom: 30
  },
  instruct: {
    marginBottom: 30
  }
});

function getSteps() {
  return ['Welcome', 'Sign-in', 'Information'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Please! ensure you read the information above, Before clicking on Next.';
    case 1:
      return 'By clicking on next, You validate the information above';
    default:
      return '';
  }
}
// const [token, setToken] = useState();

class App extends React.Component {

  state = {
    activeStep: 0,
    hasCandidate: false,
    authenticated: false,
    candidate: null,
  };

  componentWillMount() {
    localStorage.setItem('regNo', '');
    localStorage.setItem('programType', '');
  }

  async componentDidMount() {
    const studentId = localStorage.getItem('studentId');
    if (studentId) {
      const res = await BackendAPI.get(`/students/${studentId}`);
      const student = res.data;

      // if(student?.exam_status === "STARTED"){
      //   return Swal.fire({
      //   icon: 'error',
      //   title: 'Warning',
      //   text: 'You are already logged in on another computer. Contact the coordinator to log you out',
      //   });
      // }

      if (student?.time_left < 1 || student?.exam_status === "FINISHED") {

        Swal.fire({
          icon: 'error',
          title: 'Warning',
          text: 'You have exhaused your time or you have completed your exam',
        });
        return localStorage.removeItem('studentId')
      }

      return this.setState({ activeStep: 1, candidate: res.data });
    }
  }

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleGuestSignIn = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
    localStorage.setItem('guest', 'guest');
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  authenticated = (response) => {
    if (response === "true") {
      this.setState({
        authenticated: true
      })
      localStorage.setItem('authenticated', 'true');

    } else if (response === "false") {

      this.setState({
        authenticated: false
      })
      localStorage.removeItem('authenticated');
    }
  }



  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    // return <SignIn />
    // return <Instructions />

    return (

      <div className={classes.root}>
        {this.state.hasCandidate === true ? <Redirect to="/demo" /> : null}
        {/* <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper> */}
        <div className={classes.subContainer}>
          {this.state.activeStep === 0 ? (
            <SignIn
              onStageChange={() => this.setState({ activeStep: 1 })}
            />
          ) : this.state.activeStep === 1 ?
            <Instructions candidate={this.state.candidate} onStageChange={() => this.setState({ hasCandidate: true })} />

            : (
              <div className={classes.instruct}>
                <Instruction />
                <center>
                  {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}

                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                    <Button onClick={() => this.setState({ hasCandidate: true })} variant="contained" color="primary">
                      Start Test
                    </Button>
                  </div>
                </center>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(App);
