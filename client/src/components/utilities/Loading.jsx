import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CircularProgress, withStyles } from '@material-ui/core'

// Circular loading component

const styles = () => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		marginBottom: '4rem'
	},
	progress: {
		color: '#1db500',
		justifyContent: 'center'
	},
	position: {
		marginBottom: '11rem',
		marginTop: '4rem'
	}
})

class Loading extends PureComponent {
	render() {
		const { classes } = this.props
		return (
			<div className={classes.root}>
				<CircularProgress
					classes={{ colorPrimary: classes.progress, root: classes.position }}
				/>
			</div>
		)
	}
}

Loading.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Loading)
