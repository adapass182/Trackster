import React, { PureComponent } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { getNowPlaying } from "../actions/spotify_a"

import { CircularProgress, GridListTile, GridListTileBar, ListSubheader, Typography, withStyles } from "@material-ui/core"

const styles = () => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
	}
})

class NowPlaying extends PureComponent {

	componentDidMount() {
		this.props.getNowPlaying()
	}
  
	isPlaying(nowPlaying, classes) {
		if (this.props.nowPlaying.albumName !== null) {
			return (
				<GridListTile key={nowPlaying.trackName} className={classes.root} cols={1}>
					<ListSubheader component="div" style={{fontSize: "2rem"}}>Now Playing</ListSubheader>
					<img src={ nowPlaying.image.url } alt="Album art" style={{width: 500, height: 450}}/>
					<GridListTileBar
						title={nowPlaying.trackName}
						subtitle={nowPlaying.artistName}
					/>
				</GridListTile>
			)
		} else {
			return (
				<div>
					<CircularProgress className={classes.progress} size={50} />
					<Typography>Loading...</Typography>
				</div>
			)
		}
	}

	render() {

		const { classes, nowPlaying } = this.props

		return (
			<div className={classes.root}>
				{this.isPlaying(nowPlaying, classes)}
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

export default connect(mapStateToProps, { getNowPlaying })(withStyles(styles)(NowPlaying))
