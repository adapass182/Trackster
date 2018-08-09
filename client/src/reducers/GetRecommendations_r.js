import { GET_RECOMMENDATIONS } from "../actions/spotify_a"

export default (state = {}, { type, payload }) => {
	switch (type) {
	case GET_RECOMMENDATIONS:
		return payload
	default:
		return state
	}
}