import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import image from '../images/background.jpg';
import Button from '@material-ui/core/Button';
import Typing from 'react-typing-animation';
import Hidden from '@material-ui/core/Hidden';
import compose from 'recompose/compose';
import withWidth from '@material-ui/core/withWidth';
import { BackendAPI } from '../../lib/api';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    // breakpoints [xs, sm, md, lg, xl]
  },
  typo: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 24
  },
  img: {
    [theme.breakpoints.only('md')]: {
      height: "40%",
      width: "70%",
    },
    [theme.breakpoints.only('lg')]: {
      height: "40%",
      width: "60%",
    },
    [theme.breakpoints.only('xl')]: {
      height: "60%",
      width: "60%",
    },
  },
  btn: {
    position: "relative",
    margin: theme.spacing.unit
  },
  ul: {
    margin: 0,
    padding: 0
  },
  li: {
    listStyle: "none"
  }
});

class SubmitResponse extends Component {
  state = {
    candidateData: undefined,
    score: undefined,
    redirect: false,
  }

  componentWillMount() {
    // this.getScore();
    // localStorage.removeItem('authenticated');
  }
  
  async componentDidMount() {
    try{
      this.getCandidateData();
      const res = await BackendAPI.get(`/students/RG0001`);
      
    }catch(error){

    }
    // this.recordCandidate(this.state.score, this.state.candidateData);
  }

  getScore() {
    const score = localStorage.getItem('candidateScore');
    this.setState({
      score
    });
  }

  async getCandidateData() {
    const res = await BackendAPI.get(`/students/RG0001`);
    this.setState({
      candidateData: res.data,
    });
  }

  getCandidatesRecord() {
    try {
      const candidatesRecord = JSON.parse(localStorage.getItem('candidatesRecord'));
      if (candidatesRecord.length !== 0) {
        return candidatesRecord;
      } else {
        return []
      }
    } catch (e) {
      console.log(e);
    }
  }

  handleGoHome = () => {
    localStorage.setItem('candidate', JSON.stringify([]));
    localStorage.removeItem('studentId');
    this.setState({
      redirect: true
    })
  }

  recordCandidate(score, candidateData) {
    let candidatesRecord = this.getCandidatesRecord();
    let candidateRecordNo;

    const guest = localStorage.getItem('guest');

    if (candidatesRecord === [] || null || undefined) {
      candidateRecordNo = 0
    } else {
      candidateRecordNo = candidatesRecord.length + 1;
    }

    if (!!guest) {
      // do nothing... its a guest
    } else {
      let candidateRecord = {
        score,
        candidateData,
        candidateRecordNo,
        used: "Timed Up"
      }

      candidatesRecord.push(candidateRecord);
      localStorage.setItem('candidatesRecord', JSON.stringify(candidatesRecord));
    }

  }

  componentWillUnmount() {
    localStorage.setItem('questionNo', JSON.stringify([]));
    localStorage.setItem('candidateScore', String(0));
    localStorage.setItem('regNo', '');
    localStorage.setItem('programType', '');
    localStorage.setItem('questionNo', JSON.stringify([]));
    localStorage.setItem('candidate', JSON.stringify([]));
    localStorage.removeItem('guest');
    localStorage.setItem('guestScore', String(0));
  }

  render() {
    const { classes } = this.props;
    const guest = localStorage.getItem('guest');
    const candidate = JSON.parse(localStorage.getItem('candidate'));
    const guestScore = localStorage.getItem('candidateScore');

    return (
      <div>
        {candidate !== [] ? <div id="submit-response">
          {candidate !== [] || !!guest ?
            <Paper className={classes.root} elevation={0}>
              {this.state.redirect === true ? <Redirect to="/" /> : null}
              
              <Typing >
              <Typography className={classes.typo} variant="headline" component="h3">
                <ul className={classes.ul}>
                  <li className={classes.li}> Time Up! <strong> {this.state.candidateData ? this.state.candidateData.firstName : 'Candidate'}  </strong> </li>
                  <li className={classes.li}> You have exhausted your exam time.</li>
                  <li className={classes.li}>  Please logout and wait for result</li>
                </ul>

              </Typography>
              </Typing>
              <Button variant="contained" color="secondary" className={classes.btn} onClick={this.handleGoHome}> Logout </Button>
              <center>
                <Hidden smDown>
                  <img className={classes.img} src={image} alt="response" />
                </Hidden>
              </center>
            </Paper>
            : <Redirect to="/not-found" />}
        </div> : null}
      </div>
    )
  }
}


SubmitResponse.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles),
  withWidth(),
)(SubmitResponse);
