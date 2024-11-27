import { getReportByNumberOfDays } from '~/lib/data/get-report-by-number-of-days'

export async function getMonthReport () {
  return getReportByNumberOfDays(30)
}
