import { getReportByNumberOfDays } from '~/lib/data/get-report-by-number-of-days'

export async function getWeekReport () {
  return getReportByNumberOfDays(7)
}
