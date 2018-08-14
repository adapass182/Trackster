import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getTrackRecommendations, getTopTracks } from '../actions/spotify_a'
import { addTrack, remTrack } from '../actions/selector_a'

import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import {
	Button,
	Checkbox,
	GridList,
	GridListTile,
	GridListTileBar,
	withStyles,
	Typography
} from '@material-ui/core'

const styles = () => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		width: '90%',
		height: '100%',
		margin: 'auto',
		paddingTop: '20px',
		paddingBottom: '20px',
		spacing: 8
	},
	gridList: {
		width: 'auto',
		height: 'auto'
	},
	gridTile: {
		padding: '3rem'
	},
	gridBar: {
		overflow: 'hidden'
	},
	icon: {
		color: 'white'
	}
})

class TopTracks extends PureComponent {
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
			window.alert('Woah there! Spotify can only handle 5 at a time, go easy!')
			return (event.target.checked = false)
		}
		if (!event.target.checked) {
			this.props.remTrack(event.target.value)
			--this.counter
			return (event.target.checked = false)
		}
	}

	getNew = () => {
		if (this.props.selectedTracks.length === 0) {
			window.alert(
				'Select up to 5 tracks above by clicking the star icon to get recommendations'
			)
		} else {
			this.props.getTrackRecommendations(this.props.selectedTracks)
		}
	}

	render() {
		const { classes, topTracks } = this.props

		return (
			<div className={classes.root}>
				<div>
					<Typography variant="headline">Your Top Tracks</Typography>
					<Typography>
						Pick up to 5 of your top tracks and hit the button below for some
						new tunes!
					</Typography>
				</div>
				<br />
				<form>
					<GridList className={classes.gridList}>
						{topTracks.map(track => (
							<GridListTile key={track.name} className={classes.gridTile}>
								<img src={track.album.images[0].url || null} alt={track.name} />
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
						))}
					</GridList>
					<Button
						variant="raised"
						color="primary"
						type="submit"
						onClick={this.getNew}
					>
						Get recommendations
					</Button>
				</form>
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
