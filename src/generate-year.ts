import Moment from "moment"
import _ from "lodash"
import Calendar, {DAY_HOLIDAY, DAY_WORK, DAY_WORK_REDUCED} from "prod-cal"

import {DayType, MonthType, WeekType, WorkingType} from "./types"

const calendar = new Calendar("ru")

const DAYS_IN_WEEK = 7
const WEEKS_IN_MONTH = 6
const MONTHS_IN_YEAR = 12
const HOURS_IN_REDUCED_DAY = 7
const HOURS_IN_STANDARD_DAY = 8

const addDays = (moment: Moment.Moment, days): Moment.Moment => moment.add(days, "d")
const formatToDay = (moment: Moment.Moment): string => moment.format("D")
const startOfMonth = (moment: Moment.Moment): Moment.Moment => moment.startOf("month")
const addDaysAndFormatToDay = (moment: Moment.Moment, days: number) => formatToDay(addDays(moment, days))
const sequenceTo = (length: number, start = 0): Array<number> =>
	Array.from(Array(length).keys()).map((i) => i + start)
const sequenceFromOneTo = (length: number): Array<number> => sequenceTo(length, 1)


const generateMonth = (year: number, month: number): MonthType => {
	const prodCalendar = calendar.getCalendar(year, month)
	const momentMonth = Moment([year, month - 1])
	const monthStartsInDayOfWeek = parseInt(startOfMonth(momentMonth.clone()).format("d"), 10) - 1

	const calculateWorkingDaysAndHoursInMonth = (): WorkingType => {
		const summary = _.countBy(prodCalendar)
		return {
			days: prodCalendar.length - summary[DAY_HOLIDAY],
			hours: summary[DAY_WORK] * HOURS_IN_STANDARD_DAY + (summary[DAY_WORK_REDUCED] || 0) * HOURS_IN_REDUCED_DAY
		}
	}

	const generateWeek = (daysFromStartOfTheMonth): WeekType => {

		const generateDay = (momentMonth, dayNumber): DayType => {
			if (dayNumber >= 0 && dayNumber < prodCalendar.length) {
				return {
					date: dayNumber + 1,
					type: prodCalendar[dayNumber]
				}
			} else {
				return {
					date: parseInt(
						(dayNumber < 0) ?
							addDaysAndFormatToDay(startOfMonth(momentMonth), dayNumber) :
							addDaysAndFormatToDay(momentMonth.endOf("month"), dayNumber - prodCalendar.length + 1),
						10
					),
					type: "inactive"
				}
			}
		}

		return {
			number: addDays(startOfMonth(momentMonth.clone()), daysFromStartOfTheMonth).week(),
			days: sequenceTo(DAYS_IN_WEEK).map(
				(j) => generateDay(momentMonth.clone(), daysFromStartOfTheMonth + j)
			)
		}
	}


	return {
		number: parseInt(momentMonth.format("M"), 10),
		name: momentMonth.format("MMMM"),
		working: calculateWorkingDaysAndHoursInMonth(),
		weeks: sequenceTo(WEEKS_IN_MONTH).map(
			(weekNumber) =>
				generateWeek(weekNumber * DAYS_IN_WEEK - monthStartsInDayOfWeek)
		)
	}
}

const GenerateYear = (year: number): Array<MonthType> =>
	sequenceFromOneTo(MONTHS_IN_YEAR).map((month) => generateMonth(year, month))

export default GenerateYear