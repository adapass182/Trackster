import {
	GET_RECOMMENDATIONS,
	GET_RECOMMENDATIONS_ERROR
} from '../actions/spotify_a'

export default (state = null, { type, payload }) => {
	switch (type) {
	case GET_RECOMMENDATIONS:
		return { ...payload, error: false }
	case GET_RECOMMENDATIONS_ERROR:
		return {
			status: payload.status,
			statusText: payload.statusText,
			error: true
		}
	default:
		return state
	}
}
