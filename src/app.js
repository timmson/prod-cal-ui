import React, {useState} from "react"
import Month from "./month"
import GenerateYear from "./generate-year"
import PropTypes from "prop-types"

export default function App(props) {

	const [state, setState] = useState(props.request.year)
	let year = GenerateYear(state)

	return (
		<>
			<div className="row ml-2">
				<div className="col mt-4 text-center">
					<h3>
						<span className="clickable" onClick={() => setState(state - 1)}>◀</span>
						{state}
						<span className="clickable" onClick={() => setState(state + 1)}>▶</span>
					</h3>
				</div>
			</div>
			<div className="row ml-2">
				{year.map((month) => <Month key={month.number} month={month} isSelected={month.number === props.request.month}/>)}
			</div>
		</>
	)
}

App.propTypes = {
	request: PropTypes.object.isRequired
}