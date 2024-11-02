/*
 * Active banks to be used in the web.
 */
import { Bank } from '~/lib/types'

export const ACTIVE_BANKS = [
  'banamex',
  'banxico',
  'bbva',
  'inbursa',
  'intercam',
  'transferwise',
] as const

/*
 * Metadata for the web.
 */
export const METADATA = {
  title: 'El Dólar en Bancos de México',
  // eslint-disable-next-line max-len
  description: 'El precio del dólar en diferentes bancos de México. Calculadora de dólares a pesos mexicanos. Bot de Telegram y Discord para consultar el precio del dólar al instante.',
  keywords: 'dolar, precio, pesos, mexicanos, bancos, mxn, precios',
  abstract: 'El precio del dólar en los distintos bancos de México',
  url: 'https://dolarenbancos.com',
} as const

/*
 * Visual settings for each bank used in charts or tables.
 */
export const BANK_META: Record<Bank, { display: string, color: string }> = {
  banamex: { display: 'Banamex', color: 'rgb(168,38,38)' },
  banxico: { display: 'Banxico', color: 'rgb(65,67,72)' },
  bbva: { display: 'BBVA', color: 'rgb(57,219,248)' },
  inbursa: { display: 'Inbursa', color: 'rgb(9,117,243)' },
  intercam: { display: 'Intercam', color: 'rgb(50,171,44)' },
  transferwise: { display: 'Transferwise', color: 'rgb(243,99,9)' },
} as const
