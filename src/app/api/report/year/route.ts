import { log } from '@logtail/next'

import { getYearReport } from '~/lib/data/report-year.data'

export const dynamic = 'force-dynamic'

export async function GET () {
  const data = await getYearReport()
  log.info('report-year', data)
  return new Response(JSON.stringify(data))
}
