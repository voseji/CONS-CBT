import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import Questions from '../Questions';
import Objective from '../Objective';
// import Tabs from '@material-ui/core/Tabs'
// import Tab from '@material-ui/core/Tab'
import Header from '../Header';
import { Redirect } from 'react-router-dom';
import { BackendAPI } from '../../lib/api';
import { Tab, Tabs } from '@material-ui/core';


const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 5,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    overflow: 'hidden',
    width: '100%',
  },
  mobileStepper: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
  }
});


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


class Test extends React.Component {
  state = {
    activeStep: 0,
    examTime: undefined,
    submit: false,
    timeOut: false,
    activeTab: 0,
    subjects: [],
    student: null,
    currentQuestions: {},
    activeStep: null,
    activeSubject: null,
  };

  constructor(props){
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this)
  }


  async componentDidMount() {
    const studentId = localStorage.getItem('studentId');
    if(studentId){
      const res = await BackendAPI.get(`/students/${studentId}`);
      
      if (res.data && (res.data.time_left < 1 || res.data.exam_status === "FINISHED")) {
        alert("You have exhaused your time or you have completed your exam.")
        localStorage.removeItem('studentId')
        return this.props.history.replace('/')
      }
      const subjectRes = await BackendAPI.get('/subjects'); 
      const subjects = subjectRes.data;
      subjects.map(subject => {
        this.setState({
          [`sub${subject.id}`]: 0, 
        })
        this.setState({activeSubject: subjects[0], student: res.data});
        localStorage.setItem(`sub${subject.id}`,0);
      });
      this.setState({subjects: subjectRes.data});
      this.setTime(res.data.time_left);
      localStorage.setItem('questionNo', JSON.stringify([]));
      localStorage.setItem('candidateScore', String(0));
      return;
    }
    return this.props.history.replace('/')
    // const res = await BackendAPI.get('/students/RG0001');
  }

  async CountDown() {
    
    if (this.state.examTime === 1000) {
      localStorage.setItem("Time", "Timed Up")
      this.handleTimeOut();
    } else if (this.state.examTime > 0) {
      let countDown = this.state.examTime - 1000;
      localStorage.setItem("Time", JSON.stringify(countDown));
      this.setState({ examTime: countDown })
    }
  }

  leadingZero(num) {
    if (num < 10) {
      return '0' + num;
    }

    return num;
  }

  remainingTime() {
    let seconds = this.leadingZero(Math.floor((this.state.examTime / 1000) % 60));
    let minutes = this.leadingZero(Math.floor((this.state.examTime / 1000 / 60) % 60));

    return `${minutes}:${seconds}`;
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
      [`sub${prevState.activeSubject.id}`]: prevState[[`sub${prevState.activeSubject.id}`]] + 1, 
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
      [`sub${prevState.activeSubject.id}`]: prevState[[`sub${prevState.activeSubject.id}`]] - 1, 
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep, [`sub${this.state.activeSubject.id}`]: activeStep});
  };

  response = async (questionId, answerId) => {
    const studentId = localStorage.getItem('studentId');
    const activeQuestion = this.state.activeSubject.questions[`sub${this.state.activeSubject.id} - 1`];
    // const answer = activeQuestion.find(answer => answer.id === answerId);
    // answer.isChecked = true;
    const res = await BackendAPI.post('/questions/respond',{
      questionId,
      answerId,
      studentId,
    });

    const {activeSubject, subjects} = this.state;

    const updatedActiveSubject = {
      ...activeSubject,
      questions: activeSubject.questions.map(question => {
        if(question.id == parseInt(questionId)){
          return {
            ...question,
            answers: question.answers.map(answer => {
              if(answer.id === parseInt(answerId)){
                answer.isChecked = true;
                return answer;
              }
              answer.isChecked = false;
              return answer
            })
          }
        }
        return question;
      })
      
    }

    const updatedSubjects = subjects.map(subject => {
      if(subject.id === updatedActiveSubject.id) return updatedActiveSubject;
      return subject;
    })

    return this.setState(prevState => ({
      ...prevState,
      activeSubject,
      subjects: updatedSubjects,

    }));

  };

  checkQuestionNo = (quesNo) => {
    quesNo = String(quesNo);
    const questionNo = JSON.parse(localStorage.getItem('questionNo'));
    const result = questionNo.includes(quesNo);

    if (result === true) {
      const questionNos = questionNo.filter((questionNumber) => {
        return questionNumber !== quesNo;
      });

      localStorage.setItem('questionNo', JSON.stringify(questionNos));
      localStorage.setItem('candidateScore', String(questionNos.length));
    }
  }

  setTime = (exam_time = 2) => { 
    const examTime = Date.parse(new Date()) + (1000  * exam_time) - Date.parse(new Date());
    this.setState({ examTime });
    this.timer = setInterval(() => this.CountDown(), 1000);
    this.timeUpdate = setInterval(() => this.updateUserTime(), 5000);
    this.remainingTime();
  }

  async updateUserTime(){
    let student = this.state.student;
    student.time_left = this.state.student ? this.state.student.time_left - 5 : 0;
    await BackendAPI.put(`/students/${student.id}`,{time_left: student.time_left});
    this.setState({student})
  }

  handleSubmit = async () => {
    let {student} = this.state;
    student.exam_status = "FINISHED";
    localStorage.removeItem('studentId');

    await BackendAPI.put(`/students/${student.id}`,student)
    clearInterval(this.timer);
    this.setState({
      submit: true
    })
  }

  handleTimeOut = () => {
    clearInterval(this.timer);
    localStorage.removeItem('studentId');
    this.setState({
      timeOut: true
    })
  }

  handleTabChange(index){
    const activeSubject = this.state.subjects[index]
    this.setState({activeTab: index, activeSubject,})
  }


  render() {
    const { classes, theme } = this.props;
    const {subjects, activeSubject} = this.state;
    const activeStep = this.state[`sub${activeSubject ? activeSubject.id :''}`];
    const maxSteps = activeSubject ? activeSubject.questions.length : 0;
    const authenticated = localStorage.getItem('authenticated');
    const guest = localStorage.getItem('guest');
    console.log(this.state.activeSubject)
    const activeStepId = activeSubject ? activeSubject.id : 0;
    return (
      <div className={classes.root}>
          <div id="test">
            {this.state.submit === true ? <Redirect to="/" /> : null}
            {this.state.timeOut === true ? <Redirect to="/" /> : null}

            <Header examTime={this.remainingTime()} submit={this.handleSubmit} />
            <div style={{display: 'flex', justifyContent: 'space-between', minHeight: '50vh'}}>
              <div style={{width: '40%', overflowY: 'scroll'}}>
                <Typography style={{padding: '1rem'}} variant='subtitle' color="secondary" component='h2' >
                  Question
                </Typography>
                <hr />
                  <Paper square elevation={0} className={classes.header}>
                    <Typography>{this.state[`sub${activeStepId}`] + 1}. {activeSubject ? activeSubject.questions[this.state[`sub${activeStepId}`]].question : ''}</Typography>
                  </Paper>

              </div>
              <div style={{width: '40%',}}>
                <Typography  style={{padding: '1rem'}} variant='subtitle' color="secondary" component='h2' >
                  Options | swipe left or right to change question
                </Typography>
                <hr />
                  <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state[`sub${activeStepId}`]}
                    onChangeIndex={this.handleStepChange}
                    enableMouseEvents
                  >
                    {
                      activeSubject && activeSubject.questions ? 
                        activeSubject.questions.map(question => {
                          return <Objective
                            objective={question.answers}
                            question={question}
                            key={question.id}
                            response={this.response}
                            checkQuestionNo={(quesNo) => this.checkQuestionNo(quesNo)} />

                        })
                      : <div></div>
                      // this.state.subjects.map(subject => {
                      //   return subject.questions.map(question => {
                      //     return <Objective
                      //       objective={question.answers}
                      //       question={question}
                      //       key={question.id}
                      //       response={this.response}
                      //       checkQuestionNo={(quesNo) => this.checkQuestionNo(quesNo)} />

                      //   })
                      // })
                    }
                    {/* {Questions.map(question => (
                    ))} */}

                  </SwipeableViews>

              </div>
              <div className='test_bio_container'>
                <img src='/images/avatar/passport.png' style={{maxWidth: '100px', borderRadius: '20px'}} />
                <h3>{this.state.student ? this.state.student.lastName : ''} {this.state.student ? this.state.student.firstName : ''}</h3>
                  <hr />
                  <p style={{marginTop: '2rem'}}>Registration Number: RG0001 </p>
                  <p>Batch Number: A1 </p>
                  <p>Year: 2022</p>
              </div>
            </div>

            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="dots"
              activeStep={activeStep}
              className={classes.mobileStepper}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={activeStep ===  0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
            </Button>
              }
            />
          </div>
          {/* : <Redirect to="/not-found" /> */}
              <div sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={this.state.activeTab} aria-label="basic tabs example">
                  {
                    subjects.map((subject, index) => {
                      return <Tab 
                        key={index} 
                        label={subject.subject} 
                        {...a11yProps(0)}  
                        onClick={() => this.handleTabChange(index)} />
                    })
                  }
                  {/* <Tab label="Item One" {...a11yProps(0)}  onClick={() => this.setState({activeTab: 0})} />
                  <Tab label="Item Two"  {...a11yProps(1)} onClick={() => this.setState({activeTab: 1})} />
                  <Tab label="Item Three"  {...a11yProps(2)}  onClick={() => this.setState({activeTab: 2})} /> */}
                </Tabs>
              </div>
              
              <TabPanel value={1} index={0}>
                Some excellent
              </TabPanel>
              <TabPanel value={2} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={3} index={2}>
                Item Three
              </TabPanel>
      </div>
    );
  }
}

Test.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Test);

