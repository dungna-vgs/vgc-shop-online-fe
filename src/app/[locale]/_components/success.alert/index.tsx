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
import { TPaymentInfo } from '@/types/type'
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'

type Props = {
  transactionId: TPaymentInfo['transaction_id']
}

export default function SuccessAlert({ transactionId }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState(0)

  const fetchTransactionStatus = useCallback(async () => {
    const res = await apiCheckTransactionStatus({
      transaction_id: transactionId
    })
    return res.data.transaction.status
  }, [transactionId])

  const handleRetry = useCallback(() => {
    setTransactionStatus(0)
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
          Đã thanh toán
        </AlertDialogTrigger>
        <AlertDialogContent className='mt-[84px] text-black'>
          {!transactionStatus ? (
            <>
              <AlertDialogTitle className='text-center uppercase'>
                Đang trong quá trình giao dịch
              </AlertDialogTitle>
              <AlertDialogDescription className='text-center'>
                Vui lòng không thoát khỏi màn hình và đợi trong giây lát
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
                Kiểm tra thành công
              </AlertDialogTitle>
              <ul className='text-center list-disc list-inside'>
                Trạng thái giao dịch thành công!
                <li>Vui lòng kiểm tra tài khoản vHandicap nhận.</li>
                <li>
                  Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ CSKH qua hotline{' '}
                  <a
                    href='tel:0899955599'
                    className='no-underline text-[#17573C]'
                  >
                    0899.955.599
                  </a>{' '}
                  để được hỗ trợ.
                </li>
              </ul>
              <div className='flex justify-center'>
                <Link href='/'>
                  <Button className='text-white flex justify-center bg-gradient-to-r outline-none from-[#17573C] to-[#4AC486] rounded-[6px] w-40 h-16 md:w-[250px] text-[16px]'>
                    Trang chủ
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <AlertDialogTitle className='text-center uppercase'>
                Kiểm tra thất bại
              </AlertDialogTitle>
              <ul className='text-center list-disc list-inside'>
                Trạng thái giao dịch không thành công!
                <li>Vui lòng kiểm tra lại nội dung chuyển khoản.</li>
                <li>
                  Hoặc liên hệ CSKH qua hotline{' '}
                  <a
                    href='tel:0899955599'
                    className='no-underline text-[#17573C]'
                  >
                    0899.955.599
                  </a>{' '}
                  để được hỗ trợ.
                </li>
              </ul>
              <div className='flex justify-center'>
                <Button
                  className='text-white flex justify-center bg-gradient-to-r outline-none from-[#17573C] to-[#4AC486] rounded-[6px] w-40 h-16 md:w-[250px] text-[16px]'
                  onClick={handleRetry}
                >
                  Thử lại
                </Button>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
