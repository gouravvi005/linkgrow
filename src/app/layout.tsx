import { auth } from '@/auth'
import AuthProvider from '@/components/auth/AuthProvider'
import ThemeProvider from '@/components/template/Theme/ThemeProvider'
import pageMetaConfig from '@/configs/page-meta.config'
import LocaleProvider from '@/components/template/LocaleProvider'
import NavigationProvider from '@/components/template/Navigation/NavigationProvider'
import { getNavigation } from '@/server/actions/navigation/getNavigation'
import { getTheme } from '@/server/actions/theme'
import { getLocale, getMessages } from 'next-intl/server'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono } from "next/font/google";
import '@/assets/styles/app.css'

export const metadata = {
  ...pageMetaConfig,
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const session = await auth()

  const locale = await getLocale()

  const messages = await getMessages()

  const navigationTree = await getNavigation()

  const theme = await getTheme()

  return (
    <AuthProvider session={session}>
      <html
        className={`${theme.mode === 'dark' ? 'dark' : 'light'} ${geistSans.variable}`}
        lang={locale}
        dir={theme.direction}
        suppressHydrationWarning
      >
        <body suppressHydrationWarning>
          <LocaleProvider locale={locale} messages={messages}>
            <ThemeProvider locale={locale} theme={theme}>
              <NavigationProvider navigationTree={navigationTree}>
                {children}
              </NavigationProvider>
            </ThemeProvider>
          </LocaleProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
