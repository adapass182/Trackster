import React, { PureComponent } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { getTopArtists } from "../actions/spotify_a"

import { GridList, GridListTile, GridListTileBar, IconButton, withStyles, Typography } from "@material-ui/core"
import StarBorderIcon from "@material-ui/icons/StarBorder"

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
		spacing: 0,
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

	render() {

		const { classes, topArtists } = this.props

		return (
			<div className={classes.root}>
				<Typography variant="headline">Your Top Artists</Typography>
				<GridList className={classes.gridList} >
					{topArtists.map((artist) => (
						<GridListTile key={artist.name} cols={1}>
							<img src={artist.images[0].url || null} alt={artist.name} />
							<GridListTileBar
								className={classes.titleWrap}
								title={artist.name}
								actionIcon={
									<IconButton className={classes.icon}>
										<StarBorderIcon />
									</IconButton>
								}
								actionPosition="left"
							/>
						</GridListTile>
					))}
				</GridList>
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

export default connect(mapStateToProps, {getTopArtists})(withStyles(styles)(TopArtists))
