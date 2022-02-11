import {CHANGE_MONTH, CHANGE_YEAR} from "./actions"

export default function Reducer(state, action) {
	switch (action.type) {
	case CHANGE_MONTH: {
		return {
			year: state.year,
			month: action.value
		}
	}

	case CHANGE_YEAR: {
		return {
			year: action.value,
			month: state.month
		}
	}

	default: {
		return {
			year: state.year,
			month: state.month
		}
	}
	}
}