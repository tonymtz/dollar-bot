import { getReportByNumberOfDays } from '~/lib/data/get-report-by-number-of-days'

export async function getYearReport () {
  return getReportByNumberOfDays(365)
}
