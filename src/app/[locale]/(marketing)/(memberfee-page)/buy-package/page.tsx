'use client'
import { useState } from 'react'
import Image from 'next/image'

import RecipientCard from '@/app/[locale]/_components/recipient'
import DummyInvoice from '@/app/[locale]/_components/dummy-invoice'
import VGABill from '@/app/[locale]/_components/vga-bill'
import InforBill from '@/app/[locale]/_components/infor-bill'
import SuccessAlert from '@/app/[locale]/_components/success.alert'
import ContentFillForm from '@/components/customize/content.fill.form'

type TItemProps = {
  setSteps: (step: number) => void
}

function ContentCheck(props: TItemProps) {
  return (
    <div className='content-check'>
      <div>
        <p className='font-bold text-center text-[28px] uppercase pb-12'>
          KIỂM TRA THÔNG TIN MUA MÃ VGA
        </p>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
          <RecipientCard />
          <DummyInvoice />
        </div>
      </div>
      <div className='flex justify-end items-center gap-6 mt-16'>
        <button
          className='text-black leading-[64px]  hover:text-white hover:border-none  bg-white hover:bg-gradient-to-r from-[#17573C] to-[#4AC486] rounded-[6px] border-[1px] border-[#000 flex justify-center w-40 md:w-[250px] h-16 text-[16px]'
          onClick={() => props.setSteps(0)}
        >
          Quay về
        </button>
        <button
          className='text-white leading-[64px] hover:bg-gradient-to-r from-[#17573C] to-[#4AC486] bg-[#979797] rounded-[6px] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'
          onClick={() => props.setSteps(2)}
        >
          Tiếp theo
        </button>
      </div>
    </div>
  )
}

function Receipt(props: TItemProps) {
  return (
    <div>
      <div className='text-center'>
        <p className='text-[28px] font-bold uppercase'>
          THANH TOÁN PHÍ HỘI VIÊN
        </p>
      </div>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
        {/* COL 1 */}
        <VGABill />
        {/* {COL 2} */}
        <InforBill />
      </div>
      <div className='receipt flex justify-end items-center gap-6 mt-6'>
        <button
          className='text-black leading-[64px] hover:text-white hover:border-none  bg-white hover:bg-gradient-to-r from-[#17573C] to-[#4AC486] rounded-[6px] border-[1px] border-[#000 flex justify-center w-40 md:w-[250px] h-16 text-[16px]'
          onClick={() => props.setSteps(1)}
        >
          Quay về
        </button>
        <SuccessAlert />
      </div>
    </div>
  )
}
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
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: 'Bước 1',
      src: '/images/Location.svg',
      description: 'Điền thông tin',
      content: (
        <ContentFillForm vgacode='' package='' setSteps={setCurrentStep} />
      )
    },
    {
      title: 'Bước 2',
      src: '/images/Shipping.svg',
      description: 'Kiểm tra',
      content: <ContentCheck setSteps={setCurrentStep} />
    },
    {
      title: 'Bước 3',
      src: '/images/Payment.svg',
      description: 'Thanh toán',
      content: <Receipt setSteps={setCurrentStep} />
    }
  ]

  return (
    <div className='mt-[84px] w-full min-h-[100vh] py-12 lg:px-32 sm:px-8 px-4 text-black'>
      <Tabs items={steps} active={currentStep} />
    </div>
  )
}
