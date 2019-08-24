import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Route,
} from 'react-router-dom'; 
import SignInPage from './SignInPage'
import Dashboard from './Dashboard'
import LoggedOut from './LoggedOut'
import './App.css';

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
