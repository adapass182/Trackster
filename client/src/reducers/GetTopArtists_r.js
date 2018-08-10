import { GET_TOP_ARTISTS } from '../actions/spotify_a'

let y = [
	{
		name: null,
		images: [{ url: 'test' }]
	}
]

export default (state = y, { type, payload }) => {
	switch (type) {
	case GET_TOP_ARTISTS:
		return payload
	default:
		return state
	}
}
