import React, { Component } from 'react'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'

class Splash extends Component {
  
    render(){
        return(
            <Card>
                <CardContent>
                    <Typography>
                        Welcome to Trakster!
                    </Typography>
                </CardContent>
                <CardActions>
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

export default Splash;
