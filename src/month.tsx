import React, {useContext, useEffect, useRef} from "react"
import {CHANGE_MONTH} from "./actions"
import Context from "./context"

import Week from "./week"
import {MonthType} from "./types"

type MonthProps = {
    key?: number
    year: number
    month: MonthType
    isSelected: boolean
}

export default function Month(props: MonthProps) {

	const dispatch = useContext(Context)
	const setFocus = () => dispatch({type: CHANGE_MONTH, value: props.month.number})
	const myRef = useRef(null)

	useEffect(() => {
		props.isSelected ? myRef.current.scrollIntoView() : null
	}, [myRef])

	return (
		<div ref={myRef} className={"col float-right"}>
			<div className={"month"}>{props.month.name}&nbsp;<sup>{props.month.working.days}d /{props.month.working.hours}h</sup></div>
			<div className={`m-2 border ${props.isSelected ? "border-danger" : "border-secondary"} rounded`} style={{paddingTop: "15px"}}>
				<table className={"calendar"} onClick={setFocus}>
					<tbody>
						<tr className="dayOfWeek">
							<td className="work">&nbsp;</td>
							<td className="work">Mo</td>
							<td className="work">Tu</td>
							<td className="work">We</td>
							<td className="work">Th</td>
							<td className="work">Fr</td>
							<td className="holiday">Sa</td>
							<td className="holiday">Su</td>
						</tr>
						{props.month.weeks.map((week) => <Week key={week.number} week={week}/>)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

