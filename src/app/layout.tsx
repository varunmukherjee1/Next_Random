import React from 'react'
import "@/styles/globals.css"

interface Props {
    children: React.ReactNode
}

export const metadata = {
    title: "Next Prompts",
    description: "Discover & Search AI prompts"
}

const RootLayout: React.FC<Props> = ({children}) => {
  return (
    <html lang = "en">
        <body>
            <div className = "main">
                <div className = "gradient"></div>
            </div>

            <main className = "app">
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout