import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/customize/languages/TranslationsProvider";
import TabBuyPackage from "@/components/customize/tabs.buy.package";

type TBuyPackageProps = {
  params: {
    packageId: string,
    locale: string,
  }
}
const i18nNamespaces = ['home', 'common', 'footer', 'form']

export default async function BuyPackage({ params }: TBuyPackageProps) {

  console.log("{ params: params}: ");
  console.log({ params: params});
  const { resources } = await initTranslations(params.locale, i18nNamespaces)

  return (
    <TranslationsProvider
      resources={resources}
      locale={params.locale}
      namespaces={i18nNamespaces}
    >
      <TabBuyPackage params={params} />
    </TranslationsProvider>

  );
}