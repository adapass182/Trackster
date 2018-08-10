import { GET_NOW_PLAYING } from '../actions/spotify_a'

export default (state = null, { type, payload }) => {
	switch (type) {
	case GET_NOW_PLAYING:
		state = {
			albumName: payload.album.name,
			artistName: payload.album.artists[0].name,
			trackName: payload.name,
			image: payload.album.images[0]
		}
		return state
	default:
		return state
	}
}
