'use client'
import { ReactNode, createContext, useState } from 'react'

interface LayoutContextComponentProps {
  children: ReactNode
}

interface LayoutContextInterface {
  menuMobileOpened: boolean
  setMenuMobileOpened: (value: boolean) => void
}

export const LayoutContext = createContext({} as LayoutContextInterface)

export function LayoutContextComponent({
  children,
}: LayoutContextComponentProps) {
  const [menuMobileOpened, setMenuMobileOpened] = useState<boolean>(false)

  return (
    <LayoutContext.Provider value={{ menuMobileOpened, setMenuMobileOpened }}>
      {children}
    </LayoutContext.Provider>
  )
}
