import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getNowPlaying } from '../actions/spotify_a'

import {
	Button,
	Grid,
	GridListTile,
	GridListTileBar,
	Typography,
	withStyles
} from '@material-ui/core'

const styles = () => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		listStyleType: 'none'
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
				<div>
					<Button
						variant="raised"
						color="primary"
						type="submit"
						onClick={() => this.props.getNowPlaying()}
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
