import TabBuyPackage from '@/components/customize/tabs.buy.package'

type TBuyPackageProps = {
  params: {
    packageId: string
    locale: string
  }
}

export default async function BuyPackage({ params }: TBuyPackageProps) {
  return <TabBuyPackage params={params} />
}
