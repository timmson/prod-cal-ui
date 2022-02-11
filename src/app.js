import React, {useReducer} from "react"
import PropTypes from "prop-types"
import {CHANGE_YEAR} from "./actions"
import Context from "./context"
import Reducer from "./reducer"
import Month from "./month"
import GenerateYear from "./generate-year"

export default function App(props) {

	const [state, dispatch] = useReducer(Reducer, props.request, () => props.request)
	const year = GenerateYear(state.year)
	const changeYear = (d) => dispatch({type: CHANGE_YEAR, value: state.year + d})
	props.notify(state)

	return (
		<Context.Provider value={dispatch}>
			<div className="row ml-2">
				<div className="col mt-4 text-center">
					<h3>
						<span className="clickable" onClick={() => changeYear(-1)}>◀</span>
						{state.year}
						<span className="clickable" onClick={() => changeYear(+1)}>▶</span>
					</h3>
				</div>
			</div>
			<div className="row ml-2">
				{year.map((month) => <Month key={month.number} month={month} isSelected={month.number === state.month}/>)}
			</div>
		</Context.Provider>
	)
}

App.propTypes = {
	request: PropTypes.object.isRequired,
	notify: PropTypes.func.isRequired
}