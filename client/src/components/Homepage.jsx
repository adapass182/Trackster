import React, { Component } from "react"
import PropTypes from "prop-types"

import Spotify from "spotify-web-api-js"

import { Button, Card, CardActions, CardMedia, withStyles } from "@material-ui/core"

import NowPlaying from "./NowPlaying"
// import TopArtists from "./TopArtists"
import TopTracks from "./TopTracks"

const styles = () => ({
	root: {
		backgroundColor: "white"
	}
})

const spotifyWebApi = new Spotify()

class Homepage extends Component {
	constructor(){
		super()
		const params = this.getHashParams()
		this.state = {
			loggedIn: params.access_token ? true : false,
			isPlaying: false
		}
		if(params.access_token){
			spotifyWebApi.setAccessToken(params.access_token)
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0)
	}

	getHashParams() {
		// Gets access token
		var hashParams = {}
		var e, r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1)
		// eslint-disable-next-line
		while ( e = r.exec(q)) {
			hashParams[e[1]] = decodeURIComponent(e[2])
		}
		return hashParams
	}

	render() {

		const { classes } = this.props

		return (
			<div className={classes.root}>
				<Card className="App">
					<CardActions style={{justifyContent: "right"}}>
						<Button variant="raised" color="primary" type="submit" href="http://localhost:3000">
							Logout
						</Button>
					</CardActions>
					<CardMedia>
						<NowPlaying />
					</CardMedia>
					<TopTracks />
				</Card>
			</div>
		)
	}
}

Homepage.propTypes = {
	classes: PropTypes.object.isRequired
}

export default (withStyles(styles)(Homepage))
