"use client";

import { useLocale } from "next-intl";
import { styleClasses } from "../helpers/styleClasses";
import { usePathname, useRouter } from "../i18n/routing";
import styles from "./LanguageChanger.module.scss";

export default function LanguageChanger() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (e: { target: { value: any } }) => {
    router.push(pathname, { locale: e.target.value });
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      className={styleClasses(styles, "select")}
    >
      <option value="en">English</option>
      <option value="cs">Čeština</option>
    </select>
  );
}
