//Tìm kiếm tất cả
import { NextRequest, NextResponse } from 'next/server'
import { API_ENDPOINT } from '@/configs'
import { createAxiosInstanceServer } from '@/apis'
import { isValidDomainStore } from '@/utils'
import Joi from 'joi'
import { getQueryRequest } from '@/utils'
import { TFeePackage, TGolfer, TVga } from '@/types/type'

export enum ETransactionProvider {
  DIGITAL = 'digital',
  UPGRADE_ACCOUNT = 'upgrade_account'
}

export type TBuyVgaBodyRequest = {
  provider: ETransactionProvider.DIGITAL
  user_id: TGolfer['id']
  money: TVga['amount']
  number: TVga['id']
  type_tranfer: 'buy'
}

export type TPayFeeMemberBodyRequest = {
  provider: ETransactionProvider.UPGRADE_ACCOUNT
  user_id: TGolfer['id']
  money: TFeePackage['amount']
  upgrade_id: TFeePackage['id']
}

export type TTransactionBodyRequest =
  | TBuyVgaBodyRequest
  | TPayFeeMemberBodyRequest

function validation(bodyRequest: TTransactionBodyRequest) {
  const schema = Joi.object<TTransactionBodyRequest>({
    provider: Joi.string()
      .valid(...Object.values(ETransactionProvider))
      .required(),
    user_id: Joi.number().required(),
    money: Joi.number().required(),

    // Conditional validation for `type_transfer` based on `number`
    number: Joi.number().when('provider', {
      is: ETransactionProvider.DIGITAL,
      then: Joi.required()
    }),
    type_tranfer: Joi.string()
      .valid('buy')
      .when('number', { is: Joi.exist(), then: Joi.required() }),

    // Allow `upgrade_id` for `TPayFeeMemberBodyRequest`
    upgrade_id: Joi.number().when('provider', {
      is: ETransactionProvider.UPGRADE_ACCOUNT,
      then: Joi.required()
    })
  })
  return schema.validate(bodyRequest)
}

export async function POST(request: NextRequest) {
  const req = getQueryRequest(request)
  const { origin } = req
  const body = await request.json()
  const { error, warning } = validation(body)
  if (error || warning) {
    return NextResponse.json({
      message: 'Dữ liệu không hợp lệ!',
      success: false,
      error,
      warning,
      redirect: `${origin}/not-found`
    })
  }

  if (!isValidDomainStore(req)) {
    return NextResponse.json({
      message: 'Không tìm thấy đại lý này!',
      success: false,
      origin,
      data: null,
      redirect: `${origin}/not-found`
    })
  }

  const axiosInstance = createAxiosInstanceServer(origin)
  const res = await axiosInstance.post(API_ENDPOINT.CREATE_TRANSACTION, body)
  return NextResponse.json({
    success: true,
    data: res.data.data,
    redirect: null
  })
}