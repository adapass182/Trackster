import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'

// Default error component

const styles = () => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		marginBottom: '4rem'
	}
})

class Error extends PureComponent {
	render() {
		const { classes, message } = this.props
		return (
			<div className={classes.root}>
				<Typography style={{ color: 'red', fontWeight: 'bold' }}>
					{message}
				</Typography>
			</div>
		)
	}
}

Error.propTypes = {
	classes: PropTypes.object.isRequired,
	message: PropTypes.string.isRequired
}

export default withStyles(styles)(Error)
