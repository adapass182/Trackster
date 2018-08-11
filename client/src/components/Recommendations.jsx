import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, MobileStepper, withStyles } from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		marginBottom: '2rem'
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		paddingLeft: theme.spacing.unit * 4,
		marginBottom: 20,
		backgroundColor: theme.palette.background.default
	},
	img: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		height: 400,
		maxWidth: 400,
		overflow: 'hidden',
		width: '100%',
		margin: '3rem auto 0.2rem auto'
	}
})

class Recommendations extends Component {
	state = {
		activeStep: 0
	}

	componentDidUpdate() {
		window.scrollTo(0, document.body.scrollHeight)
	}

	handleNext = () => {
		this.setState(prevState => ({
			activeStep: prevState.activeStep + 1
		}))
	}

	handleBack = () => {
		this.setState(prevState => ({
			activeStep: prevState.activeStep - 1
		}))
	}

	handleStepChange = activeStep => {
		this.setState({ activeStep })
	}

	render() {
		const { classes, recommendations, theme } = this.props
		const { activeStep } = this.state

		if (recommendations === null) {
			return null
		} else {
			return (
				<div className={classes.root}>
					<SwipeableViews
						axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
						index={this.state.activeStep}
						onChangeIndex={this.handleStepChange}
						enableMouseEvents
					>
						{recommendations.tracks.map(track => (
							<img
								key={track.id}
								className={classes.img}
								src={track.album.images[1].url}
								alt={track.name}
							/>
						))}
					</SwipeableViews>
					<MobileStepper
						steps={recommendations.tracks.length}
						position="static"
						activeStep={activeStep}
						className={classes.mobileStepper}
						nextButton={
							<Button
								size="small"
								onClick={this.handleNext}
								disabled={activeStep === recommendations.tracks.length - 1}
							>
								Next
								{theme.direction === 'rtl' ? (
									<KeyboardArrowLeft />
								) : (
									<KeyboardArrowRight />
								)}
							</Button>
						}
						backButton={
							<Button
								size="small"
								onClick={this.handleBack}
								disabled={activeStep === 0}
							>
								{theme.direction === 'rtl' ? (
									<KeyboardArrowRight />
								) : (
									<KeyboardArrowLeft />
								)}
								Back
							</Button>
						}
					/>
				</div>
			)
		}
	}
}

Recommendations.propTypes = {
	classes: PropTypes.object.isRequired,
	recommendations: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		recommendations: state.recommendations
	}
}

export default connect(
	mapStateToProps,
	null
)(withStyles(styles, { withTheme: true })(Recommendations))
