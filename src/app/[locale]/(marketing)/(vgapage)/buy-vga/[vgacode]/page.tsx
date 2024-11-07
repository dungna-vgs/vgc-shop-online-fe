'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './style.module.css'

import ContentFillForm from '@/components/customize/content.fill.form'
import ContentCheck from '@/app/[locale]/_components/content-check'
import Receipt from '@/app/[locale]/_components/receipt'

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
    <div className='mt-[84px]'>
      <div>
        <div className='flex justify-between'>
          {props.items.map((item, index) => (
            <div key={index} className='flex items-center gap-2 lg:gap-4'>
              <div
                className={
                  index == props.active
                    ? 'bg-green-700 min-w-6 h-6 flex justify-center rounded-full'
                    : 'bg-[#ccc] min-w-6 h-6 flex justify-center rounded-full'
                }
              >
                <Image
                  height={12}
                  width={12}
                  alt='VGA Icon'
                  src={item.src}
                  className='min-h-3'
                />
              </div>
              <div>
                <p
                  className={
                    index == props.active
                      ? ' text-[14px]'
                      : ' text-[#ccc] text-[14px]'
                  }
                >
                  {item.title}
                </p>
                <p
                  className={
                    index == props.active
                      ? '  text-sm lg:text-[19px]'
                      : 'text-[#ccc] text-sm lg:text-[19px]'
                  }
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='py-12 px-0 '>{props.items[props.active].content}</div>
    </div>
  )
}

type TBuyVGAProps = {
  params: {
    vgacode: string
  }
}

export default function BuyVGA({ params }: TBuyVGAProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    {
      title: 'Bước 1',
      src: '/images/Location.svg',
      description: 'Điền thông tin',
      content: (
        <ContentFillForm vgacode={params.vgacode} setSteps={setCurrentStep} />
      )
    },
    {
      title: 'Bước 2',
      src: '/images/Shipping.svg',
      description: 'Kiểm tra',
      content: (
        <ContentCheck vgacode={params.vgacode} setSteps={setCurrentStep} />
      )
    },
    {
      title: 'Bước 3',
      src: '/images/Payment.svg',
      description: 'Thanh toán',
      content: <Receipt vgacode={params.vgacode} setSteps={setCurrentStep} />
    }
  ]
  return (
    <div className={styles.containerBg}>
      <div className='w-full min-h-[100vh] py-12 lg:px-32 sm:px-8 px-4 text-black'>
        <Tabs items={steps} active={currentStep} />
      </div>
    </div>
  )
}
