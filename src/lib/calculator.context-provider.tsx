'use client'

import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react'
import { useBoolean } from 'usehooks-ts'

// Context type
interface CalculatorContextType {
  usd: number;
  mxn: number;
  isDirty: boolean;
  setUsd: (price: number) => void;
  setMxn: (price: number) => void;
  setDefaults: (usd: number, mxn: number) => void;
}

export const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined)

// Context provider (all the logic goes here)
export const CalculatorProvider: FC<PropsWithChildren> = ({ children }) => {
  const {setFalse, setTrue: setIsDirty, value: isDirty} = useBoolean(false)
  const [usd, setUsd] = useState<number>(1)
  const [mxn, setMxn] = useState<number>(0)

  const setWithDirtyStatus = useMemo(() => (fn: any) => (args: any) => {
    setIsDirty()
    fn(args)
  }, [setIsDirty])

  const setDefaults = useMemo(() => (usd: number, mxn: number) => {
    setUsd(usd)
    setMxn(mxn)
    setFalse()
  }, [setFalse])

  const value = useMemo(() => ({
    usd,
    mxn,
    isDirty,
    setUsd: setWithDirtyStatus(setUsd),
    setMxn: setWithDirtyStatus(setMxn),
    setDefaults,
  }), [isDirty, mxn, setDefaults, setWithDirtyStatus, usd])

  return (
    <CalculatorContext.Provider value={ value }>
      { children }
    </CalculatorContext.Provider>
  )
}

// Hook to use the context
export const useCalculator = () => {
  const context = useContext(CalculatorContext)

  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider')
  }

  return context
}
