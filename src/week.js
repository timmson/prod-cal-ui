import React from "react"
import PropTypes from "prop-types"
import Day from "./day"

export default function Week(props) {
	return (
		<tr>
			<td className="weekNum">{props.week.number}</td>
			{props.week.days.map((day) => <Day key={day.date} day={day}/>)}
		</tr>
	)
}

Week.propTypes = {
	week: PropTypes.object.isRequired
}