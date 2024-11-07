import { TYPE_ENVIRONMENT } from '@/configs'
import { NextRequest } from 'next/server'
import { TFeePackage, TPaymentInfo } from '@/types/type'

export const isURL = (stringUrl: string): boolean => {
  try {
    const url = new URL(stringUrl)
    return !!url
  } catch (e) {
    console.log(e)
    return false
  }
}

export const openNewTab = (stringUrl: string): void => {
  try {
    if (isURL(stringUrl)) {
      window.open(stringUrl)
    } else {
      throw new Error('')
    }
  } catch (e) {
    console.log(e)
  }
}

export const isColor = (color: string): boolean => {
  return /^#([0-9a-fA-F]{3}){1,2}$/.test(color)
}

export const isEmail = (email: string): boolean => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

export const isValidPassword = (password: string): boolean => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{8,}$/.test(
    password
  )
}

export const isValidCodeClub = (code: string): boolean => {
  return /^[A-Z0-9_]{1,20}$/.test(code)
}

export interface TRequest<T = null> extends NextRequest {
  query: T
  origin: string
}

export function isValidDomainStore<T = null>(req: TRequest<T>): boolean {
  if (TYPE_ENVIRONMENT.LOCALHOST !== process.env.ENVIROMENT) {
    const { origin } = req
    return !!(origin && origin.includes('-store.'))
  }
  return true
}

export function getQueryRequest<T>(req: NextRequest) {
  const { origin, searchParams } = new URL(req.url)
  const query = Object.fromEntries(searchParams) as T
  return {
    ...req,
    origin,
    query
  } as TRequest<T>
}

export function formatCurrency(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const calculateDiscountedPrice = (
  originalPrice: number,
  discountPercentage: number,
  typediscount: string
): number => {
  const discountAmount = calculateDiscountAmount(
    originalPrice,
    discountPercentage,
    typediscount
  )
  return originalPrice - discountAmount
}
export const calculateDiscountAmount = (
  originalPrice: number,
  discountValue: number,
  typediscount: string
): number => {
  if (typediscount == 'direct_discount') return Math.floor(discountValue)
  return (originalPrice * discountValue) / 100
}
export function getMembershipPackageName(feePackage: TFeePackage) {
  if (feePackage.sub_name.startsWith('Pre')) {
    return `Premium ${feePackage.year_add}`
  }
  return feePackage.sub_name
}

export function generateVietQR({
  bank_account,
  bank_code,
  bank_id,
  money
}: TPaymentInfo['bank']) {
  const baseUrl = `https://img.vietqr.io/image/970428-${bank_id}-compact.png`
  const params = new URLSearchParams({
    amount: money ? money.toString() : '',
    addInfo: bank_code || '',
    accountName: bank_account || ''
  })

  return `${baseUrl}?${params.toString()}`
}
