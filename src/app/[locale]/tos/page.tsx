"use server";
/* eslint-disable react/no-unescaped-entities */
import { getTranslations } from "next-intl/server";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

export default async function Page() {
  const t = await getTranslations("tos");

  return (
    <div className="content-grid">
      <div className="content-flow">
        <header>
          <Navbar showBackButton={true} />
        </header>

        <main className={styleClasses(styles, "main")}>
          {
            <p>
              <h1 className="title-1">{t("title")}</h1>
              {t.rich("content", {
                h3: (chunks) => <h3 className="title-2">{chunks}</h3>,
                br: () => <br />,
              })}
            </p>
          }
        </main>
      </div>

      <Footer />
    </div>
  );
}
