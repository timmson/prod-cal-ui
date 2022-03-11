import React from "react"
import {DayType} from "./types"

type DayProps = {
    key?: number
    day: DayType
}

const Day = (props: DayProps) => <td className={props.day.type}>{props.day.date}</td>

export default Day
