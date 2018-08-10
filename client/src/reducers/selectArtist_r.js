import { ADD_ARTIST, REM_ARTIST } from '../actions/selector_a'

export default (state = [], { type, payload }) => {
	console.log('Hi Adam: ' + payload)
	switch (type) {
	case ADD_ARTIST:
		state.push(payload)
		return state
	case REM_ARTIST:
		state = state.filter(artist => payload !== artist)
		return state
	default:
		return state
	}
}
