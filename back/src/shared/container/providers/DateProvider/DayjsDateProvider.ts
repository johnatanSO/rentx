import { IDateProvider } from './IDateProvider'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export class DayjsDateProvider implements IDateProvider {
  endDay(date: Date): Date {
    return dayjs(date).endOf('day').toDate()
  }

  compareInHours(startDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate)
    const startDateUTC = this.convertToUTC(startDate)

    return dayjs(endDateUTC).diff(startDateUTC, 'hours')
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  dateNow(): Date {
    return dayjs().toDate()
  }
}
