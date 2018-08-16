import { START_LOADING, STOP_LOADING } from '../actions/loading_a'

export default (state = false, { type }) => {
	switch (type) {
	case START_LOADING:
		return (state = true)
	case STOP_LOADING:
		return (state = false)
	default:
		return state
	}
}
