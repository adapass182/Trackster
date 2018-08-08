import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import './App.css'

import Container from './components/Container'
import Splash from './components/Splash'

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" render={() => <Redirect to="/splash" />} />
            <Route exact path="/splash" component={Splash} /> 
            <Route exact path="/container" component={Container} />
          </div>
        </Router>
    )
  }
}

export default App