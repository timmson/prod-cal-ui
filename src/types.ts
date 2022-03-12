export type ActionType = {
    type: string
    value?: number
}

export type StateType = {
    month?: number
    year?: number
}

export type RequestType = {
    month: number
    year: number
}

export type WorkingType = {
    days: number
    hours: number
}

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
    working: WorkingType
    weeks: Array<WeekType>
}