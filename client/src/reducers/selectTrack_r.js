import { ADD_TRACK, REM_TRACK } from '../actions/selector_a'

export default (state = [], { type, payload }) => {
	switch (type) {
	case ADD_TRACK:
		state.push(payload)
		return state
	case REM_TRACK:
		state = state.filter(track => payload !== track)
		return state
	default:
		return state
	}
}
