import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Spotify from 'spotify-web-api-js'

import {
	Button,
	Card,
	CardActions,
	CardMedia,
	withStyles,
	Typography
} from '@material-ui/core'

import NowPlaying from './NowPlaying'
import Recommendations from './Recommendations'
import TopArtists from './TopArtists'
import TopTracks from './TopTracks'

const styles = () => ({
	root: {
		backgroundColor: 'black'
	},
	switchButton: {
		width: 'auto'
	}
})

const spotifyWebApi = new Spotify()

class Homepage extends Component {
	constructor() {
		super()
		const params = this.getHashParams()
		this.state = {
			loggedIn: params.access_token ? true : false,
			isPlaying: false,
			switchView: false
		}
		if (params.access_token) {
			spotifyWebApi.setAccessToken(params.access_token)
		}
	}

	componentDidMount() {
		window.scrollTo(0, 24)
	}

	getHashParams() {
		// Gets access token
		var hashParams = {}
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1)
		// eslint-disable-next-line
		while ((e = r.exec(q))) {
			hashParams[e[1]] = decodeURIComponent(e[2])
		}
		return hashParams
	}

	handleClick() {
		this.setState(prevState => ({
			switchView: !prevState.switchView
		}))
	}

	switchView() {
		if (this.state.switchView === true) {
			return <TopArtists />
		} else {
			return <TopTracks />
		}
	}

	switchTitle() {
		if (this.state.switchView === true) {
			return 'Your Top Artists'
		} else {
			return 'Your Top Tracks'
		}
	}

	render() {
		const { classes } = this.props

		return (
			<div>
				<Card className={classes.root}>
					<CardActions style={{ justifyContent: 'right' }}>
						<Button
							variant="extendedFab"
							type="submit"
							href="http://localhost:3000"
						>
							Logout
						</Button>
					</CardActions>
					<CardMedia>
						<NowPlaying />
					</CardMedia>
					<CardActions
						style={{
							justifyContent: 'space-around'
						}}
					>
						<Button
							className={classes.switchButton}
							variant="extendedFab"
							onClick={() => this.handleClick()}
							disabled={!this.state.switchView}
						>
							See Tracks
						</Button>
						<Typography
							variant="headline"
							style={{ color: 'white', fontWeight: 'bold' }}
						>
							{this.switchTitle()}
						</Typography>
						<Button
							className={classes.switchButton}
							variant="extendedFab"
							onClick={() => this.handleClick()}
							disabled={this.state.switchView}
						>
							See Artists
						</Button>
					</CardActions>
					{this.switchView()}
					<Recommendations />
				</Card>
			</div>
		)
	}
}

Homepage.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Homepage)
