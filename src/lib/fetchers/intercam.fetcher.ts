import axios from 'axios'

import { FetcherResponse } from '~/lib/fetchers/fetcher.type'
import { prettifyRate } from '~/lib/utils'

const USER_AGENT = process.env.USER_AGENT ||
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/132.0'
const INTERCAM_CURRENCY_URL = 'https://intercamprod.finsol.cloud/services/historico/getLast'
const POST_DATA = {
  'type':'ticker',
  'chain':true,
  'rics':['MXN=X','EURMXN=X','GBPMXN=X','CADMXN=X','JPYMXN=X'],
  'comentarios':'',
  'user':'intercam.widgets@financialsolutions.mx',
}

export async function fetchFromIntercam (): Promise<FetcherResponse> {
  const { data } = await axios.post(INTERCAM_CURRENCY_URL, POST_DATA, {
    headers: {
      'User-Agent': USER_AGENT,
      'Content-type': 'application/json',
      'Cache-Control': 'no-cache',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,es-MX;q=0.8,es;q=0.5,en;q=0.3',
      'Content-Type': 'application/json',
      'Sec-GPC': '1',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'referrer': 'https://intercamprod.finsol.cloud/widgets-prd/home?lang=en',
    },
  })

  const { data: { 'MXN=X': { last: values } } } = data

  return {
    bank: 'intercam',
    buy: prettifyRate(values['cfbid']),
    sell: prettifyRate(values['cfask']),
  }
}
