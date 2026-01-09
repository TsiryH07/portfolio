import "@/styles/globals.css";

import {NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";

import {Footer} from "@/app/_components/footer";
import {IntroOverlay} from "@/app/_components/intro-overlay";
import {Navbar} from "@/app/_components/navbar";
import {ScrollBlurOverlay} from "@/app/_components/scroll-blur-overlay";
import {ScrollRevealProvider} from "@/app/_components/scroll-reveal-provider";
import {fontMono, fontSans} from "@/app/_layouts/fonts";
import {ThemeProvider} from "@/app/_layouts/theme-provider";

type LocaleLayoutProps = {
  children: React.ReactNode;
  locale: string;
};

export async function LocaleLayout({children, locale}: LocaleLayoutProps) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${fontSans.variable} ${fontMono.variable} min-h-dvh`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <IntroOverlay />
            <ScrollRevealProvider />
            <ScrollBlurOverlay />
            <header className="sticky top-0 z-50 glass-nav shadow-sm">
              <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
                <Navbar />
              </div>
            </header>
            <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
