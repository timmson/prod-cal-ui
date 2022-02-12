import {CHANGE_MONTH, CHANGE_YEAR} from "./actions"

export default function Reducer(state, action) {
	switch (action.type) {
	case CHANGE_MONTH: {
		return {
			...state,
			month: action.value
		}
	}

	case CHANGE_YEAR: {
		return {
			...state,
			year: action.value
		}
	}

	default: {
		return {
			...state
		}
	}
	}
}