import { NextResponse } from 'next/server'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import moment from 'moment'

const ggKey = {
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCbYpT7mGPztSMo\n3mzBxGXk62x6Sx0/TO7x+lQam1o3TXEoO/79odvLwZEmxlaQdhXrgQ0IBvjQTjnX\nd3I9IJlobLRiX9jK/GOTFWg0Mxt+0wp2Kka/vmhHUGEqLiWke3Seiq+/tdo8vNRg\nFUq8AfrS+kS3BNEXhyHbcIa1oyWIwCcEJkjCDW8B6A7e815zXl8zfB1IQikFKFUK\nyjZkxPPT9qPhNGKWgSNBVxM6B3SXvR2mEQnR/34CqpxKAXOfH3XJX7vOmHuf9CGv\nUVKZ92rJcEEw8oPuDHZEI9h1fDZykXuix63x7OdQ2ajrLdRHYnOOSq79lTmed9JY\n/TzYl4d1AgMBAAECggEACM3O3at+fEw21AW4OUlYsZ4CLTKs002XW0gA9Gn5dFkz\nsGEn2zSMyNBsmjsSJAjAyLFs7NfCSMEp51Kp+xsp/f/sv4cpOCUROj/0AcMki2zH\nMrdF/265J1M/Uh2/vcBN9P6sIwtZdGgJi3EhZSIilUofUxRXiYL7UNzhEREPmx4b\nX3ecatgxFA4k0WymmQ5mGz9ic9rMvcbVxACwTxWIVKI1bVN/JxojCq7cKMvj+4zI\nd3SroiC98K86j/fYt6TVMAdfM6SVXN4wWtmPn5qsrmSGbCi8S+8fVsaV0B7Sf1Ab\n1h7FCdSL36o31YZOWrH2Ku74siqzHWDUmWikKZYgGQKBgQDWEDu1PF7Mt5PODXhZ\nG76UesUd+tCGHB6Sxram9GLpAJg/YgHU1BFKWWzP2mI/908e8m0KVbjb3OkOgPwp\n3Y73zQwUCcFDaDoyIsZkIqpUt8wR+hZTRWb30CJNSZbwldfeHQnNGrEPql/oARrm\njBzXb51CEsaBsHwygqFhz+UrKQKBgQC5039PW8rNXL0WtQJwcnXP4dKCOYT30yBe\nd0TrMxqs92w+68CcXlR3n55eWo6xo/HUJdnwb3p9lCNmgk8y3jBzK9dWI+R5LpIW\nxkU7kQw57ndvtuAE+N3NDezJMCkjc1+4tFJ49H5xnkyzKS5TBmFISxESl+CJssy6\nWK16du7PbQKBgEXzeA95cuEi/EHRVQqJbnXGyLNLSukIN1VvajCUm93YO+g6dq69\nvgi1wEEL9B9DCa/rOIawDICMZ/w9Wim0JQwFDXVe2rDUVnAbvQjr6w1UInOdbb44\nZ7WDZjIrYg+sZ6ZFhvZnSoT7/+sosUm1b5dW+eSljgjDS1KWLXZxIUpBAoGBAIIY\nedbbUr43oQIWs6B54dUqKjCViGvgWZcJNSzc2F4j0pqyfmR6/fPJwhwYljHzr0hx\nP4U+5qioX6hSrpPUTmMzXEyoUDouyoQ7RxkO0Vp1gxSpGWkhulbm2tF3cDWrfmZX\niC26LhPpWZVMzWu+2bi9JTS5M6/zh7UmhD1qqoJ5AoGBAJBh1IDqnSPMXjOb/HMk\n1DcoNKrS68dkKv/5kX6zJp5GI2652bZmbf7YGxSqdGiyVjbDJ0oruEcDbzkrS3qB\neuxN8S0WDzivzhVXxjuEaOc//ecgORJfO+wdap/XMDQE4yMT/VQ157ABYPFJpg6q\noBClt1HWR3ESmQaiLPRDTjZ3\n-----END PRIVATE KEY-----\n',
  client_email: 'ecommerce-dev@ecommerce-444506.iam.gserviceaccount.com'
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
    const SHEET_ID = '1sQJSuLFFWuZnDpLQikEfyWrf5IDrlt3wf8WI3vR6b6E'
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
