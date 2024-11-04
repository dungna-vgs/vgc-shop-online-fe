import { Yeseva_One } from 'next/font/google'
import localFont from 'next/font/local'

export const yeseva = Yeseva_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-yeseva'
})

export const poppins = localFont({
  src: [
    {
      path: 'public/fonts/SVN-Poppins-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: 'public/fonts/SVN-Poppins-RegularItalic.otf',
      weight: '400',
      style: 'italic'
    },
    {
      path: 'public/fonts/SVN-Poppins-Medium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: 'public/fonts/SVN-Poppins-MediumItalic.otf',
      weight: '500',
      style: 'italic'
    },
    {
      path: 'public/fonts/SVN-Poppins-SemiBold.otf',
      weight: '600',
      style: 'normal'
    },
    {
      path: 'public/fonts/SVN-Poppins-SemiBoldItalic.otf',
      weight: '600',
      style: 'italic'
    },
    {
      path: 'public/fonts/SVN-Poppins-Bold.otf',
      weight: '700',
      style: 'normal'
    },
    {
      path: 'public/fonts/SVN-Poppins-BoldItalic.otf',
      weight: '700',
      style: 'italic'
    }
  ],
  variable: '--font-poppins'
})
