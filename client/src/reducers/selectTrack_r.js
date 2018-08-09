import { ADD_TRACK, REM_TRACK } from "../actions/selectTrack_a"

export default (state = [], { type, payload }) => {
	console.log("Hi Adam: " + payload)
	switch(type) {
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