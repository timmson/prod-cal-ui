import Moment from "moment"
import _ from "lodash"
import Calendar, {DAY_HOLIDAY, DAY_WORK, DAY_WORK_REDUCED} from "prod-cal"

const calendar = new Calendar("ru")

const DAYS_IN_WEEK = 7
const WEEKS_IN_MONTH = 6
const MONTHS_IN_YEAR = 12
const HOURS_IN_REDUCED_DAY = 7
const HOURS_IN_STANDARD_DAY = 8

const addDays = (moment, days) => moment.add(days, "d")
const formatToDay = (moment) => moment.format("D")
const startOfMonth = (moment) => moment.startOf("month")
const addDaysAndFormatToDay = (moment, days) => formatToDay(addDays(moment, days))
const sequenceTo = (length, start) =>
	Array.from(Array(length).keys()).map((i) => i + (start || 0))
const sequenceFromOneTo = (length) => sequenceTo(length, 1)


const generateMonth = (year, month) => {
	const prodCalendar = calendar.getCalendar(year, month)
	const momentMonth = Moment([year, month - 1])
	const monthStartsInDayOfWeek = startOfMonth(momentMonth.clone()).format("d") - 1

	const calculateWorkingDaysAndHoursInMonth = () => {
		const summary = _.countBy(prodCalendar)
		return {
			days: prodCalendar.length - summary[DAY_HOLIDAY],
			hours: summary[DAY_WORK] * HOURS_IN_STANDARD_DAY + (summary[DAY_WORK_REDUCED] || 0) * HOURS_IN_REDUCED_DAY
		}
	}

	const generateWeek = (daysFromStartOfTheMonth) => {
		const generateDay = (momentMonth, dayNumber) => {
			if (dayNumber >= 0 && dayNumber < prodCalendar.length) {
				return {
					date: dayNumber + 1,
					type: prodCalendar[dayNumber]
				}
			} else {
				return {
					date: (dayNumber < 0) ?
						addDaysAndFormatToDay(startOfMonth(momentMonth), dayNumber) :
						addDaysAndFormatToDay(momentMonth.endOf("month"), dayNumber - prodCalendar.length + 1),
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
		number: momentMonth.format("M"),
		name: momentMonth.format("MMMM"),
		working: calculateWorkingDaysAndHoursInMonth(),
		weeks: sequenceTo(WEEKS_IN_MONTH).map(
			(weekNumber) =>
				generateWeek(weekNumber * DAYS_IN_WEEK - monthStartsInDayOfWeek)
		)
	}
}

export default function GenerateYear(year) {
	return sequenceFromOneTo(MONTHS_IN_YEAR).map((month) => generateMonth(year, month))
}