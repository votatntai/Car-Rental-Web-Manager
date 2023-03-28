export interface Calendar {
    id: string,
    weekday: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday',
    startTime: string,
    endTime: string
}