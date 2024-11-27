import { log } from '@logtail/next'

import { getMonthReport } from '~/lib/data/report-month.data'

export const dynamic = 'force-dynamic'

export async function GET () {
  const data = await getMonthReport()
  log.info('report-month', data)
  return new Response(JSON.stringify(data))
}
