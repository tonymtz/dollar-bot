import { log } from '@logtail/next'

import { getQuarterReport } from '~/lib/data/report-quarter.data'

export const dynamic = 'force-dynamic'

export async function GET () {
  const data = await getQuarterReport()
  log.info('report-quarter', data)
  return new Response(JSON.stringify(data))
}
