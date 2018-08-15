import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { stopLoading } from '../actions/selector_a'
import {
	Button,
	CircularProgress,
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
	},
	progress: {
		color: '#1db500',
		justifyContent: 'center'
	}
})

class Recommendations extends Component {
	state = {
		activeStep: 0
	}

	// Smooth scroll to bottom when component mounts
	componentDidMount() {
		window.scrollTo({
			left: 0,
			top: document.body.scrollHeight,
			behavior: 'smooth'
		})
	}

	// Sets active step back to start when new recommendations load
	componentDidUpdate(prevProps) {
		if (prevProps.recommendations !== this.props.recommendations) {
			this.setState({ activeStep: 0 })
		}
	}

	// Functions to handle mobileStepper
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

	delayDisplay = () => {
		setTimeout(() => this.props.stopLoading(), 3000)
	}

	render() {
		const { classes, loading, recommendations, theme } = this.props
		const { activeStep } = this.state

		if (loading === true) {
			this.delayDisplay()
			return (
				<div className={classes.root}>
					<CircularProgress classes={{ colorPrimary: classes.progress }} />
				</div>
			)
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
							<GridListTile key={track.id} className={classes.img} cols={1}>
								<a
									href={track.external_urls.spotify}
									target="_blank"
									rel="noopener noreferrer external"
								>
									<img
										src={track.album.images[1].url}
										alt={track.name}
										className={classes.img}
									/>
								</a>
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
}

Recommendations.propTypes = {
	classes: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	recommendations: PropTypes.object.isRequired,
	stopLoading: PropTypes.func.isRequired,
	theme: PropTypes.object.isRequired,
	windowBottom: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		loading: state.loading,
		recommendations: state.recommendations
	}
}

export default connect(
	mapStateToProps,
	{ stopLoading }
)(withStyles(styles, { withTheme: true })(Recommendations))
