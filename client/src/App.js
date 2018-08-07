import React, { Component } from 'react'
import './App.css'
import Spotify from 'spotify-web-api-js'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'

const spotifyWebApi = new Spotify()

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams()
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: "Click the button to see what's playing!",
        artist: "",
        image: ""
      },
      topArtists: [{name: null}]
    }

    if(params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }

  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            artist: response.item.album.artists[0].name,
            image: response.item.album.images[0].url
          }
        })
      })
  }

  getTopArtists() {
    spotifyWebApi.getMyTopArtists()
      .then((response) => {
        this.setState({
          topArtists: response.items
        })
      })
      console.log(`Hi Adam! ` + Object.values(this.state.topArtists))
  }

  isLoggedIn() {
    if (this.state.loggedIn === true) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <Card className="App">
        <CardContent>
          <Typography>
            Now Playing <br/>
              Track: {this.state.nowPlaying.name} <br/>
              Artist: {this.state.nowPlaying.artist}
          </Typography>
        </CardContent>
        <CardMedia 
          style={{
            minHeight: "15rem"
          }} 
        >
          <img src={ this.state.nowPlaying.image } alt="Album art" style={{width: 200}}/>
        </CardMedia>
        <CardContent>
          <Typography>
            Your top Artists: <br/>
            {this.state.topArtists.map((artist, index) => {
              return (
              <Typography>
                {index + 1}: {artist.name}
              </Typography>
            )})}
          </Typography>
        </CardContent>
        <CardActions
          style={{
            justifyContent: "center"
        }}
        >
          <Button 
            onClick={() => this.getNowPlaying()}
            variant="raised"
            color="primary"
            type="submit"
          >
            Check Now Playing
          </Button>
          <Button 
            onClick={() => this.getTopArtists()}
            variant="raised"
            color="primary"
            type="submit"
          >
            Who's your favorite?
          </Button>
            <Button
              color="primary"
              variant="raised"
              disabled={this.isLoggedIn()}
              href="http://localhost:8888"
            >
              Login with Spotify
            </Button>
        </CardActions>
      </Card>
    );
  }
}

export default App;
