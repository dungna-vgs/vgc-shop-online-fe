import { apiCheckTransactionStatus } from '@/apis/internals/clients/check.transaction'
import Countdown from '@/components/customize/timer'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import Loading from '@/components/ui/loading'
import { STATUS_CHECK_TRANSACTION } from '@/constants'
import { TPaymentInfo } from '@/types/type'
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  transactionId: TPaymentInfo['transaction_id']
}

export default function SuccessAlert({ transactionId }: Props) {
  const { t } = useTranslation('form')
  const [isOpen, setIsOpen] = useState(false)
  const [transactionStatus, setTransactionStatus] =
    useState<STATUS_CHECK_TRANSACTION>(STATUS_CHECK_TRANSACTION.PENDING)

  const fetchTransactionStatus = useCallback(async () => {
    const res = await apiCheckTransactionStatus({
      transaction_id: transactionId
    })
    return res.data.transaction.status
  }, [transactionId])

  const handleRetry = useCallback(() => {
    setTransactionStatus(STATUS_CHECK_TRANSACTION.PENDING)
  }, [])

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined

    if (isOpen && !transactionStatus) {
      interval = setInterval(async () => {
        const status = await fetchTransactionStatus()
        setTransactionStatus(status)

        if (status) {
          clearInterval(interval)
        }
      }, 15000)
    }

    return () => clearInterval(interval)
  }, [isOpen, transactionStatus, fetchTransactionStatus])

  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger className='text-white bg-gradient-to-r leading-[64px] outline-none from-[#17573C] to-[#4AC486]  rounded-[6px] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'>
          {t('completed')}
        </AlertDialogTrigger>
        <AlertDialogContent className='mt-[84px] text-black'>
          {!transactionStatus ? (
            <>
              <AlertDialogTitle className='text-center uppercase'>
                {t('process')}
              </AlertDialogTitle>
              <AlertDialogDescription className='text-center'>
                {t('please')}
              </AlertDialogDescription>
              <div className='flex justify-center flex-col items-center gap-4'>
                <Loading />
                <p className='block font-bold text-[20px] text-[#17573C]'>
                  <Countdown />
                </p>
              </div>
            </>
          ) : transactionStatus === 1 ? (
            <>
              <AlertDialogTitle className='text-center uppercase'>
                {t('success')}
              </AlertDialogTitle>
              <ul className='text-center list-disc list-inside'>
                {t('successful')}
                <li>{t('check-account')}</li>
                <li>
                  {t('contact')}{' '}
                  <a
                    href='tel:19002126'
                    className='no-underline text-[#17573C]'
                  >
                    19002126
                  </a>{' '}
                  {t('support')}
                </li>
              </ul>
              <div className='flex justify-center'>
                <Link href='/'>
                  <Button className='text-white flex justify-center bg-gradient-to-r outline-none from-[#17573C] to-[#4AC486] rounded-[6px] w-40 h-16 md:w-[250px] text-[16px]'>
                    {t('home')}
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <AlertDialogTitle className='text-center uppercase'>
                {t('fail')}
              </AlertDialogTitle>
              <ul className='text-center list-disc list-inside'>
                {t('unsuccessful')}
                <li>{t('check-again')}</li>
                <li>
                  {t('hotline')}{' '}
                  <a
                    href='tel:19002126'
                    className='no-underline text-[#17573C]'
                  >
                    19002126
                  </a>{' '}
                  {t('support')}
                </li>
              </ul>
              <div className='flex justify-center'>
                <Button
                  className='text-white flex justify-center bg-gradient-to-r outline-none from-[#17573C] to-[#4AC486] rounded-[6px] w-40 h-16 md:w-[250px] text-[16px]'
                  onClick={handleRetry}
                >
                  {t('try')}
                </Button>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
