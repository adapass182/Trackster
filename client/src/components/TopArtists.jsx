import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Message from './Message'

import { getArtistRecommendations, getTopArtists } from '../actions/spotify_a'
import { addArtist, remArtist } from '../actions/selector_a'

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

class TopArtists extends PureComponent {
	state = {
		open: false,
		message: ''
	}

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

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		this.setState({ open: false })
	}

	getNew = () => {
		if (this.props.selectedArtists.length === 0) {
			this.setState({
				open: true,
				message: 'Choose up to 5 artists to get recommendations'
			})
		} else {
			this.props.getArtistRecommendations(this.props.selectedArtists)
		}
	}

	render() {
		const { classes, topArtists } = this.props

		return (
			<div className={classes.root}>
				<Grid container spacing={24} className={classes.main}>
					{topArtists.map(artist => (
						<Grid item s={3} xs={6} key={artist.name} className={classes.item}>
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
					))}
					<Button
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
