import axios from 'axios'

import { FetcherResponse } from '~/lib/fetchers/fetcher.type'
import { prettifyRate } from '~/lib/utils'

const USER_AGENT = process.env.USER_AGENT ||
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0'
const INTERCAM_CURRENCY_URL = 'https://intercamprod.finsol.cloud/services/historico/getLast'
const POST_DATA = { 'rics': ['MXN=X'], 'user': 'intercam.widgets@financialsolutions.mx' }

export async function fetchFromIntercam (): Promise<FetcherResponse> {
  const { data } = await axios.post(INTERCAM_CURRENCY_URL, POST_DATA, {
    headers: {
      'User-Agent': USER_AGENT,
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
    },
  })

  const { data: { 'MXN=X': { last: values } } } = data

  return {
    bank: 'intercam',
    buy: prettifyRate(values['cfbid']),
    sell: prettifyRate(values['cfask']),
  }
}
