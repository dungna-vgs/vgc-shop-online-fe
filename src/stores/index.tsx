import { TParamsSearchVGA } from '@/apis/internals/clients/search.vga'
import { TVga, TFeePackage, TGolfer, TPaymentInfo } from '@/types/type'
import { create } from 'zustand'

export type THomeStore = {
  vgas: TVga[]
  searchVGA: TParamsSearchVGA
  fees: TFeePackage[]
  vgaSearchAll: TVga[]
  feeSearchAll: TFeePackage[]
  buyer: TGolfer | null
  vga: TVga | null
  feePackage: TFeePackage | null
  paymentInfo: TPaymentInfo | null
  setVgas: (vgas: TVga[]) => void
  setFees: (fees: TFeePackage[]) => void
  setSeachVGA: (searchVGA: TParamsSearchVGA) => void
  setSearchAll: ({
    vgaSearchAll,
    feeSearchAll
  }: {
    vgaSearchAll: TVga[]
    feeSearchAll: TFeePackage[]
  }) => void
  setBuyer: (buyer: TGolfer | null) => void
  setVga: (vga: TVga | null) => void
  setFeePackage: (feePackage: TFeePackage | null) => void
  setPaymentInfo: (paymentInfo: TPaymentInfo | null) => void
}

export const useGlobalStore = create<THomeStore>((set, get) => ({
  vgas: [],
  fees: [],
  vgaSearchAll: [],
  feeSearchAll: [],
  searchVGA: {},
  buyer: null,
  vga: null,
  feePackage: null,
  paymentInfo: null,
  setVgas: (vgas) => set({ vgas }),
  setFees: (fees) => set({ fees }),
  setSeachVGA: (searchVGA) => {
    const oldSearchVGA = get().searchVGA
    if (
      Object.hasOwn(searchVGA, 'money_from') ||
      Object.hasOwn(searchVGA, 'money_to')
    ) {
      delete oldSearchVGA.money_from
      delete oldSearchVGA.money_to
    }
    if (!searchVGA.money_from) {
      delete searchVGA.money_from
    }
    if (!searchVGA.money_to) {
      delete searchVGA.money_to
    }
    set({
      searchVGA: {
        ...oldSearchVGA,
        ...searchVGA
      }
    })
  },
  setSearchAll: ({ vgaSearchAll, feeSearchAll }) => {
    set({
      vgaSearchAll,
      feeSearchAll
    })
  },
  setBuyer: (buyer) => set({ buyer }),
  setVga: (vga) => set({ vga }),
  setFeePackage: (feePackage) => set({ feePackage }),
  setPaymentInfo: (paymentInfo) => set({ paymentInfo })
}))
