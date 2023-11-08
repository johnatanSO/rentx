export interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number
  convertToUTC(date: Date): string
  dateNow(): Date
  endDay(date: Date): Date
}
