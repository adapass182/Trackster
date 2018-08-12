import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getNowPlaying } from '../actions/spotify_a'

import {
	Grid,
	GridListTile,
	GridListTileBar,
	IconButton,
	Typography,
	withStyles
} from '@material-ui/core'
import Refresh from '@material-ui/icons/Refresh'

const styles = () => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		listStyleType: 'none'
	},
	icon: {
		color: 'white'
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
									maxHeight: '100%',
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
				<div>
					<Typography>
						{`I can't hear anything! Make sure you're playing a song on your
						Spotify account, then click below and I'll have another listen...`}
					</Typography>
				</div>
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
