import React, { PureComponent } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { getTopTracks } from "../actions/spotify_a"
import { addTrack, remTrack } from "../actions/selector_a"

import Star from "@material-ui/icons/Star"
import StarBorder from "@material-ui/icons/StarBorder"
import { Checkbox, GridList, GridListTile, GridListTileBar, withStyles, Typography } from "@material-ui/core"

const styles = () => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		width: "100%",
		height: "100%",
		paddingTop: "20px",
		paddingBottom: "20px",
		spacing: 0
	},
	gridList: {
		flexGrow: 1,
		margin: 0,
		spacing: 8
	},
	titleWrap: {
		overflow: "visible"
	},
	icon: {
		color: "white"
	}
})


class TopTracks extends PureComponent {

	componentDidMount() {
		this.props.getTopTracks()
	}

	handleChange = (event) => {
		if (event.target.checked === true) {
			this.props.addTrack(event.target.value)
		}
		if (event.target.checked === false) {
			this.props.remTrack(event.target.value)
		}
	}

	render() {

		const { classes, topTracks } = this.props

		return (
			<div className={classes.root}>
				<Typography variant="headline">Your Top Tracks</Typography>
				<form>
					<GridList className={classes.gridList} >
						{topTracks.map((track) => (
							<GridListTile key={track.name} cols={1}>
								<img src={track.album.images[0].url || null} alt={track.name} />
								<GridListTileBar
									className={classes.titleWrap}
									title={track.name}
									subtitle={track.artists[0].name}
									actionIcon={
										<Checkbox
											className={classes.icon}
											icon={<StarBorder />}
											checkedIcon={<Star />}
											value={track.id}
											onChange={this.handleChange}
										/>
									}
									actionPosition="left"
								/>
							</GridListTile>
						))}
					</GridList>
				</form>
			</div>
		)
	}
	
}

TopTracks.propTypes = {
	addTrack: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	getTopTracks: PropTypes.func.isRequired,
	remTrack: PropTypes.func.isRequired,
	topTracks: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		topTracks: state.topTracks
	}
}

export default connect(mapStateToProps, {addTrack, getTopTracks, remTrack})(withStyles(styles)(TopTracks))
