import '@radix-ui/themes/styles.css'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes'

import Header from '@/layouts/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard Project',
  description: 'Create by Leonardo Leal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Theme>
          <Header />
          <main>{children}</main>
        </Theme>
      </body>
    </html>
  )
}
