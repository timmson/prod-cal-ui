export type DayType = {
    type: string
    date: number
}

export type WeekType = {
    number: number
    days: Array<DayType>
}

export type MonthType = {
    number: number
    name: string
    working: {
        days: number
        hours: number
    }
    weeks: Array<WeekType>
}