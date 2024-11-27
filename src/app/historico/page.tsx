export const revalidate = 5

import { log } from '@logtail/next'

import { Caption } from '~/components/atoms/caption.component'
import { Section } from '~/components/atoms/section.component'
import { MicroDashboard } from '~/components/micro-dashboard'
import { PageLayout } from '~/components/page-layout'
import { WeeklyPriceChart } from '~/components/weekly-price-chart'
import { ApplicationProvider } from '~/lib/application.context-provider'
import { CalculatorResultProvider } from '~/lib/calculator-result.context-provider'
import { Prices } from '~/lib/types'
import { getBaseUrl } from '~/lib/utils'

const disclaimer = 'Actualizado con información pública. Las cantidades son datos de referencia solamente.'

interface Data {
  today: Prices,
  week: Record<string, Prices>
  month: Record<string, Prices>
  quarter: Record<string, Prices>
}

export default async function Historico () {
  const data = await getPrices()

  if (!data) {
    return {
      notFound: true,
    }
  }

  const todayPrices = data.today
  const { banxico } = todayPrices

  return (
    <ApplicationProvider referencePrice={ banxico.buy }>
      <CalculatorResultProvider referencePrice={ banxico.buy }>
        <PageLayout>
          <Section size='compact'>
            <MicroDashboard weeklyReport={ data.week } showCalculator={false}/>
          </Section>

          <Section
            id="historico"
            backgroundColor="primaryLight"
            title="Histórico semanal"
          >
            <WeeklyPriceChart weeklyReport={ data.week }/>
            <Caption>{ disclaimer }</Caption>
          </Section>

          <Section title="Histórico últimos 30 días">
            <WeeklyPriceChart weeklyReport={ data.month }/>
            <Caption>{ disclaimer }</Caption>
          </Section>

          <Section
            backgroundColor="primaryLight"
            title="Histórico últimos 90 días"
          >
            <WeeklyPriceChart weeklyReport={ data.quarter }/>
            <Caption>{ disclaimer }</Caption>
          </Section>
        </PageLayout>
      </CalculatorResultProvider>
    </ApplicationProvider>
  )
}

async function getPrices (): Promise<Data> {
  // takes data from cache if available
  const commonFetchProps = { next: { tags: ['prices'] } }

  try {
    const [today, weekly, monthly, quarterly] = await Promise.all([
      fetch(`${ getBaseUrl() }/api/report/now`, commonFetchProps),
      fetch(`${ getBaseUrl() }/api/report/week`, commonFetchProps),
      fetch(`${ getBaseUrl() }/api/report/month`, commonFetchProps),
      fetch(`${ getBaseUrl() }/api/report/quarter`, commonFetchProps),
    ])

    if (!today.ok || !weekly.ok || !monthly.ok || !quarterly.ok) {
      throw new Error('Could not fetch prices')
    }

    return {
      today: await today.json(),
      week: await weekly.json(),
      month: await monthly.json(),
      quarter: await quarterly.json(),
    }
  } catch (error) {
    // @ts-ignore
    log.error(error)
    throw new Error('Could not fetch prices')
  }
}

