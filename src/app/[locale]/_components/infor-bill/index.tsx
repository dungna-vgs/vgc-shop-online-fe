import { useGlobalStore } from '@/stores'
import { formatCurrency, generateVietQR } from '@/utils'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useToastStore } from '@/stores'

export default function InforBill() {
  const { t } = useTranslation('form')
  const { paymentInfo } = useGlobalStore()
  const { showToast } = useToastStore()
  if (!paymentInfo) return null

  const { bank } = paymentInfo

  const qrUrl = generateVietQR(bank)

  function copyData(str: string) {
    navigator.clipboard.writeText(str)
    showToast(t('copy'), 'success', 2000)
  }

  return (
    <div className='p-3 lg:p-6'>
      <p className='text-[20px] font-bold mb-6'>{t('payment-information')}</p>
      <span className='border-b border-b-[#000] py-2'>{t('transfer')}</span>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-center py-6'>
          <Image
            src={qrUrl}
            width={192}
            height={192}
            className='w-48 h-48'
            alt='QR code'
            quality={60}
          />
        </div>
        <p className='text-center'>{t('or-payment')}</p>

        {/* INFOR QR CODE    */}
        <div className='p-4 flex justify-between items-center border border-[#F1F1F1] rounded-[7px]'>
          <p className='text-black'>
            {t('account-holder')}{' '}
            <span className='font-semibold uppercase'>{bank.bank_account}</span>
          </p>
          <Image
            onClick={() => copyData(bank.bank_id)}
            className='cursor-pointer'
            src='/images/copy.svg'
            width={24}
            height={24}
            alt='Copy'
            quality={60}
          />
        </div>

        <div className='p-4 flex justify-between items-center border border-[#F1F1F1] rounded-[7px]'>
          <p className='text-black'>
            {t('account-number')}{' '}
            <span className='font-semibold uppercase'>{bank.bank_id}</span>
          </p>
          <Image
            onClick={() => copyData(bank.bank_id)}
            className='cursor-pointer'
            src='/images/copy.svg'
            width={24}
            height={24}
            alt='Copy'
            quality={60}
          />
        </div>
        <div className='p-4 flex justify-between items-center border border-[#F1F1F1] rounded-[7px]'>
          <p className='text-black'>
            {t('bank')}{' '}
            <span className='font-semibold uppercase'>{bank.bank_name}</span>
          </p>
          <Image
            onClick={() => copyData(bank.bank_name)}
            className='cursor-pointer'
            src='/images/copy.svg'
            width={24}
            height={24}
            alt='Copy'
            quality={60}
          />
        </div>
        <div className='grid lg:grid-cols-2 w-full h-full grid-cols-1 gap-4 '>
          <div className='p-4 border border-[#F1F1F1] rounded-[7px] flex justify-between items-center gap-4'>
            <p className='text-black'>
              {t('amount-1')}{' '}
              <span className=' font-semibold'>
                {formatCurrency(bank.money)}đ
              </span>
            </p>
            <Image
              onClick={() => copyData(bank.money.toString())}
              className='cursor-pointer'
              src='/images/copy.svg'
              width={24}
              height={24}
              alt='Copy'
              quality={60}
            />
          </div>
          <div className='p-4  border border-[#F1F1F1] rounded-[7px] flex justify-between items-center gap-4'>
            <p className='text-black'>
              {t('content')}{' '}
              <span className='font-semibold uppercase'>{bank.bank_code}</span>
            </p>
            <Image
              onClick={() => copyData(bank.bank_code)}
              className='cursor-pointer'
              src='/images/copy.svg'
              width={24}
              height={24}
              alt='Copy'
              quality={60}
            />
          </div>
        </div>
      </div>
      <p className='text-red-600 my-4'>{t('note')}</p>
    </div>
  )
}
