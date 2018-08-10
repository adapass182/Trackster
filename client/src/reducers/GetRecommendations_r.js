import { GET_RECOMMENDATIONS } from '../actions/spotify_a'

let def = {
	tracks: [
		{ name: 'test', album: { images: ['url'] }, artists: [{ name: 'test' }] }
	]
}

export default (state = def, { type, payload }) => {
	switch (type) {
	case GET_RECOMMENDATIONS:
		return payload
	default:
		return state
	}
}
