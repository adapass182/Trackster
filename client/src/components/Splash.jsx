import React, { Component } from "react"
import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core"


class Splash extends Component {
  
	render(){

		return(
			<Card style={{textAlign: "center"}}>
				<CardContent>
					<Typography variant="headline">
                        Welcome to Trakster!
					</Typography>
				</CardContent>
				<CardActions style={{justifyContent: "center"}}>
					<Button
						color="primary"
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
