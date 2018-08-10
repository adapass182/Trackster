import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
	GridList,
	GridListTile,
	GridListTileBar,
	withStyles,
	Typography
} from '@material-ui/core'

const styles = () => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		width: '100%',
		height: '100%',
		paddingTop: '20px',
		paddingBottom: '20px',
		spacing: 0
	},
	gridList: {
		flexWrap: 'nowrap'
	},
	titleWrap: {
		overflow: 'visible'
	}
})

class Recommendations extends PureComponent {
	componentDidUpdate() {
		window.scrollTo(0, document.body.scrollHeight)
	}

	render() {
		const { classes, recommendations } = this.props

		return (
			<div>
				<Typography>You might like these...</Typography>
				<GridList className={classes.gridList}>
					{recommendations.tracks.map(track => (
						<GridListTile key={track.name} cols={2.5}>
							<img src={track.album.images[0].url} alt={track.name} />
							<GridListTileBar
								className={classes.titleWrap}
								title={track.name}
								subtitle={track.artists[0].name}
							/>
						</GridListTile>
					))}
				</GridList>
			</div>
		)
	}
}

Recommendations.propTypes = {
	classes: PropTypes.object.isRequired,
	recommendations: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		recommendations: state.recommendations
	}
}

export default connect(
	mapStateToProps,
	null
)(withStyles(styles)(Recommendations))
