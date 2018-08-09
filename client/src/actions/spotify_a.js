import Spotify from "spotify-web-api-js"

const spotifyWebApi = new Spotify()

export const GET_NOW_PLAYING = "GET_NOW_PLAYING"
export const GET_RECOMMENDATIONS = "GET_RECOMMENDATIONS"
export const GET_TOP_ARTISTS = "GET_TOP_ARTISTS"
export const GET_TOP_TRACKS = "GET_TOP_TRACKS"

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

// Fetches top 20 tracks over the last 6 months for the current user.
// (NOTE: 20 is default, can retrieve custom amount by setting `{limit: #}` param in request)
export const getTopTracks = () => dispatch => {
    
	spotifyWebApi.getMyTopTracks({limit: 10})
		.then(response => {
			dispatch({
				type: GET_TOP_TRACKS,
				payload: response.items
			})
		})
		.catch((error) => {
			console.error(error)
		})
}


export const getTrackRecommendations = (seeds) => dispatch => {
    
	spotifyWebApi.getRecommendations({seed_tracks: seeds})
		.then(response => {
			dispatch({
				type: GET_RECOMMENDATIONS,
				payload: response
			})
		})
		.catch((error) => {
			console.error(error)
		})
}

export const getArtistRecommendations = (seeds) => dispatch => {
    
	spotifyWebApi.getRecommendations({seed_artists: seeds})
		.then(response => {
			dispatch({
				type: GET_RECOMMENDATIONS,
				payload: response
			})
		})
		.catch((error) => {
			console.error(error)
		})
}