import { Button } from '@/components/ui/button'
import { useGlobalStore } from '@/stores'
import { generateVietQR } from '@/utils'
import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react';


export default function InforBill() {

  const { t } = useTranslation('form')
  const { paymentInfo } = useGlobalStore()

  if (!paymentInfo) return null

  const { bank } = paymentInfo

  const qrUrl = generateVietQR(bank)
  const [copy, setCopy] = useState(false)

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
          <p className='text-[#979797]'>
            {t('account-holder')}{' '}
            <span className='text-black uppercase'>{bank.bank_account}</span>
          </p>
        </div>
        <div className='p-4 flex justify-between items-center border border-[#F1F1F1] rounded-[7px]'>
          <p className='text-[#979797]'>
            {t('account-number')}{' '}
            <span className='text-black uppercase'>{bank.bank_id}</span>
          </p>
          <Image
            src='/images/copy.svg'
            width={24}
            height={24}
            alt='Copy'
            quality={60}
          />
        </div>
        <div className='p-4 flex justify-between items-center border border-[#F1F1F1] rounded-[7px]'>
          <p className='text-[#979797]'>
            {t('bank')}{' '}
            <span className='text-black uppercase'>{bank.bank_name}</span>
          </p>
          <Image
            src='/images/copy.svg'
            width={24}
            height={24}
            alt='Copy'
            quality={60}
          />
        </div>
        <div className='grid lg:grid-cols-2 w-full h-full grid-cols-1 gap-4 '>
          <div className='p-4 border border-[#F1F1F1] rounded-[7px] flex justify-between items-center gap-4'>
            <p className='text-[#979797]'>
              {t('amount-1')}{' '}
              <span className='text-black uppercase'>{bank.money}</span>
            </p>
            <Image
              src='/images/copy.svg'
              width={24}
              height={24}
              alt='Copy'
              quality={60}
            />
          </div>
          <div className='p-4  border border-[#F1F1F1] rounded-[7px] flex justify-between items-center gap-4'>
            <p className='text-[#979797]' >
              {t('content')}{' '}
              <span className='text-black uppercase'>{bank.bank_code}</span>
            </p>
        {
          copy ?  (
             <Button variant='ghost' size='none'>
            <Check/>
            </Button>
          ) : (
            <Button variant='ghost' size='none' onClick={() => {
              navigator.clipboard.writeText();
              setCopy(true)
              setTimeout(() => {
              setCopy(false)
              },2000)
            }}>
            <Image
                 src='/images/copy.svg'
                 width={24}
                 height={24}
                 alt='Copy'
                 quality={60}
               />
            </Button>
          ) 
        }
          </div>
        </div>
      </div>
      <p className='text-red-600 my-4'>{t('note')}</p>
    </div>
  )
}
