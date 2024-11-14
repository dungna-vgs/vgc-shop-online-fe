import TabBuyVGA from '@/components/customize/tabs.buy.vga'

type TBuyVGAProps = {
  params: {
    vgacode: string
    locale: string
  }
}

export default async function BuyVGA({ params }: TBuyVGAProps) {
  return <TabBuyVGA params={params} />
}
