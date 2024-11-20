'use client'

import { useRouter, usePathname, useParams } from 'next/navigation'
import i18nConfig from '@/i18nConfig'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@ui/select'
import Image from 'next/image'
import { LANGUAGES } from '@/constants'

function LanguageChanger() {
  const params = useParams()
  let currentLocale = (params.locale as string) || i18nConfig.defaultLocale
  if (!i18nConfig.locales.includes(currentLocale)) {
    currentLocale = i18nConfig.defaultLocale
  }

  const router = useRouter()
  const currentPathname = usePathname()

  const handleChange = (newLocale: string) => {
    // Set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = date.toUTCString()
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

    // Redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }
    router.refresh()
  }

  return (
    <Select onValueChange={handleChange} defaultValue={currentLocale}>
      <SelectTrigger className='gap-x-3 p-2 rounded-[30px] w-[70px] '>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className='gap-x-3 p-2 w-[70px]'>
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            <Image
              className='w-[24px] h-[24px]'
              src={`/images/${lang.image}`}
              width={24}
              height={24}
              quality={60}
              alt={lang.alt}
            />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default LanguageChanger
