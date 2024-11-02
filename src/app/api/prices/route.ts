import { log } from '@logtail/next'
import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

import { fetchFromBanamex } from '~/lib/fetchers/banamex.fetcher'
import { fetchFromBanxico } from '~/lib/fetchers/banxico.fetcher'
import { fetchFromBbva } from '~/lib/fetchers/bbva.fetcher'
import { fetchFromInbursa } from '~/lib/fetchers/inbursa.fetcher'
import { fetchFromIntercam } from '~/lib/fetchers/intercam.fetcher'
import { fetchFromTransferwise } from '~/lib/fetchers/transferwise.fetcher'
import prisma from '~/lib/prisma'

export async function GET (request: NextRequest) {
  const { url } = request
  const query = url?.split('?')[1] || ''
  const params = new URLSearchParams(query)

  if (params.has('refetch')) {
    const fetchedPrices = await fetchPricesFromBanks()

    try {
      await Promise.all(
        Object.keys(fetchedPrices).map((bank) => {
          const prop = bank as keyof typeof fetchedPrices
          const price = fetchedPrices[prop]!
          return prisma.price.create({
            data: {
              bankId: prop,
              sell: price.sell,
              buy: price.buy,
            },
          })
        })
      )

      // purge prices cache
      revalidateTag('prices')
    } catch (e) {
      // @ts-ignore
      log.error(e)
    }
  }

  return new Response('ok')
}

async function fetchPricesFromBanks () {
  const [
    banxico,
    banamex,
    bbva,
    inbursa,
    // intercam,
    transferwise,
  ] = await Promise.all([
    fetchFromBanxico(),
    fetchFromBanamex(),
    fetchFromBbva(),
    fetchFromInbursa(),
    // fetchFromIntercam(),
    fetchFromTransferwise(),
  ])

  return {
    banxico,
    banamex,
    bbva,
    inbursa,
    // intercam,
    transferwise,
  }
}
