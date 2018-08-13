import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
	Button,
	GridListTile,
	GridListTileBar,
	MobileStepper,
	withStyles
} from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'

const styles = () => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		marginBottom: '4rem'
	},
	img: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		height: 400,
		maxWidth: 400,
		overflow: 'hidden',
		width: '100%',
		margin: '1rem auto 0.2rem auto'
	},
	mobileStepper: {
		borderBottom: '2rem',
		background: 'black'
	},
	button: {
		background: '#1db954',
		'&:hover': {
			background: '#1db500'
		},
		color: 'white',
		fontWeight: 'bold',
		padding: '1rem inherit'
	},
	dot: {
		backgroundColor: 'white'
	},
	dotActive: {
		backgroundColor: '#1db954'
	}
})

class Recommendations extends Component {
	state = {
		activeStep: 0
	}

	componentDidMount() {
		window.scrollTo({
			left: 0,
			top: document.body.scrollHeight,
			behavior: 'smooth'
		})
	}

	componentDidUpdate(prevProps) {
		if (prevProps.recommendations !== this.props.recommendations) {
			this.setState({ activeStep: 0 })
		}
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

		return (
			<div className={classes.root}>
				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={this.state.activeStep}
					onChangeIndex={this.handleStepChange}
					enableMouseEvents
				>
					{recommendations.tracks.map(track => (
						<GridListTile key={track.id} className={classes.img} cols={1}>
							<img
								src={track.album.images[1].url}
								alt={track.name}
								className={classes.img}
							/>
							<GridListTileBar
								title={track.name}
								subtitle={track.artists[0].name}
							/>
						</GridListTile>
					))}
				</SwipeableViews>
				<MobileStepper
					variant="dots"
					steps={recommendations.tracks.length}
					position="static"
					activeStep={activeStep}
					className={classes.mobileStepper}
					classes={{
						dot: classes.dot,
						dotActive: classes.dotActive
					}}
					nextButton={
						<Button
							classes={{ root: classes.button }}
							style={{ marginLeft: '0.5rem' }}
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
							classes={{ root: classes.button }}
							style={{ marginRight: '0.5rem' }}
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

Recommendations.propTypes = {
	classes: PropTypes.object.isRequired,
	recommendations: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	windowBottom: PropTypes.object.isRequired
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
