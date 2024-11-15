'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './style.module.css'

import ContentFillForm from '@/components/customize/content.fill.form'
import ContentCheck from '@/app/[locale]/_components/content-check'
import Receipt from '@/app/[locale]/_components/receipt'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('form')

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
                  quality={60}
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
                  {t(item.title)}
                </p>
                <p
                  className={
                    index == props.active
                      ? '  text-sm lg:text-[19px]'
                      : 'text-[#ccc] text-sm lg:text-[19px]'
                  }
                >
                  {t(item.description)}
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

type TBuyPackageProps = {
  params: {
    packageId: string
  }
  promotion: number
}

export default function TabBuyPackage({ params, promotion }: TBuyPackageProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const { t } = useTranslation()
  const steps = [
    {
      title: t('step-1'),
      src: '/images/Location.svg',
      description: t('des-1'),
      content: (
        <ContentFillForm
          packageId={params.packageId}
          setSteps={setCurrentStep}
        />
      )
    },
    {
      title: t('step-2'),
      src: '/images/Shipping.svg',
      description: t('des-2'),
      content: (
        <ContentCheck
          promotion={promotion}
          packageId={params.packageId}
          setSteps={setCurrentStep}
        />
      )
    },
    {
      title: 'step-3',
      src: '/images/Payment.svg',
      description: 'des-3',
      content: (
        <Receipt
          promotion={promotion}
          packageId={params.packageId}
          setSteps={setCurrentStep}
        />
      )
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
