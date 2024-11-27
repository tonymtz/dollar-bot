import prisma from '~/lib/prisma'
import { Bank, BANKS, Prices } from '~/lib/types'
import { getEmptyPricesObject } from '~/lib/utils'

export async function getYearReport () {
  const week: Record<string, Prices> = {}

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < 365; i++) {
    const endDate = new Date(today)
    endDate.setDate(today.getDate() - i)

    const startDate = new Date(endDate)
    startDate.setHours(0, 0, 0, 0)
    endDate.setHours(23, 59, 59, 999)

    const pricesFromDatabase = await Promise.all(
      BANKS.map((bank: Bank) =>
        prisma.price.findFirst({
          where: {
            bankId: bank,
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        }),
      )
    )

    const prices: Prices = getEmptyPricesObject()

    pricesFromDatabase.forEach((priceInstance, index) => {
      const bank = BANKS[index]

      if (!priceInstance) {
        return
      }

      prices[bank] = {
        buy: priceInstance.buy || 0,
        sell: priceInstance.sell || 0,
      }
    })

    // If there is no price for the day, we don't want to show it
    if (prices.banxico.buy !== 0) {
      week[startDate.toLocaleDateString()] = prices
    }
  }

  return week
}
