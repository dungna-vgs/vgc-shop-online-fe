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
  icons: '/favicon.ico'
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
    <html lang='vi'>
      <GoogleAnalytics />
      <body>{children}</body>
    </html>
  )
}
