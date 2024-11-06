'use client'
import { useState } from 'react'
import Image from 'next/image'

import ContentFillForm from '@/components/customize/content.fill.form'
import ContentCheck from '@/app/[locale]/_components/content-check'
import Receipt from '@/app/[locale]/_components/receipt'
import { useSearchParams } from 'next/navigation'

type TTabsProps = {
  items: {
    title: string
    src: string
    description: string
    content: JSX.Element
  }[]
  active: number
}
function Tabs(props: TTabsProps) {
  return (
    <div>
      <div>
        <div className='flex justify-between'>
          {props.items.map((item, index) => (
            <div key={index} className='flex items-center gap-4'>
              <Image height={24} width={24} alt='VGA Icon' src={item.src} />
              <div>
                <p
                  className={
                    index == props.active
                      ? 'font-bold text-green-800 text-[14px]'
                      : 'font-light text-black text-[14px]'
                  }
                >
                  {item.title}
                </p>
                <p className='text-[19px]'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='py-12 px-0 '>{props.items[props.active].content}</div>
    </div>
  )
}

export default function BuyPackage() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get('membershipId') || ''

  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: 'Bước 1',
      src: '/images/Location.svg',
      description: 'Điền thông tin',
      content: (
        <ContentFillForm packageId={packageId} setSteps={setCurrentStep} />
      )
    },
    {
      title: 'Bước 2',
      src: '/images/Shipping.svg',
      description: 'Kiểm tra',
      content: <ContentCheck packageId={packageId} setSteps={setCurrentStep} />
    },
    {
      title: 'Bước 3',
      src: '/images/Payment.svg',
      description: 'Thanh toán',
      content: <Receipt packageId={packageId} setSteps={setCurrentStep} />
    }
  ]

  return (
    <div className='mt-[84px] w-full min-h-[100vh] py-12 lg:px-32 sm:px-8 px-4 text-black'>
      <Tabs items={steps} active={currentStep} />
    </div>
  )
}
