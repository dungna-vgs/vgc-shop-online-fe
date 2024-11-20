import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader
} from '@/components/ui/alert-dialog'
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <p className='w-full text-center font-bold text-black mb-3 uppercase'>
              {t('buyed')}
            </p>
            <AlertDialogDescription className='text-black text-center'>
              {t('sorry-alert')}
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
