export enum TYPE_ENVIRONMENT {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  LOCALHOST = 'localhost'
}

export enum API_ENDPOINT {
  SEARCH_ALL = '/other/search-all',
  GET_SIGNIFICANCES = '/other/get-significances',
  SEARCH_VGA = '/other/search-vga',
  GET_VGA = '/other/get-vga',
  LIST_MEMBERSHIP_PACKAGES = '/other/list-membership-packages',
  GET_MEMBERSHIP_PACKAGE = '/other/get-membership-package',
  SEARCH_GOLFER = '/other/search-golfer',
  ECOMMERCE_STATUS = '/other/ecommerce-status',
  ECOMMERCE_BANNERS_BY_PARTNER = '/other/ecommerce-banners-by-partner',
  PROMOTION_PROGRAM = '/other/get-promotion-program',
  CREATE_TRANSACTION = '/other/create-payment',
  CHECK_TRANSACTION_STATUS = '/other/check-payment-status'
}

export enum API_INTERNAL_ENDPOINT {
  SEARCH_ALL = '/api/search-all',
  GET_SIGNIFICANCES = '/api/get-significances',
  SEARCH_VGA = '/api/search-vga',
  GET_VGA = '/api/get-vga',
  GET_MEMBERSHIP_PACKAGE = '/api/get-membership-package',
  SEARCH_GOLFER = '/api/search-golfer',
  CREATE_TRANSACTION = '/api/create-transaction',
  CHECK_TRANSACTION_STATUS = '/api/check-transaction-status'
}
