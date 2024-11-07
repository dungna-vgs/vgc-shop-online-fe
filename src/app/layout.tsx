import {
  APP_DEFAULT_TITLE,
  APP_DESCRIPTION,
  APP_NAME,
  APP_TITLE_TEMPLATE
} from '@/constants/manifest'
import clsx from 'clsx'
import { poppins, yeseva } from 'fonts'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@layout/header'
import Footer from '@layout/footer'
import BackToTop from '@/components/ui/scroll-to-top'
import { GlobalToast } from '@/components/ui/toast'
import { Suspense } from 'react'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: 'https://nextjs.org/og.png'
      }
    ],
    url: process.env.APP_URL
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  facebook: {
    appId: 'your-app-id'
  },
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
  metadataBase: new URL(process.env.APP_URL!),
  themeColor: '#FFFFFF'
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='vi'>
      <body className={clsx(poppins.variable, yeseva.variable)}>
        <GlobalToast />
        <Suspense fallback={null}>
          <Header />
          {children}
          <Footer />
        </Suspense>
        <BackToTop />
      </body>
    </html>
  )
}
