import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
import NextUIProviders from './providers'
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
        <NextUIProviders>
        {children}
        </NextUIProviders>
        </body>
    </html>
  )
}
