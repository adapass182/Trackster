import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Message from './utilities/Message'

import { startLoading } from '../actions/loading_a'
import { addTrack, remTrack } from '../actions/selector_a'
import { getTrackRecommendations, getTopTracks } from '../actions/spotify_a'

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

class TopTracks extends PureComponent {
	state = {
		open: false,
		message: '',
		checked: false
	}

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

	counter = 0

	handleChange = event => {
		if (event.target.checked && this.counter < 5) {
			this.props.addTrack(event.target.value)
			++this.counter
			return (event.target.checked = true)
		}
		if (event.target.checked && this.counter === 5) {
			this.setState({
				open: true,
				message: 'Max 5 tracks for recommendations'
			})
			return (event.target.checked = false)
		}
		if (!event.target.checked) {
			this.props.remTrack(event.target.value)
			--this.counter
			return (event.target.checked = false)
		}
	}

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		this.setState({ open: false })
	}

	getNew = () => {
		if (this.props.selectedTracks.length === 0) {
			this.setState({
				open: true,
				message:
					'Click the star icon to select up to 5 tracks and get recommendations'
			})
		} else {
			this.props.startLoading()
			this.props.getTrackRecommendations(this.props.selectedTracks)
		}
	}

	render() {
		const { classes, topTracks } = this.props
		const { checked } = this.state

		return (
			<div className={classes.root}>
				<Grid container direction="row" spacing={24} className={classes.main}>
					{topTracks.map(track => (
						<Slide
							direction="right"
							in={checked}
							mountOnEnter
							unmountOnExit
							timeout={800}
							key={track.name}
						>
							<Grid item s={3} xs={6} className={classes.item}>
								<GridListTile>
									<img
										src={track.album.images[0].url || null}
										alt={track.name}
										style={{ width: '300px', height: '300px' }}
									/>
									<GridListTileBar
										className={classes.gridBar}
										title={track.name}
										subtitle={track.artists[0].name}
										actionIcon={
											<Checkbox
												type="checkbox"
												className={classes.icon}
												icon={<StarBorder />}
												checkedIcon={<Star />}
												value={track.id}
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

TopTracks.propTypes = {
	addTrack: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	getTrackRecommendations: PropTypes.func.isRequired,
	getTopTracks: PropTypes.func.isRequired,
	remTrack: PropTypes.func.isRequired,
	selectedTracks: PropTypes.array.isRequired,
	startLoading: PropTypes.func.isRequired,
	topTracks: PropTypes.array.isRequired
}

const mapStateToProps = state => {
	return {
		selectedTracks: state.selectedTracks,
		topTracks: state.topTracks
	}
}

export default connect(
	mapStateToProps,
	{ addTrack, getTrackRecommendations, getTopTracks, remTrack, startLoading }
)(withStyles(styles)(TopTracks))
