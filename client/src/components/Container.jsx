import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'

const spotifyWebApi = new Spotify()

class Container extends Component {
  constructor(){
    super();
    const params = this.getHashParams()
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: "",
        artist: "",
        image: ""
      },
      topArtists: [{name: null}]
    }

    if(params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }

  }

  componentDidMount() {
    this.getNowPlaying()
    this.getTopArtists()
  }

  getHashParams() {
    // ???
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying() {
    // Fetches current playing track for logged in user.
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
    // Fetches top 20 artists over the last 6 months for the current user.
    spotifyWebApi.getMyTopArtists()
      .then((response) => {
        this.setState({
          topArtists: response.items
        })
      })
  }

  isLoggedIn() {
    // If this.state.loggedIn === false, will display login button. 
    // Otherwise returns null, user cannot login when already logged in.
    if (this.state.loggedIn === false) { 
      return (
        <Button
          color="primary"
          variant="raised"
          href="http://localhost:8888"
        >
          Login with Spotify
        </Button>
      )
    } else {
      return null
    }
  }

  logOut() {
    if (this.state.loggedIn === true) {
      return (
        <Button 
              variant="raised"
              color="primary"
              type="submit"
              href="http://localhost:3000"
            >
              Logout
            </Button>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        {this.logOut()}
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
            {/* <Button 
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
            </Button> */}
            {this.isLoggedIn()}
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default Container;
