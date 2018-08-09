import Spotify from "spotify-web-api-js"

const spotifyWebApi = new Spotify()

export const GET_NOW_PLAYING = "GET_NOW_PLAYING"
export const GET_TOP_ARTISTS = "GET_TOP_ARTISTS" 

// Fetches current playing track for logged in user.
export const getNowPlaying = () => dispatch => {

	spotifyWebApi.getMyCurrentPlaybackState()
		.then(response => {
			dispatch({
				type: GET_NOW_PLAYING,
				payload: response.item
			})
		})
		.catch((error) => {
			console.error(error)
		})
}

// Fetches top 20 artists over the last 6 months for the current user.
// (NOTE: 20 is default, can retrieve custom amount by setting `{limit: #}` param in request)
export const getTopArtists = () => dispatch => {
    
	spotifyWebApi.getMyTopArtists({limit: 8})
		.then(response => {
			dispatch({
				type: GET_TOP_ARTISTS,
				payload: response.items
			})
		})
		.catch((error) => {
			console.error(error)
		})
}