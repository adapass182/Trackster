export const ADD_TRACK = "ADD_TRACK"
export const REM_TRACK = "REM_TRACK"

export const addTrack = (track) => {
	return {
		type: ADD_TRACK,
		payload: track
	}
}

export const remTrack = (track) => {
	return {
		type: REM_TRACK,
		payload: track
	}
}