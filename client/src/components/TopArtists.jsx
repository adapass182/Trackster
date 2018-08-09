import React, { PureComponent } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { getTopArtists } from "../actions/spotify_a"
import { addArtist, remArtist } from "../actions/selector_a"

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


class TopArtists extends PureComponent {

	componentDidMount() {
		this.props.getTopArtists()
	}

	handleChange = (event) => {
		if (event.target.checked === true) {
			this.props.addArtist(event.target.value)
		}
		if (event.target.checked === false) {
			this.props.remArtist(event.target.value)
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
	addArtist: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	getTopArtists: PropTypes.func.isRequired,
	remArtist: PropTypes.func.isRequired,
	topArtists: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		topArtists: state.topArtists
	}
}

export default connect(mapStateToProps, {addArtist, getTopArtists, remArtist})(withStyles(styles)(TopArtists))
