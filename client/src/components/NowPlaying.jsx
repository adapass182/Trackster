import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getNowPlaying } from '../actions/spotify_a'

import {
	Grid,
	GridListTile,
	GridListTileBar,
	IconButton,
	withStyles
} from '@material-ui/core'
import Refresh from '@material-ui/icons/Refresh'
import MusicOff from '@material-ui/icons/MusicOff'

const styles = () => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		listStyleType: 'none'
	},
	icon: {
		color: 'white'
	},
	tileBar: {
		overflow: 'auto'
	}
})

class NowPlaying extends PureComponent {
	componentDidMount() {
		this.props.getNowPlaying()
	}

	isPlaying(nowPlaying, classes) {
		if (this.props.nowPlaying !== null) {
			return (
				<Grid container spacing={24} className={classes.root}>
					<Grid item key={nowPlaying.trackName}>
						<GridListTile>
							<img
								src={nowPlaying.image.url}
								alt="AlbumArt"
								style={{
									width: '100%',
									maxHeight: '450px',
									objectFit: 'cover',
									margin: '2rem, auto'
								}}
							/>
							<GridListTileBar
								title={nowPlaying.trackName}
								subtitle={nowPlaying.artistName}
								actionIcon={
									<IconButton
										className={classes.icon}
										type="submit"
										onClick={() => this.props.getNowPlaying()}
									>
										<Refresh />
									</IconButton>
								}
								actionPosition="right"
							/>
						</GridListTile>
					</Grid>
				</Grid>
			)
		} else {
			return (
				<Grid container spacing={24} className={classes.root}>
					<Grid item key={'noPlayback'}>
						<GridListTile>
							<MusicOff style={{ color: 'white', fontSize: '450px' }} />
							<GridListTileBar
								className={classes.tileBar}
								title={'No Playback'}
								subtitle={
									'Start listening in Spotify and hit the refresh button!'
								}
								actionIcon={
									<IconButton
										className={classes.icon}
										type="submit"
										onClick={() => this.props.getNowPlaying()}
									>
										<Refresh />
									</IconButton>
								}
								actionPosition="right"
							/>
						</GridListTile>
					</Grid>
				</Grid>
			)
		}
	}

	render() {
		const { classes, nowPlaying } = this.props

		return (
			<div>
				<div className={classes.root}>
					{this.isPlaying(nowPlaying, classes)}
				</div>
			</div>
		)
	}
}

NowPlaying.propTypes = {
	classes: PropTypes.object.isRequired,
	nowPlaying: PropTypes.object.isRequired,
	getNowPlaying: PropTypes.func.isRequired
}

const mapStateToProps = state => {
	return {
		nowPlaying: state.nowPlaying
	}
}

export default connect(
	mapStateToProps,
	{ getNowPlaying }
)(withStyles(styles)(NowPlaying))
