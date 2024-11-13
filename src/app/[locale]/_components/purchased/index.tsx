import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export function HasPurchased() {
  const { t } = useTranslation('form')
  return (
    <div className='text-black'>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='outline'>{t('completed')}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <p className='text-center text-[18px] font-bold text-black w-ful uppercase'>
              {t('buyed')}
            </p>
            <AlertDialogDescription className='text-center mt-2'>
              {t('sorry')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Link href='/' className='flex justify-center mt-2'>
            <Button className='text-white bg-gradient-to-r leading-[64px] outline-none from-[#17573C] to-[#4AC486]  rounded-[6px] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'>
              {t('yes')}
            </Button>
          </Link>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
