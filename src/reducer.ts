import {ADD_YEAR} from "./actions"
import {ActionType, StateType} from "./types"

const Reducer = (state: StateType, action: ActionType) => {
	switch (action.type) {

	case ADD_YEAR: {
		return {
			...state,
			deep: state.deep + 1
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
