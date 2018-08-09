import React, { PureComponent } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { getTopArtists } from "../actions/spotify_a"
import { addTrack, remTrack } from "../actions/selectTrack_a"

import Star from "@material-ui/icons/Star"
import StarBorder from "@material-ui/icons/StarBorder"
import { Checkbox, GridList, GridListTile, GridListTileBar, withStyles, Typography } from "@material-ui/core"

const styles = theme => ({
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
		width: "100%",
		height: "100%",
		margin: 0,
		spacing: 8
	},
	subheader: {
		width: "100%"
	},
	titleWrap: {
		overflow: "visible"
	},
	icon: {
		color: "white"
	}
})


class TopArtists extends PureComponent {

	componentDidMount() {
		this.props.getTopArtists()
	}

	handleChange = (event) => {
		console.log(event.target.value)
		console.log("Hi Adam, checked check: " + event.target.checked)
		if (event.target.checked === true) {
			this.props.addTrack(event.target.value)
		}
		if (event.target.checked === false) {
			this.props.remTrack(event.target.value)
		}
	}

	render() {

		const { classes, topArtists } = this.props

		return (
			<div className={classes.root}>
				<Typography variant="headline">Your Top Artists</Typography>
				<form>
					<GridList className={classes.gridList} >
						{topArtists.map((artist) => (
							<GridListTile key={artist.name} cols={1}>
								<img src={artist.images[0].url || null} alt={artist.name} />
								<GridListTileBar
									className={classes.titleWrap}
									title={artist.name}
									actionIcon={
										<Checkbox
											className={classes.icon}
											icon={<StarBorder />}
											checkedIcon={<Star />}
											value={artist.name}
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

TopArtists.propTypes = {
	classes: PropTypes.object.isRequired,
	topArtists: PropTypes.object.isRequired,
	getTopArtists: PropTypes.func.isRequired
}

const mapStateToProps = state => {
	return {
		topArtists: state.topArtists
	}
}

export default connect(mapStateToProps, {addTrack, getTopArtists, remTrack})(withStyles(styles)(TopArtists))
