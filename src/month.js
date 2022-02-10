import React from "react"
import PropTypes from "prop-types"
import Week from "./week"

function selectMonth(number) {
	console.log(number)
}

export default function Month(props) {
	return (
		<div className="col float-right mt-4">
			<table className={`calendar ${props.month.isFocused ? "calendar-focused" : ""}`} onClick={() => selectMonth(props.month.number)}>
				<tr>
					<td className="month"
						colSpan="8">{props.month.name} - <span>[working {props.month.working.days}d /{props.month.working.hours}h]</span></td>
				</tr>
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
			</table>
		</div>
	)
}

Month.propTypes = {
	month: PropTypes.object.isRequired
}