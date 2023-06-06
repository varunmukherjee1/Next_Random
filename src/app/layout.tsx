import React from 'react'
import "@/styles/globals.css"

import Nav from '@/components/Nav'
import Provider from '@/components/Provider'

interface Props {
    children: React.ReactNode
}

export const metadata = {
    title: "Next Random",
    description: "Discover & Search your thoughts"
}

const RootLayout: React.FC<Props> = ({children}) => {
  return (
    <html lang = "en">
        <body>
            <Provider>
                <div className = "main">
                    <div className = "gradient"></div>
                </div>

                <main className = "app">
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout