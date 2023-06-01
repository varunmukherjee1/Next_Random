"use client"

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import type { AppProps } from 'next/app'

interface Props {
    children: React.ReactNode,
}

const Provider:React.FC<Props> = (props) => {
  return (
    <SessionProvider>
      {props.children}
    </SessionProvider>
  )
}

export default Provider