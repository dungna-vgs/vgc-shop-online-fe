const ADDRESS_REGISTING_MARKETING =
  'BT4.7-Khu biệt thự ngoại giao đoàn, P.Xuân Tảo, Q.Bắc Từ Liêm, Hà nội'

const APP_NAME = 'Ecommerce'

const EMAIL_CONTACT = 'feedback@vgcorp.vn'
const PHONE_CONTACT = '1900 2126'

const LANGUAGES = [
  {
    value: 'vi',
    image: 'vietnam.svg',
    alt: 'Vietnamese'
  },
  {
    value: 'en',
    image: 'english.svg',
    alt: 'English'
  }
]

const WAITING_TIMEOUT = 600

const enum STATUS_CHECK_TRANSACTION {
  PENDING = 0
}

export const enum TYPE_MEMBERSHIP_PACKAGE {
  PREMIUM = 3,
  PRIORITY = 13
}

export {
  ADDRESS_REGISTING_MARKETING,
  APP_NAME,
  EMAIL_CONTACT,
  PHONE_CONTACT,
  LANGUAGES,
  WAITING_TIMEOUT,
  STATUS_CHECK_TRANSACTION
}
