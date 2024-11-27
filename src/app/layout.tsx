import '@/worker/index.js'
import {
  APP_DEFAULT_TITLE,
  APP_DESCRIPTION,
  APP_NAME,
  APP_TITLE_TEMPLATE
} from '@/constants/manifest'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import i18nConfig from '@/i18nConfig'
import { TYPE_ENVIRONMENT } from '@/configs'

const isProduction = TYPE_ENVIRONMENT.PRODUCTION === process.env.ENVIROMENT

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
        url: '/favicon.ico'
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
  themeColor: '#FFFFFF',
  icons: '/favicon.ico',
  robots: {
    index: isProduction,
    follow: isProduction
  }
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <html lang={i18nConfig.defaultLocale}>
      <GoogleAnalytics />
      <body>{children}</body>
    </html>
  )
}
