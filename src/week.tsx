import React from "react"
import Day from "./day"
import {WeekType} from "./types"

type WeekProps = {
    key?: number
    week: WeekType
}

const Week = (props: WeekProps) => (
	<tr>
		<td className="weekNum">{props.week.number}</td>
		{props.week.days.map((day) => <Day key={day.date} day={day}/>)}
	</tr>
)

export default Week