import { GET_RECOMMENDATIONS } from '../actions/spotify_a'
import { STOP_LOADING } from '../actions/selector_a'

export default (state = false, { type }) => {
	switch (type) {
	case GET_RECOMMENDATIONS:
		return (state = true)
	case STOP_LOADING:
		return (state = false)
	default:
		return state
	}
}
