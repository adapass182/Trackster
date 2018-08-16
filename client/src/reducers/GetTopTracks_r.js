import { GET_TOP_TRACKS } from '../actions/spotify_a'

let initialState_Tracks = [
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

export default (state = initialState_Tracks, { type, payload }) => {
	switch (type) {
	case GET_TOP_TRACKS:
		return payload
	default:
		return state
	}
}
