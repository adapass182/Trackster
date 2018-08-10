export const ADD_ARTIST = 'ADD_ARTIST'
export const ADD_TRACK = 'ADD_TRACK'
export const REM_ARTIST = 'REM_ARTIST'
export const REM_TRACK = 'REM_TRACK'

export const addTrack = track => {
	return {
		type: ADD_TRACK,
		payload: track
	}
}

export const remTrack = track => {
	return {
		type: REM_TRACK,
		payload: track
	}
}

export const addArtist = artist => {
	return {
		type: ADD_ARTIST,
		payload: artist
	}
}

export const remArtist = artist => {
	return {
		type: REM_ARTIST,
		payload: artist
	}
}
