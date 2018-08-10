import React, { Component } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import PropTypes from "prop-types"

import { withStyles } from "@material-ui/core"

import "./App.css"

import Homepage from "./components/Homepage"
import Splash from "./components/Splash"

const styles = () => ({
	root: {
		backgroundColor: "white"
	}
})

class App extends Component {
	render() {

		const { classes } = this.props

		return (
			<Router>
				<div className={classes.root}>
					<Route exact path="/" render={() => <Redirect to="/splash" />} />
					<Route exact path="/splash" component={Splash} /> 
					<Route exact path="/homepage" component={Homepage} />
				</div>
			</Router>
		)
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired
}

export default (withStyles(styles)(App))