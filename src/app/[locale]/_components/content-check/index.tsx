import React, { useState } from 'react'
import RecipientCard from '../recipient'
import DummyInvoice from '../dummy-invoice'
import { useGlobalStore, useDiscountStore, useEmployeeStore } from '@/stores'
import { apiCreateTransaction } from '@/apis/internals/clients/create.transaction'
import {
  TBuyVgaBodyRequest,
  TPayFeeMemberBodyRequest
} from '@/app/api/create-transaction/route'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import Loading from '@/components/ui/loading'
import { ETransactionProvider } from '@/types/transaction-provider'

type Props = {
  vgacode?: string
  packageId?: string
  setSteps: (step: number) => void
}

const ContentCheck = ({ vgacode, packageId, setSteps }: Props) => {
  const { buyer, vga, feePackage, setPaymentInfo } = useGlobalStore()
  const [loading, setLoading] = useState<boolean>(false)
  const { discount, setDiscount } = useDiscountStore()
  const { employee, setEmployee } = useEmployeeStore()
  const onSubmit = async () => {
    if (!buyer) return

    setLoading(true)

    let bodyRequest

    if (vgacode && vga) {
      bodyRequest = {
        provider: ETransactionProvider.DIGITAL,
        user_id: buyer.id,
        money: vga.original_amount || vga.amount,
        number: vga.id,
        type_tranfer: 'buy'
      } as TBuyVgaBodyRequest
    }

    if (packageId && feePackage) {
      bodyRequest = {
        provider: ETransactionProvider.UPGRADE_ACCOUNT,
        user_id: buyer.id,
        money: feePackage.original_amount || feePackage.amount,
        upgrade_id: feePackage.id
      } as TPayFeeMemberBodyRequest
    }

    if (bodyRequest) {
      if (discount) bodyRequest.voucher_id = discount.id
      if (employee) bodyRequest.sale_code = employee.employee_code

      const res = await apiCreateTransaction(bodyRequest)

      if (res.success) {
        setPaymentInfo(res.data)
        setSteps(2)
      }
    }

    setLoading(false)
  }

  return !!buyer && (!!vga || !!feePackage) ? (
    <div className='content-check'>
      <div>
        <p className='font-bold text-center text-[22px] lg:text-[28px] uppercase pb-12'>
          KIỂM TRA THÔNG TIN {vgacode ? 'MUA MÃ VGA' : 'ĐÓNG PHÍ HỘI VIÊN'}
        </p>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
          <RecipientCard
            golfer={buyer}
            vga={vgacode ? vga : null}
            feePackage={packageId ? feePackage : null}
          />
          {/* COLS 2  */}
          <DummyInvoice amount={vga?.amount || feePackage?.amount || 0} />
        </div>
      </div>
      <div className='flex justify-center md:justify-end items-center gap-6 mt-16'>
        <button
          className='text-black leading-[64px] bg-white rounded-[6px] border-[1px] border-[#000] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'
          onClick={() => {
            setSteps(0)
            setDiscount(undefined)
            setEmployee(undefined)
          }}
        >
          Quay về
        </button>
        <button
          className='text-white leading-[64px] bg-gradient-to-r from-[#17573C] to-[#4AC486] disabled:bg-none disabled:!bg-[#979797] rounded-[6px] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'
          onClick={onSubmit}
        >
          Tiếp theo
        </button>
      </div>

      <AlertDialog open={loading}>
        <AlertDialogContent>
          <AlertDialogTitle className='text-center uppercase'>
            Đang khởi tạo giao dịch
          </AlertDialogTitle>
          <AlertDialogDescription className='text-center'>
            Vui lòng không thoát khỏi màn hình và đợi trong giây lát
          </AlertDialogDescription>
          <div className='flex justify-center flex-col items-center gap-4'>
            <Loading />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ) : null
}

export default ContentCheck
