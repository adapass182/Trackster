import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
	GridList,
	GridListTile,
	GridListTileBar,
	withStyles
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
		flexGrow: 1,
		margin: 0,
		spacing: 8
	},
	titleWrap: {
		overflow: 'visible'
	}
})

class Recommendations extends PureComponent {
	render() {
		const { classes, recommendations } = this.props

		return (
			<GridList className={classes.gridList}>
				{recommendations.tracks.map(track => (
					<GridListTile key={track.name} cols={1}>
						<img src={track.album.images[0].url} alt={track.name} />
						<GridListTileBar
							className={classes.titleWrap}
							title={track.name}
							subtitle={track.artists[0].name}
						/>
					</GridListTile>
				))}
			</GridList>
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
