/* eslint-disable react/no-unescaped-entities */
import { getTranslations } from "next-intl/server";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./page.module.scss";

export default async function Page() {
  const t = await getTranslations("gdpr");
  return (
    <div className="content-grid">
      <div className="content-flow">
        <header>
          <Navbar showBackButton={true} />
        </header>

        <main className={styleClasses(styles, "main")}>
          {
            <>
              <h1 className="title-1">{t("title")}</h1>
              <p>{t("lastUpdate")}</p>
              <p>
                {t.rich("content", {
                  h3: (chunks) => <h3 className="title-2">{chunks}</h3>,
                  a: (chunks) => (
                    <a href="https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_cs">
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </>
          }
        </main>
      </div>

      <Footer />
    </div>
  );
}
