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
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import Loading from '@/components/ui/loading'
import { apiCheckEmployeeCode } from '@/apis/internals/clients/check.employee'
import { ETransactionProvider } from '@/types/transaction-provider'
import { useTranslation } from 'react-i18next'
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { STATUS_VGA } from '@/types/enum'
import { Button } from '@/components/ui/button'
import ExistAlert from '@/components/customize/exist.alert'
import HoldVGA from '@/components/customize/hold.vga'
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
  const [confirm, setConfirm] = useState<boolean>(false)
  const [error, setError] = useState<STATUS_VGA | null>(null)

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

      console.log('apiCreateTransaction: ', res)
      if (res.success) {
        setPaymentInfo(res.data)
        setSteps(2)
      } else {
        if (res.error) {
          setError(res.error)
        }
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

  const handleConfirmDiscount = () => {
    if (discount) {
      return setConfirm(true)
    } else {
      onSubmit()
    }
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
          <DummyInvoice
            promotion={promotion}
            vgacode={vgacode}
            packageId={packageId}
            amount={vga?.amount || feePackage?.amount || 0}
          />
        </div>
      </div>
      <HoldVGA open={error == STATUS_VGA.HOLD} onClose={() => setError(null)} />
      <ExistAlert
        open={error == STATUS_VGA.PURCHASED}
        onClose={() => setError(null)}
      />
      <div className='flex justify-center md:justify-end items-center gap-6 mt-16'>
        <Button
          className='text-black leading-[64px] bg-white hover:bg-gray-200 rounded-[6px] border-[1px] border-[#000] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'
          onClick={() => {
            setSteps(0)
            setDiscount(undefined)
            setEmployee(undefined)
          }}
        >
          {t('back')}
        </Button>

        <AlertDialog open={confirm}>
          <Button
            className='text-white leading-[64px] bg-gradient-to-r from-[#17573C] to-[#4AC486] disabled:bg-none disabled:!bg-[#979797] rounded-[6px] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'
            onClick={handleConfirmDiscount}
          >
            {t('next')}
          </Button>
          <AlertDialogContent>
            <AlertDialogHeader>
              <p className='w-full text-center font-bold text-black mb-3 uppercase'>
                {t('confirm-alert')}
              </p>
              <AlertDialogDescription className='text-black text-center'>
                {t('note-alert')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className='flex gap-4 justify-center items-center'>
              <AlertDialogCancel
                onClick={() => {
                  setConfirm(false)
                }}
                className='bg-[#D3090C] text-white font-semibold lg:w-[168px] h-16 w-28 rounded-[6px]'
              >
                {t('cancel-form')}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onSubmit}
                className='bg-gradient-to-r from-[#17573C] to-[#4AC486] lg:w-[168px] h-16  w-28'
              >
                {t('confirm')}
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
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
