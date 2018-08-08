import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'

import TopArtists from './TopArtists'
import NowPlaying from './NowPlaying'

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
      topArtists: [{
        name: null,
        images: [{
          url: "test"
        }]
      }],
      isPlaying: false
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
          },
          isPlaying: true
        })
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          isPLaying: false
        })
      })
  }

  getTopArtists() {
    // Fetches top 20 artists over the last 6 months for the current user.
    // (NOTE: 20 is default, can retrieve custom amount by setting `{limit: #}` param in request)
    spotifyWebApi.getMyTopArtists({limit: 8})
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
        <Card className="App">
          <CardMedia>
            <NowPlaying nowPlaying={this.state.nowPlaying} isPlaying={this.state.isPlaying}/>
          </CardMedia>
          <TopArtists topArtists={this.state.topArtists} />
          <CardActions style={{justifyContent: "center"}}>
            {this.isLoggedIn()}
          </CardActions>
          <CardActions style={{justifyContent: "right"}}>
            {this.logOut()}
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default Container;
