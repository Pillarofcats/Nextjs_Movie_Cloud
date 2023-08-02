//CSS
import './globals.css'
//Font
import { Inter } from 'next/font/google'
//Context
import StoreContextProvider from '@/context/StoreContextProvider'
//Components
import ProviderSession from '@/components/ProviderSession'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movie Cloud',
  description: 'A Faux Movie Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {

  return (
    <html lang="en">
      <body className={ inter.className }>
        <ProviderSession>
          <StoreContextProvider>
            { children }
          </StoreContextProvider>
        </ProviderSession>
      </body>
    </html>
  )
}
