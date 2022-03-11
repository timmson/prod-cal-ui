import React, {useReducer} from "react"
import {CHANGE_YEAR} from "./actions"
import Context from "./context"
import Reducer from "./reducer"
import Month from "./month"
import GenerateYear from "./generate-year"
import {RequestType, StateType} from "./types"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowAltCircleLeft, faArrowAltCircleRight} from "@fortawesome/free-regular-svg-icons"

type AppProps = {
    request: RequestType
    notify: (state: StateType) => void
}

const App = (props: AppProps) => {

	const [state, dispatch] = useReducer(Reducer, props.request, () => props.request)
	const year = GenerateYear(state.year)
	const changeYear = (d) => dispatch({type: CHANGE_YEAR, value: state.year + d})
	props.notify(state)

	return (
		<Context.Provider value={dispatch}>
			<div className="row ml-2">
				<div className="col mt-4 text-center">
					<FontAwesomeIcon icon={faArrowAltCircleLeft} className={"m-2 fs-1 clickable"} onClick={() => changeYear(-1)}/>
					<span className="fs-1">{state.year}</span>
					<FontAwesomeIcon icon={faArrowAltCircleRight} className={"m-2 fs-1 clickable"} onClick={() => changeYear(+1)}/>
				</div>
			</div>
			<div className="row ml-2">
				{year.map((month) => <Month key={month.number} year={state.year} month={month} isSelected={month.number === state.month}/>)}
			</div>
		</Context.Provider>
	)
}

export default App