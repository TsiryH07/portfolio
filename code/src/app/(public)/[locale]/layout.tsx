import {LocaleLayout} from "@/app/_layouts/locale-layout";
import {getSiteMetadata} from "@/app/_layouts/metadata";
import {routing} from "@/lib/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata() {
  return getSiteMetadata();
}

export default async function PublicLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  return <LocaleLayout locale={locale}>{children}</LocaleLayout>;
}

