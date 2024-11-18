import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import  '@/styles/globals.css'
import { Toaster } from '@/components/features/notification/Toaster'
import { ThemeProvider } from "@/components/features/theme/theme-provider"
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'A Task Management Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning ={true}>
      <body className={inter.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
