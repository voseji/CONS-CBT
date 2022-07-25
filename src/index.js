import React, { Component } from 'react';
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
// import Candidates from './Components/Candidates';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import DashboardHome from './pages/Dashboard/DashboardHome';
import CalculatorPage from './pages/Calculator';
import {Candidates} from './pages/Dashboard/Candidates';
import Questions from './pages/Dashboard/Questions';
import {Results} from './pages/Dashboard/Results';
import {EditCandidate} from './pages/Dashboard/EditCandidate';

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

class Index extends Component {
  
  componentDidMount(){
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
              <Route path="/test" component={Test} />
              <Route path="/timeout" component={Timeout} />
              <Route path="/submit-response" component={SubmitResponse} />
              <Route path="/results" component={Results} />
              <Route path="/candidates" component={Candidates} />
              <Route path="/dashboard" component={DashboardHome} />
              <Route path="/calculator" component={CalculatorPage} />
              <Route path="/admin" component={DashboardHome} />
              <Route path="/questions" component={Questions} />
              <Route path="/results" component={Results} />
              <Route path="/edit_candidate" component={EditCandidate} />
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
