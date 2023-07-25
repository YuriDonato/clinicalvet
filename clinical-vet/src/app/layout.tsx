"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Providers } from "./providers";
import { ChakraProvider } from "@chakra-ui/react";



const montserrat = Montserrat({
  weight: ['400','700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Clinical Vet',
  description: 'A Website that care about you.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <ChakraProvider>
          {children}
          </ChakraProvider>
        </Providers>
        </body>
    </html>
  )
}
