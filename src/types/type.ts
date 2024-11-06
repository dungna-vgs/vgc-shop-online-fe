export type TVga = {
  id: number
  amount: number
  loai_ma: string | null
  original_amount?: number
  discount?: string
}

export type TFeePackage = {
  id: number
  option_name: string
  sub_name: string
  amount: number
  amount_display: string
  type: number
  status: number
  created_at: Date
  updated_at: Date
  year_add: number
  type_upgrade: number
  refund: number
  original_amount?: number
  discount?: string
}

export type TTypeVGA = {
  id: number
  prefix: string
  name: string
}

export enum PosAds {
  HOME_SLIDER = 'homepage-slider',
  HOME_CENTER = 'homepage-center',
  MEMBERSHIP_CENTER = 'membership-center',
  VGA_LEFT = 'vga-left'
}

export type TAds = {
  id: number
  title: string
  image: string
  link: string
  partner_id: null
  status: number
  is_mobile: number
  position: PosAds
  sort_order: number
  display_ratio: string
  created_at: Date
  updated_at: Date
}

export enum EDevice {
  MOBILE = 1,
  DESKTOP = 0
}

export type TPromotion = {
  id: number
  name: string
  image: string
  type: number
  discount_type: string
  discount: string
  money_from: string
  money_to: string
  prefix: null
  start_date: Date
  end_date: Date
  created_at: Date
  updated_at: Date
  sort_order: number
}

export type TMembershipPackage = {
  id: number
  option_name: string
  sub_name: string
  amount: number
  amount_display: string
  type: number
  status: number
  created_at: Date
  updated_at: Date
  year_add: number
  type_upgrade: number
  refund: number
  original_amount: number
  discount: string
}

export type TFilterPriceVGA = {
  min: number | null
  max: number | null
}

export type TGolfer = {
  id: number
  fullname: string
  nickname: null
  system_avatar_path: string
  id_display: null
  usga_hc_index: string
  phone: string
  email: null
  allow_using_scorecard_image: number
  country: string
  birthday: null
  is_suspended: number
  expried_time: Date
  gender: number
  golfer_id: number
}

export type TPaymentInfo = {
  bank: {
    bank_account: string
    bank_name: string
    bank_addess: string
    bank_id: string
    bank_code: string
    money: number
  }
  transaction_id: number
}

export type TPaymentStatus = {
  transaction: {
    id: TPaymentInfo['transaction_id']
    status: number
    type: string
    updated_at: Date
  }
}
