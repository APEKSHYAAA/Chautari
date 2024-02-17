import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
const inter = Inter({ subsets: ['latin'] })
import NextUIProvider from './providers'
import ReduxProvider from '@/redux/provider'
export const metadata = {
  title: 'Chautari',
  description: 'Website description',
  icons: {
    icon: [
      {
        url: 'Chautari_logo.png',
        href: 'Chautari_logo.png',
       
        }
      ]
    }
  }

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={inter.className}>
      <ReduxProvider>
          <NextUIProvider>
          <Providers>
            {children}
            </Providers>
          </NextUIProvider>
        </ReduxProvider>
        </body>
    </html>
  )
}
