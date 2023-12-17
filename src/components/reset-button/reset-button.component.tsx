'use client'

import { FC } from 'react'

import { useCalculator } from '~/lib/calculator.context-provider'

import { css } from '../../../styled-system/css'

const button = css({
  backgroundColor: 'black',
  border: '1px solid',
  borderColor: 'black',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1.25em',
  fontWeight: 'bold',
  padding: '0.5em 1em',
})

interface Props {
  price: number
}

export const ResetButton: FC<Props> = ({ price }) => {
  const { isDirty, setDefaults } = useCalculator()

  function onClick () {
    setDefaults(1, price)
  }

  return isDirty && (
    <button className={ button } onClick={ onClick }>
      Reiniciar
    </button>
  )
}
