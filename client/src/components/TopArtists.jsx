import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Message from './utilities/Message'

import { startLoading } from '../actions/loading_a'
import { addArtist, remArtist } from '../actions/selector_a'
import { getArtistRecommendations, getTopArtists } from '../actions/spotify_a'

import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import {
	Button,
	Checkbox,
	Grid,
	GridListTile,
	GridListTileBar,
	Slide,
	withStyles
} from '@material-ui/core'

const styles = () => ({
	root: {
		flexSlide: 1,
		padding: '1rem'
	},
	main: {
		justifyContent: 'space-around',
		alignItems: 'center',
		direction: 'row'
	},
	item: {
		listStyleType: 'none',
		maxHeight: '320px',
		maxWidth: '320px',
		objectFit: 'contain'
	},
	gridBar: {
		overflow: 'hidden'
	},
	icon: {
		color: 'white'
	},
	button: {
		margin: '2rem',
		background: '#1db954',
		'&:hover': {
			background: '#1db500'
		},
		color: 'white',
		fontWeight: 'bold'
	}
})

class TopArtists extends PureComponent {
	state = {
		open: false,
		message: '',
		checked: false
	}

	// Checked state used to manage transition animations
	componentDidMount() {
		this.setState({
			checked: true
		})
	}

	componentWillUnmount() {
		this.setState({
			checked: false
		})
	}

	// Ensures no more than 5 seeds are provided to recommendations GET request
	counter = 0

	// Adds artist ID's to state, used as seeds for recommendations
	handleChange = event => {
		if (event.target.checked && this.counter < 5) {
			this.props.addArtist(event.target.value)
			++this.counter
			return (event.target.checked = true)
		}
		if (event.target.checked && this.counter === 5) {
			this.setState({
				open: true,
				message: 'Max 5 artists for recommendations'
			})
			return (event.target.checked = false)
		}
		if (!event.target.checked) {
			this.props.remArtist(event.target.value)
			--this.counter
			return (event.target.checked = false)
		}
	}

	// Snackbar close function (set in Message component to auto-close in 2secs)
	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		this.setState({ open: false })
	}

	// Checks that some Spotify ID seeds are present in state and executes get request, otherwise opens a snackbar prompt
	getNew = () => {
		if (this.props.selectedArtists.length === 0) {
			this.setState({
				open: true,
				message:
					'Click the star icon to select up to 5 artists and get recommendations'
			})
		} else {
			this.props.startLoading()
			this.props.getArtistRecommendations(this.props.selectedArtists)
		}
	}

	render() {
		const { classes, topArtists } = this.props
		const { checked } = this.state

		return (
			<div className={classes.root}>
				<Grid container spacing={24} className={classes.main}>
					{topArtists.map(artist => (
						<Slide
							direction="left"
							in={checked}
							mountOnEnter
							unmountOnExit
							timeout={800}
							key={artist.name}
						>
							<Grid item s={3} xs={6} className={classes.item}>
								<GridListTile>
									<img
										src={artist.images[0].url}
										alt={artist.name}
										style={{ width: '300px', height: '300px' }}
									/>
									<GridListTileBar
										className={classes.gridBar}
										title={artist.name}
										actionIcon={
											<Checkbox
												type="checkbox"
												className={classes.icon}
												icon={<StarBorder />}
												checkedIcon={<Star />}
												value={artist.id}
												onClick={this.handleChange}
											/>
										}
										actionPosition="left"
									/>
								</GridListTile>
							</Grid>
						</Slide>
					))}
					<Button
						classes={{ root: classes.button }}
						variant="extendedFab"
						className={classes.button}
						type="submit"
						onClick={this.getNew}
					>
						Get recommendations
					</Button>
					<Message
						open={this.state.open}
						message={this.state.message}
						handleClose={this.handleClose}
					/>
				</Grid>
			</div>
		)
	}
}

TopArtists.propTypes = {
	addArtist: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	getArtistRecommendations: PropTypes.func.isRequired,
	getTopArtists: PropTypes.func.isRequired,
	remArtist: PropTypes.func.isRequired,
	selectedArtists: PropTypes.array.isRequired,
	startLoading: PropTypes.func.isRequired,
	topArtists: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		selectedArtists: state.selectedArtists,
		topArtists: state.topArtists
	}
}

export default connect(
	mapStateToProps,
	{
		addArtist,
		getArtistRecommendations,
		getTopArtists,
		remArtist,
		startLoading
	}
)(withStyles(styles)(TopArtists))
