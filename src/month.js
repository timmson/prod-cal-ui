import React, {useContext, useEffect, useRef} from "react"
import PropTypes from "prop-types"
import {CHANGE_MONTH} from "./actions"
import Context from "./context"
import Week from "./week"

export default function Month(props) {

	const dispatch = useContext(Context)
	const setFocus = () => dispatch({type: CHANGE_MONTH, value: props.month.number})
	const myRef = useRef(null)

	useEffect(() => props.isSelected ? myRef.current.scrollIntoView() : null, [myRef])

	return (
		<div ref={myRef} className="col float-right mt-4">
			<table className={`calendar ${props.isSelected ? "calendar-focused" : ""}`} onClick={setFocus}>
				<thead>
					<tr>
						<td className="month" colSpan="8">
							{props.month.name}&apos;{props.year % 100} - <span>[working {props.month.working.days}d /{props.month.working.hours}h]</span>
						</td>
					</tr>
				</thead>
				<tbody>
					<tr className="dayOfWeek">
						<td className="work">#w</td>
						<td className="work">mo</td>
						<td className="work">tu</td>
						<td className="work">we</td>
						<td className="work">th</td>
						<td className="work">fr</td>
						<td className="holiday">sa</td>
						<td className="holiday">su</td>
					</tr>
					{props.month.weeks.map((week) => <Week key={week.number} week={week}/>)}
				</tbody>
			</table>
		</div>
	)
}

Month.propTypes = {
	year: PropTypes.number.isRequired,
	month: PropTypes.object.isRequired,
	isSelected: PropTypes.bool.isRequired
}