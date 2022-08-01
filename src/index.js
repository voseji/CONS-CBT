import React, { Component, useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import App from "./Components/App";
import registerServiceWorker from "./registerServiceWorker";
import Test from './Components/routes/Test';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Timeout from './Components/routes/Timeout';
import SubmitResponse from './Components/routes/SubmitResponse';
// import Results from './Components/routes/Results';
import Footer from './Components/Footer';
import notFoundPage from './Components/routes/pageNotFound';
import SignIn from './Components/welcome/SignIn';
import Login from './Components/Login/Login';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { Dashboard } from './pages/Dashboard/DashboardHome';
import CalculatorPage from './pages/Calculator';
import { Candidates } from './pages/Dashboard/Candidates';
import UploadQuestions from './pages/Dashboard/UploadQuestions';
import { Subjects } from './pages/Dashboard/Subjects';
import { Questions } from './pages/Dashboard/Questions';
import { Results } from './pages/Dashboard/Results';
import { EditCandidate } from './pages/Dashboard/EditCandidate';
import { Batches } from './pages/Dashboard/Batches';
import { NewBatch } from './pages/Dashboard/NewBatch';
import PreTest from './Components/routes/PreTest';
import { EditQuestion } from './pages/Dashboard/EditQuestion';
import AdminLogin from './admin/login'
import PrivateRoute from './admin/PrivateRoute';
import { getToken, removeUserSession, setUserSession } from './admin/Common';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  },
  status: {
    danger: "orange"
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ["calibri"].join(","),
    fontSize: 16
  },
});

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'd9eb23ed00e57f8645b7',
  wsHost: window.location.hostname,
  cluster: 'mt1',
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
});

window.Echo.channel(`test-channel`)
  .listen('TestEvent', (e) => {
    console.log("Soemthing dispatched");
  });
function App2(params) {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:8000/refresh?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
}

class Index extends Component {

  componentDidMount() {
    window.Echo.channel(`test-channel`)
      .listen('TestEvent', (e) => {
        console.log("Soemthing dispatched");
      });
  }


  render() {

    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>

          <div className="App">
            <Switch>
              {/* <Route exact path="/" component={App} /> */}
              <Route exact path="/" component={App} />
              <Route path="/demo" component={PreTest} />
              <Route path="/test" component={Test} />
              <Route path="/timeout" component={Timeout} />
              <Route path="/submit-response" component={SubmitResponse} />
              <Route path="/results" component={Results} />
              <PrivateRoute path="/candidates" component={Candidates} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/calculator" component={CalculatorPage} />
              {/* <Route path="/admin" component={DashboardHome} /> */}
              <Route path="/subjects" component={Subjects} />
              <Route path="/upload_questions" component={UploadQuestions} />
              <Route path="/results" component={Results} />
              <Route path="/edit_candidate" component={EditCandidate} />
              <Route path="/batches" component={Batches} />
              <Route path="/create_batch" component={NewBatch} />
              <Route path="/questions" component={Questions} />
              <Route path="/edit_question" component={EditQuestion} />
              <Route path="/admin_login" component={AdminLogin} />
              <Route component={notFoundPage} />
            </Switch>
            <Footer />
          </div>

        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}


ReactDOM.render(<Index />, document.getElementById("root"));
registerServiceWorker();
