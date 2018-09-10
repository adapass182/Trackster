import { GET_TOP_ARTISTS } from '../actions/spotify_a'

let initialState_Artists = [
	{
		name: null,
		images: [{ url: '' }]
	}
]

export default (state = initialState_Artists, { type, payload }) => {
	switch (type) {
	case GET_TOP_ARTISTS:
		return payload
	default:
		return state
	}
}
