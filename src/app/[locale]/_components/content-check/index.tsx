import React, { useState } from 'react'
import RecipientCard from '../recipient'
import DummyInvoice from '../dummy-invoice'
import {
  useGlobalStore,
  useDiscountStore,
  useEmployeeStore,
  useToastStore
} from '@/stores'
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
import { apiCheckEmployeeCode } from '@/apis/internals/clients/check.employee'
import { ETransactionProvider } from '@/types/transaction-provider'
import { useTranslation } from 'react-i18next'

type Props = {
  vgacode?: string
  packageId?: string
  setSteps: (step: number) => void
  promotion: number
}

const ContentCheck = ({ vgacode, packageId, setSteps, promotion }: Props) => {
  const { t } = useTranslation('form')
  const { buyer, vga, feePackage, setPaymentInfo } = useGlobalStore()
  const [loading, setLoading] = useState<boolean>(false)
  const { discount, setDiscount } = useDiscountStore()
  const { employee, setEmployee } = useEmployeeStore()
  const showToast = useToastStore((state) => state.showToast)
  const onSubmit = async () => {
    if (!buyer) return

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
      if (employee?.employee_code) {
        const checkedEmployee = await handleCheckEmployeeCode()
        if (checkedEmployee) {
          bodyRequest.sale_code = employee?.employee_code
        } else {
          return
        }
      }
      setLoading(true)
      const res = await apiCreateTransaction(bodyRequest)

      if (res.success) {
        setPaymentInfo(res.data)
        setSteps(2)
      }
    }

    setLoading(false)
  }
  const handleCheckEmployeeCode = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!employee?.employee_code) {
          reject('No employee code')
          return
        }

        const res = await apiCheckEmployeeCode({
          employee_code: employee?.employee_code
        })

        if (res.data.error_code === 200) {
          setEmployee(res.data.data)
          setTimeout(() => {
            resolve(res.data.data)
          }, 0)
        } else {
          showToast(t('error-code'), 'error', 2000)
          reject('Invalid employee code')
        }
      } catch (error) {
        showToast(t('error'), 'error', 2000)
        reject(error)
      }
    })
  }
  return !!buyer && (!!vga || !!feePackage) ? (
    <div className='content-check'>
      <div>
        <p className='font-bold text-center text-[22px] lg:text-[28px] uppercase pb-12'>
          {t('check')} {vgacode ? t('buy-vga') : t('buy-package')}
        </p>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
          <RecipientCard
            golfer={buyer}
            vga={vgacode ? vga : null}
            feePackage={packageId ? feePackage : null}
          />
          {/* COLS 2  */}
          <DummyInvoice
            promotion={promotion}
            amount={vga?.amount || feePackage?.amount || 0}
          />
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
          {t('back')}
        </button>
        <button
          className='text-white leading-[64px] bg-gradient-to-r from-[#17573C] to-[#4AC486] disabled:bg-none disabled:!bg-[#979797] rounded-[6px] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'
          onClick={onSubmit}
        >
          {t('next')}
        </button>
      </div>

      <AlertDialog open={loading}>
        <AlertDialogContent>
          <AlertDialogTitle className='text-center uppercase'>
            {t('initializing')}
          </AlertDialogTitle>
          <AlertDialogDescription className='text-center'>
            {t('please')}
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
