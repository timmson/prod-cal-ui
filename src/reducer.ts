import {CHANGE_MONTH, CHANGE_YEAR} from "./actions"
import {ActionType, StateType} from "./types"

const Reducer = (state: StateType, action: ActionType) => {
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

export default Reducer