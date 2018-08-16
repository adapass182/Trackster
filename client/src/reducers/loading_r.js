import { START_LOADING } from '../actions/loading_a'
import {
	GET_RECOMMENDATIONS,
	GET_RECOMMENDATIONS_ERROR
} from '../actions/spotify_a'

export default (state = false, { type }) => {
	switch (type) {
	case START_LOADING:
		return true
	case GET_RECOMMENDATIONS:
		return false
	case GET_RECOMMENDATIONS_ERROR:
		return false
	default:
		return state
	}
}
