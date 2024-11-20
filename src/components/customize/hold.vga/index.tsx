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

type TExistAlertProps = {
  open: boolean
  onClose: () => void
}
export default function ExistAlert(props: TExistAlertProps) {
  const { t } = useTranslation('form')
  return (
    <div>
      <AlertDialog open={props.open}>
        <AlertDialogTrigger>
          <Button className='text-white leading-[64px] bg-gradient-to-r from-[#17573C] to-[#4AC486] disabled:bg-none disabled:!bg-[#979797] rounded-[6px] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'>
            {t('next')}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <p className='w-full text-center font-bold text-black mb-3 uppercase'>
              {t('hold')}
            </p>
            <AlertDialogDescription className='text-black text-center'>
              {t('hold-alert')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className='flex gap-4 justify-center items-center'>
            <AlertDialogAction
              onClick={props.onClose}
              className='bg-gradient-to-r from-[#17573C] to-[#4AC486] lg:w-[168px] h-16  w-28'
            >
              {t('yes')}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
