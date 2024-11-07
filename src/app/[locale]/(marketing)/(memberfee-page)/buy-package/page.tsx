'use client'
import { useState } from 'react'
import Image from 'next/image'
import ContentFillForm from '@/components/customize/content.fill.form'
import ContentCheck from '@/app/[locale]/_components/content-check'
import Receipt from '@/app/[locale]/_components/receipt'
import { useSearchParams } from 'next/navigation'
import styles from './style.module.css'

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
                      ? ' text-sm lg:text-[19px]'
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
    <div className={styles.containerBg}>
      <div className='mt-[84px] w-full min-h-[100vh] py-12 lg:px-32 sm:px-8 px-4 text-black'>
        <Tabs items={steps} active={currentStep} />
      </div>
    </div>
  )
}
