import { getReportByNumberOfDays } from '~/lib/data/get-report-by-number-of-days'

export async function getQuarterReport () {
  return getReportByNumberOfDays(93)
}
