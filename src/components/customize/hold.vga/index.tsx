import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTrigger
  } from '@/components/ui/alert-dialog'
  import { Button } from '@/components/ui/button'
  import React from 'react'
  import { useTranslation } from 'react-i18next'
  
  export default function ExistAlert() {
    const { t } = useTranslation('form')
    return (
      <div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button className='text-white leading-[64px] bg-gradient-to-r from-[#17573C] to-[#4AC486] disabled:bg-none disabled:!bg-[#979797] rounded-[6px] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'>
              {t('next')}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <p className='w-full text-center font-bold text-black mb-3 uppercase'>
                {t('buyed')}
              </p>
              <AlertDialogDescription className='text-black text-center'>
                {t('hold-alert')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className='flex gap-4 justify-center items-center'>
              <AlertDialogAction className='bg-gradient-to-r from-[#17573C] to-[#4AC486] lg:w-[168px] h-16  w-28'>
                {t('yes')}
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
  }
  