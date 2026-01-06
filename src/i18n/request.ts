import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale, locale }) => {
  const currentLocale = locale ?? (await requestLocale);
  // Validate that the incoming `locale` parameter is valid
  if (!currentLocale) notFound();
  if (!routing.locales.includes(currentLocale as any)) notFound();

  return {
    locale: currentLocale,
    messages: (await import(`../../messages/${currentLocale}.json`)).default,
  };
});
