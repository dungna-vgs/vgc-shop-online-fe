import { apiGetPromotionalValue } from '@/apis/business/get.promotional.value'
import TabBuyVGA from '@/components/customize/tabs.buy.vga'

type TBuyVGAProps = {
  params: {
    vgacode: string
    locale: string
  }
}

export default async function BuyVGA({ params }: TBuyVGAProps) {
  const { vgacode } = params
  const promotion = await apiGetPromotionalValue({
    type: 'vga',
    item_id: vgacode
  })

  let better = promotion?.data?.discount_value
  if (better < promotion?.data?.promotional_value) {
    better = promotion?.data?.promotional_value
  }
  return <TabBuyVGA params={params} promotion={better || 0} />
}
