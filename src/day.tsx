import React from "react"

type DayProps = {
	day: {
		type: string
		date: number
	}
}

const Day = (props: DayProps) => <td className={props.day.type}>{props.day.date}</td>

export default Day
