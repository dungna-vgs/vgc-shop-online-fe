import { apiGetPromotionalValue } from '@/apis/business/get.promotional.value'
import TabBuyPackage from '@/components/customize/tabs.buy.package'

type TBuyPackageProps = {
  params: {
    packageId: string
    locale: string
  }
}

export default async function BuyPackage({ params }: TBuyPackageProps) {
  const promotion = await apiGetPromotionalValue({
    type: 'membership',
    item_id: params.packageId
  })

  let better = promotion?.data?.discount_value
  if (better < promotion?.data?.promotional_value) {
    better = promotion?.data?.promotional_value
  }
  return <TabBuyPackage params={params} promotion={better || 0} />
}
