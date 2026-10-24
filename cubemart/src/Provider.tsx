'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import StoreProvider from './redux/StoreProvider'
import { configureSocketServer } from './lib/socket'

function Provider({children, socketServerUrl}: {children: React.ReactNode, socketServerUrl: string}) {
  configureSocketServer(socketServerUrl)

  return (
    <StoreProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
    </StoreProvider>
  )
}

export default Provider
