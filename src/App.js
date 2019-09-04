import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import SignInPage from './Components/SignInPage'
import Dashboard from './Components/Dashboard'
import LoggedOut from './Components/LoggedOut'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div id="page-body">
            <Route path="/" component={SignInPage} exact/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/logged-out" component={LoggedOut} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
