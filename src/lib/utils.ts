import { BANK } from '~/lib/constants'

export function prettifyRate (str: string): number {
  return Number(parseFloat(str).toFixed(2))
}

export function formatPrice (price: number): string {
  return price.toFixed(2)
}

export function translateBankIdToDisplay (bankId: BANK): string {
  switch (bankId) {
    case 'inbursa':
      return 'Inbursa'
    case 'banamex':
      return 'Banamex'
    case 'bbva':
      return 'BBVA'
    case 'banxico':
      return 'Banxico'
    case 'billdotcom':
      return 'Bill.com'
    case 'intercam':
      return 'Intercam'
    default:
      return '??'
  }
}