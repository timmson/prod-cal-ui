import React from "react"
import PropTypes from "prop-types"

export default function Day(props) {
	return <td className={props.day.type}>{props.day.date}</td>
}

Day.propTypes = {
	day: PropTypes.object.isRequired
}
