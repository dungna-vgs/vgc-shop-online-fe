import { NextResponse } from 'next/server'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import moment from 'moment'

const ggKey = {
  private_key: process.env.GG_PRIVATE_KEY,
  client_email: process.env.GG_CLIENT_EMAIL
}

function convertLocationTimeToGTM7Time(date: Date) {
  const format = 'HH:mm DD/MM/YYYY'
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000
  const singaporeTime = new Date(utcTime + 7 * 60 * 60000)
  const formatedDate = moment(singaporeTime).format(format)
  return formatedDate
}

type TData = {
  name: string
  email: string
  phone: string
  service: string
}
const updateDataToGoogleSheet = async (data: TData) => {
  try {
    const SHEET_ID = process.env.SHEET_ID!;
    const serviceAccountAuth = new JWT({
      email: ggKey.client_email,
      key: ggKey.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    const currentDate = new Date()
    const formatedDate = convertLocationTimeToGTM7Time(currentDate)
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    await sheet.addRow({
      ...data,
      createdAt: formatedDate
    })
    return [true, null]
  } catch (e) {
    console.log(e)
    return [false, e]
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  await updateDataToGoogleSheet(body)
  return NextResponse.json(body)
}
