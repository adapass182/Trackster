import React, { Component } from 'react'
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography
} from '@material-ui/core'

class Splash extends Component {
	render() {
		return (
			<Card
				style={{
					textAlign: 'center',
					background: 'black',
					marginTop: '4rem'
				}}
			>
				<CardContent>
					<Typography
						variant="headline"
						style={{ color: 'white', fontWeight: 'bold' }}
					>
						Welcome to Trackster
					</Typography>
				</CardContent>
				<CardActions style={{ justifyContent: 'center' }}>
					<Button
						style={{
							background: '#1db954',
							'&:hover': {
								background: '#1db500'
							},
							color: 'white',
							fontWeight: 'bold',
							padding: '1rem inherit'
						}}
						variant="raised"
						href="http://localhost:8888"
					>
						Login with Spotify
					</Button>
				</CardActions>
			</Card>
		)
	}
}

export default Splash
