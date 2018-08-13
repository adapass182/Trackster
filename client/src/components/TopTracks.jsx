import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Message from './Message'

import { getTrackRecommendations, getTopTracks } from '../actions/spotify_a'
import { addTrack, remTrack } from '../actions/selector_a'

import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import {
	Button,
	Checkbox,
	Grid,
	GridListTile,
	GridListTileBar,
	withStyles
} from '@material-ui/core'

const styles = () => ({
	root: {
		flexGrow: 1,
		padding: '1rem'
	},
	main: {
		justifyContent: 'space-around',
		alignItems: 'center'
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
		margin: '2rem'
	}
})

class TopTracks extends PureComponent {
	state = {
		open: false,
		message: ''
	}

	componentDidMount() {
		this.props.getTopTracks()
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
				message: 'Choose up to 5 tracks to get recommendations'
			})
		} else {
			this.props.getTrackRecommendations(this.props.selectedTracks)
		}
	}

	render() {
		const { classes, topTracks } = this.props

		return (
			<div className={classes.root}>
				<Grid container spacing={24} className={classes.main}>
					{topTracks.map(track => (
						<Grid item s={3} xs={6} key={track.name} className={classes.item}>
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
					))}
					<Button
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
	{ addTrack, getTrackRecommendations, getTopTracks, remTrack }
)(withStyles(styles)(TopTracks))
