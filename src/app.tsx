import React, {useReducer} from "react"
import {ADD_YEAR} from "./actions"
import Context from "./context"
import Reducer from "./reducer"
import Month from "./month"
import GenerateYear from "./generate-year"
import {RequestType, StateType} from "./types"

type AppProps = {
    request: RequestType
    notify: (state: StateType) => void
}

const App = (props: AppProps) => {

	const [state, dispatch] = useReducer(Reducer, props.request, () => props.request)
	const years = Array(state.deep + 1)
		.fill(0)
		.map((element, index) => (
			{
				year: state.year + index,
				months: GenerateYear(state.year + index)
			})
		)
	props.notify(state)

	return (
		<Context.Provider value={dispatch}>
			{years.map((year, index) => (
				<div key={index}>
					<div className="row mt-2">
						<div className="col text-center year">
							{year.year}
						</div>
					</div>
					<div className="row ml-2">
						{year.months.map((month) => <Month key={month.number} year={state.year} month={month}
							isSelected={state.year === year.year && month.number === state.month}/>)}
					</div>
				</div>
			))}
			<div className="row mt-2">
				<div className="col text-center">
					<input type="button" className="btn btn-outline-primary" value="More ..."
						onClick={() => dispatch({type: ADD_YEAR})}/>
				</div>
			</div>
		</Context.Provider>
	)
}

export default App
