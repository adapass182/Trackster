import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spotify from 'spotify-web-api-js'
import {
	getNowPlaying,
	getTopArtists,
	getTopTracks
} from '../actions/spotify_a'

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
	button: {
		background: '#1db954',
		'&:hover': {
			background: '#1db500'
		},
		color: 'white',
		fontWeight: 'bold'
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
			switchView: false
		}
		if (params.access_token) {
			spotifyWebApi.setAccessToken(params.access_token)
		}
	}

	componentDidMount() {
		this.props.getNowPlaying()
		this.props.getTopArtists()
		this.props.getTopTracks()
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

	// Handles click event to switch state and render new component
	handleClick() {
		this.setState(prevState => ({
			switchView: !prevState.switchView
		}))
		window.scrollTo({
			top: 510,
			behavior: 'smooth'
		})
	}

	// Switches between TopArtists and TopTracks components
	switchView() {
		if (this.state.switchView === true) {
			return <TopArtists />
		} else {
			return <TopTracks />
		}
	}

	// Displays different title depending on which component is currently rendered
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
							classes={{ root: classes.button }}
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
							classes={{ root: classes.button }}
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
							classes={{ root: classes.button }}
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
	classes: PropTypes.object.isRequired,
	getNowPlaying: PropTypes.func.isRequired,
	getTopArtists: PropTypes.func.isRequired,
	getTopTracks: PropTypes.func.isRequired,
	recommendations: PropTypes.object
}

const mapStateToProps = state => {
	return {
		recommendations: state.recommendations
	}
}

export default connect(
	mapStateToProps,
	{ getNowPlaying, getTopArtists, getTopTracks }
)(withStyles(styles)(Homepage))
