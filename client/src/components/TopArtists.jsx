import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getArtistRecommendations, getTopArtists } from '../actions/spotify_a'
import { addArtist, remArtist } from '../actions/selector_a'

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
		width: '100%',
		height: '100%',
		paddingTop: '20px',
		paddingBottom: '20px',
		spacing: 0
	},
	gridList: {
		flexGrow: 1,
		margin: 0,
		spacing: 8
	},
	titleWrap: {
		overflow: 'visible'
	},
	icon: {
		color: 'white'
	}
})

class TopArtists extends PureComponent {
	componentDidMount() {
		this.props.getTopArtists()
	}

	counter = 0

	handleChange = event => {
		if (event.target.checked && this.counter < 5) {
			this.props.addArtist(event.target.value)
			++this.counter
			return (event.target.checked = true)
		}
		if (event.target.checked && this.counter === 5) {
			window.alert('Woah there! Spotify can only handle 5 at a time, go easy!')
			return (event.target.checked = false)
		}
		if (!event.target.checked) {
			this.props.remArtist(event.target.value)
			--this.counter
			return (event.target.checked = false)
		}
	}

	getNew = () => {
		if (this.props.selectedArtists.length === 0) {
			window.alert(
				'Select up to 5 artists above by clicking the star icon to get recommendations'
			)
		} else {
			this.props.getArtistRecommendations(this.props.selectedArtists)
		}
	}

	render() {
		const { classes, topArtists } = this.props

		return (
			<div className={classes.root}>
				<div>
					<Typography variant="headline" className={classes.header}>
						Your Top Artists
					</Typography>
					<Typography>
						Pick up to 5 of your top artists and hit the button below for some
						new tunes!
					</Typography>
				</div>
				<br />
				<form>
					<GridList className={classes.gridList}>
						{topArtists.map(artist => (
							<GridListTile key={artist.name} cols={1}>
								<img src={artist.images[0].url || 'test'} alt={artist.name} />
								<GridListTileBar
									className={classes.titleWrap}
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

TopArtists.propTypes = {
	addArtist: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	getArtistRecommendations: PropTypes.func.isRequired,
	getTopArtists: PropTypes.func.isRequired,
	remArtist: PropTypes.func.isRequired,
	selectedArtists: PropTypes.array.isRequired,
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
	{ addArtist, getArtistRecommendations, getTopArtists, remArtist }
)(withStyles(styles)(TopArtists))
