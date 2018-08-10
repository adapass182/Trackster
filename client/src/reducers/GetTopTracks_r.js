import { GET_TOP_TRACKS } from '../actions/spotify_a'

let y = [
	{
		name: null,
		album: {
			images: [
				{
					url: ''
				}
			]
		},
		artists: [{ name: '' }]
	}
]

export default (state = y, { type, payload }) => {
	switch (type) {
	case GET_TOP_TRACKS:
		return payload
	default:
		return state
	}
}
