import {
  APP_DEFAULT_TITLE,
  APP_DESCRIPTION,
  APP_NAME,
  APP_TITLE_TEMPLATE
} from '@/constants/manifest'
import clsx from 'clsx'
import { poppins, yeseva } from 'fonts'
import type { Metadata, Viewport } from 'next'
import Header from '@layout/header'
import Footer from '@layout/footer'
import BackToTop from '@/components/ui/scroll-to-top'
import { GlobalToast } from '@/components/ui/toast'
import { Suspense } from 'react'
import Loading from '@/components/customize/loading'
import TranslationsProvider from '@customize/languages/TranslationsProvider'
import initTranslations from '@/app/i18n'
import Spinner from '@/components/customize/spinner'
import i18nConfig from '@/i18nConfig'
import '@/worker/index.js'
import MetaPixel from '@/components/pixel'
import './globals.css'

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
  themeColor: '#FFFFFF'
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF'
}

const i18nNamespaces = [
  'common',
  'filter-menu',
  'form',
  'package-price',
  'not-found'
]

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  let initLocale = locale
  if (!i18nConfig.locales.includes(initLocale)) {
    initLocale = i18nConfig.defaultLocale
  }

  const { resources } = await initTranslations(
    initLocale || i18nConfig.defaultLocale,
    i18nNamespaces
  )

  return (
    <html lang={i18nConfig.defaultLocale}>
      <body className={clsx(poppins.variable, yeseva.variable)}>
        <TranslationsProvider
          resources={resources}
          locale={initLocale}
          namespaces={i18nNamespaces}
        >
          <Suspense fallback={<Loading />}>
            <Spinner />
            <GlobalToast />
            <Header />
            <div className='mt-[84px] min-h-[70vh]'>{children}</div>
            <Footer />
            <BackToTop />
          </Suspense>
        </TranslationsProvider>
        <MetaPixel pixelId={process.env.FACEBOOK_PIXEL_ID} />
      </body>
    </html>
  )
}
