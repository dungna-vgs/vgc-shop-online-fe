import { TParamsSearchVGA } from '@/apis/internals/clients/search.vga'
import {
  TVga,
  TFeePackage,
  TGolfer,
  TPaymentInfo,
  TVoucher,
  TEmployee
} from '@/types/type'
import { create } from 'zustand'

type TSearchVGA = TParamsSearchVGA & {
  setVga: (vga: string) => void
  setSignificanceId: (significance_id: number) => void
  setMoney: (money_from?: number, money_to?: number) => void
  setPage: (page: number, limit: number) => void
  setDirection: (direction?: string) => void
}

export const useSearchVGA = create<TSearchVGA>((set) => ({
  vga: undefined,
  significance_id: -1,
  money_to: undefined,
  money_from: undefined,
  page: 1,
  limit: 24,
  direction: undefined,
  setVga: (vga: string) => set({ vga, page: 1 }),
  setSignificanceId: (significance_id: number) =>
    set({ significance_id, page: 1 }),
  setMoney: (money_from?: number, money_to?: number) =>
    set({ money_from, money_to, page: 1 }),
  setPage: (page: number, limit: number) => set({ page, limit }),
  setDirection: (direction?: string) => set({ direction, page: 1 })
}))

export type THomeStore = {
  vgas: TVga[]
  fees: TFeePackage[]
  vgaSearchAll: TVga[]
  totalSearch: number | null
  keyword: string | null
  feeSearchAll: TFeePackage[]
  buyer: TGolfer | null
  vga: TVga | null
  totalPage: number | null
  feePackage: TFeePackage | null
  paymentInfo: TPaymentInfo | null
  setVgas: (vgas: TVga[]) => void
  setFees: (fees: TFeePackage[]) => void
  setSearchAll: ({
    vgaSearchAll,
    feeSearchAll,
    totalSearch,
    totalPage
  }: {
    vgaSearchAll: TVga[]
    feeSearchAll: TFeePackage[]
    totalSearch: number | null
    totalPage: number | null
  }) => void
  setBuyer: (buyer: TGolfer | null) => void
  setVga: (vga: TVga | null) => void
  setFeePackage: (feePackage: TFeePackage | null) => void
  setPaymentInfo: (paymentInfo: TPaymentInfo | null) => void
  setKeyword: (keyword: string | null) => void
}

export const useGlobalStore = create<THomeStore>((set) => ({
  vgas: [],
  fees: [],
  vgaSearchAll: [],
  feeSearchAll: [],
  totalSearch: null,
  keyword: null,
  searchVGA: {},
  buyer: null,
  vga: null,
  feePackage: null,
  totalPage: null,
  paymentInfo: null,
  setVgas: (vgas) => set({ vgas }),
  setFees: (fees) => set({ fees }),
  setKeyword: (keyword: string | null) => set({ keyword }),
  setSearchAll: ({ vgaSearchAll, feeSearchAll, totalSearch, totalPage }) =>
    set({
      vgaSearchAll,
      feeSearchAll,
      totalSearch,
      totalPage
    }),
  setBuyer: (buyer) => set({ buyer }),
  setVga: (vga) => set({ vga }),
  setFeePackage: (feePackage) => set({ feePackage }),
  setPaymentInfo: (paymentInfo) => set({ paymentInfo })
}))

type ToastType = 'success' | 'error'
type ToastState = {
  open: boolean
  message: string
  duration: number
  type: ToastType
  showToast: (message: string, type: ToastType, duration?: number) => void
  hideToast: () => void
}

export const useToastStore = create<ToastState>((set) => ({
  open: false,
  message: '',
  duration: 3000,
  type: 'success',
  showToast: (message, type = 'success', duration = 3000) => {
    console.trace('showToast', {
      message,
      type,
      duration
    })
    set({ open: true, message, type, duration })
  },
  hideToast: () =>
    set({ open: false, message: '', type: 'success', duration: 3000 })
}))

export const useDiscountStore = create<{
  discount: TVoucher | undefined
  setDiscount: (discount: TVoucher | undefined) => void
}>((set) => ({
  discount: undefined,
  setDiscount: (discount) => set({ discount })
}))

export const useEmployeeStore = create<{
  employee: TEmployee | undefined
  setEmployee: (employee: TEmployee | undefined) => void
  setEmployeeCode: (id: string) => void
}>((set) => ({
  employee: undefined,
  setEmployee: (employee) => set({ employee }),
  setEmployeeCode: (employee_code) =>
    set((state) => ({
      employee: state.employee
        ? { ...state.employee, employee_code }
        : ({ employee_code } as TEmployee)
    }))
}))

export const useLoading = create<{
  loading: boolean
  setLoading: (loading: boolean) => void
}>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading })
}))
