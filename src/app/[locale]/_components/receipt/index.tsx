import Countdown from '@/components/customize/timer'
import React from 'react'
import VGABill from '../vga-bill'
import InforBill from '../infor-bill'
import SuccessAlert from '../success.alert'
import { useGlobalStore, useDiscountStore, useEmployeeStore } from '@/stores'

type Props = {
  vgacode?: string
  packageId?: string
  setSteps: (step: number) => void
}

const Receipt = ({ vgacode, setSteps }: Props) => {
  const { buyer, vga, feePackage, paymentInfo } = useGlobalStore()
  const { setDiscount } = useDiscountStore()
  const { setEmployee } = useEmployeeStore()
  if (!buyer || !paymentInfo || (!vga && !feePackage)) return null

  return (
    <div>
      <div className='text-center'>
        <p className='text-[24px] lg:text-[28px] font-bold uppercase'>
          THANH TOÁN {vgacode ? 'MUA MÃ VGA' : 'PHÍ HỘI VIÊN'}
        </p>
        {!!vgacode && (
          <div className='flex flex-col justify-center items-center'>
            <span className='text-[18px] mb-2'>
              Giao dịch sẽ tự động huỷ sau:{' '}
            </span>
            <p className='w-12 h-12 text-sm flex justify-center text-red-500 items-center rounded-full border border-red-500'>
              <Countdown />
            </p>
          </div>
        )}
      </div>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
        {/* COL 1 */}
        <VGABill />
        {/* {COL 2} */}
        <InforBill />
      </div>
      <div className='receipt flex  justify-center md:justify-end items-center gap-6 mt-6'>
        <button
          className='text-black leading-[64px] bg-white rounded-[6px] border-[1px] border-[#000] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'
          onClick={() => {
            setSteps(1)
            setDiscount(undefined)
            setEmployee(undefined)
          }}
        >
          Quay về
        </button>
        <SuccessAlert transactionId={paymentInfo?.transaction_id} />

        {/* MÃ ĐÃ ĐƯỢC MUA  */}
        {/* <HasPurchased /> */}
      </div>
    </div>
  )
}

export default Receipt
