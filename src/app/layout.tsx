import classNames from "classnames";
import type { Metadata } from "next";
import { Lalezar, Open_Sans } from "next/font/google";
import "./globals.scss";

export const lalezar = Lalezar({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-accent",
});

export const openSans = Open_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    template: "TdA | %s",
    default: "Teacher digital Agency",
  },
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: Props) {
  return (
    <html lang="cs">
      <body className={classNames(lalezar.variable, openSans.variable)}>
        {children}
      </body>
    </html>
  );
}
