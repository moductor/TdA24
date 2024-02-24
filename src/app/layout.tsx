import type { Metadata } from "next";
import { Lalezar, Open_Sans } from "next/font/google";
import { CSSProperties } from "react";
import {
  getCurrentUserWithSession,
  setUserContext,
} from "../helpers/userContext";
import "./globals.scss";

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
}>;

export default function Layout({ children }: Props) {
  setUserContext(getCurrentUserWithSession());

  return (
    <html lang="cs">
      <body style={fontStyles}>{children}</body>
    </html>
  );
}
