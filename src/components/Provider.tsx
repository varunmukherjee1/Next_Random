"use client"

import React from 'react'
import { SessionProvider } from 'next-auth/react'

interface Props {
    children: React.ReactNode,
    session: any
}

const Provider:React.FC<Props> = (props) => {
  return (
    <SessionProvider session = {props.session}>
      {props.children}
    </SessionProvider>
  )
}

export default Provider