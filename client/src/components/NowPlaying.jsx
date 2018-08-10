import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getNowPlaying } from '../actions/spotify_a'

import {
	Button,
	GridListTile,
	GridListTileBar,
	ListSubheader,
	Typography,
	withStyles
} from '@material-ui/core'

const styles = () => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden'
	}
})

class NowPlaying extends PureComponent {
	isPlaying(nowPlaying, classes) {
		this.props.getNowPlaying()
		if (this.props.nowPlaying.albumName !== null) {
			return (
				<GridListTile
					key={nowPlaying.trackName}
					className={classes.root}
					cols={1}
				>
					<ListSubheader component="div" style={{ fontSize: '2rem' }}>
						Now Playing
					</ListSubheader>
					<img
						src={nowPlaying.image.url}
						alt="Album art"
						style={{ width: 500, height: 450 }}
					/>
					<GridListTileBar
						title={nowPlaying.trackName}
						subtitle={nowPlaying.artistName}
					/>
				</GridListTile>
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
				<div>
					<Button
						variant="raised"
						color="primary"
						type="submit"
						onClick={() => this.isPlaying(nowPlaying, classes)}
					>
						Listen again
					</Button>
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
