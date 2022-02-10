import React from "react"
import Month from "./month"
import GenerateYear from "./generate-year"
import PropTypes from "prop-types"

export default function App(props) {
	const year = GenerateYear(props.year)
	return (
		<div className="container">
			<div className="row ml-2">
				{year.map((month) => <Month key={month.number} month={month}/>)}
			</div>
		</div>
	)
}

App.propTypes = {
	year: PropTypes.number.isRequired
}