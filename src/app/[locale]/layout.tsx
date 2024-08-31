import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Lalezar, Open_Sans } from "next/font/google";
import { CSSProperties } from "react";
import "../globals.scss";

export const lalezar = Lalezar({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
});

export const openSans = Open_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const fontStyles = {
  "--font-accent": lalezar.style.fontFamily,
  "--font-body": openSans.style.fontFamily,
} as CSSProperties;

export const metadata: Metadata = {
  title: {
    template: "TdA | %s",
    default: "Teacher digital Agency",
  },
};

type Props = Readonly<{
  children: React.ReactNode;
  locale: string;
}>;

export default async function Layout({ children, locale }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body style={fontStyles}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
