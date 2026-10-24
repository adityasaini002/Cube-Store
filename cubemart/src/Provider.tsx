'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import StoreProvider from './redux/StoreProvider'

function Provider({children}: {children: React.ReactNode}) {
  return (
    <StoreProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
    </StoreProvider>
  )
}

export default Provider
