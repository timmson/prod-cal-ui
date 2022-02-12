import Moment from "moment"
import _ from "lodash"
import Calendar, {DAY_HOLIDAY, DAY_WORK_REDUCED, DAY_WORK} from "prod-cal"
const calendar = new Calendar("ru")

const DAYS_IN_WEEK = 7
const WEEKS_IN_MONTH = 6
const HOURS_IN_REDUCED_DAY = 7
const HOURS_IN_STANDARD_DAY = 8

const addDays = (moment, days) => moment.add(days, "d")
const formatToDay = (moment) => moment.format("D")
const startOfMonth = (moment) => moment.startOf("month")
const addDaysAndFormatToDay = (moment, days) => formatToDay(addDays(moment, days))

const calculateWorkingDaysAndHoursInMonth = (m) => {
	const summary  = _.countBy(m)
	return {
		days: m.length - summary[DAY_HOLIDAY],
		hours: summary[DAY_WORK] * HOURS_IN_STANDARD_DAY + (summary[DAY_WORK_REDUCED] || 0) * HOURS_IN_REDUCED_DAY
	}
}

const generateDay = (momentMonth, cDay, m) => {
	if (cDay >= 0 && cDay < m.length) {
		return {
			date: cDay + 1,
			type: m[cDay]
		}
	} else {
		return {
			date: (cDay < 0) ?
				addDaysAndFormatToDay(startOfMonth(momentMonth), cDay) :
				addDaysAndFormatToDay(momentMonth.endOf("month"), cDay - m.length + 1),
			type: "inactive"
		}
	}
}

const generateWeek = (momentMonth, monthStartsInDayOfWeek, i, m) => {
	const daysFromStartOfTheMonth = i * DAYS_IN_WEEK - monthStartsInDayOfWeek
	return {
		number: addDays(startOfMonth(momentMonth.clone()), daysFromStartOfTheMonth).week(),
		days: Array.from(Array(DAYS_IN_WEEK).keys()).map(
			(j) => generateDay(momentMonth.clone(), daysFromStartOfTheMonth + j, m)
		)
	}
}

const generateMonth = (year, index, m) => {
	const momentMonth = Moment([year, index])
	const monthStartsInDayOfWeek = startOfMonth(momentMonth.clone()).format("d") - 1
	return {
		number: momentMonth.format("M"),
		name: momentMonth.format("MMMM"),
		working: calculateWorkingDaysAndHoursInMonth(m),
		weeks: Array.from(Array(WEEKS_IN_MONTH).keys()).map(
			(i) => generateWeek(momentMonth, monthStartsInDayOfWeek, i, m)
		)
	}
}

export default function GenerateYear(year) {
	return calendar.getCalendar(year).map((m, index) => generateMonth(year, index, m))
}