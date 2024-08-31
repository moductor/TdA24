import { getTranslations } from "next-intl/server";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HomeView from "../../components/partials/home/HomeView";
import { loadCount } from "../../components/partials/home/lecturerFetcher";
import { getAll, getFilters } from "../../database/functions/Lecturer";
import { styleClasses } from "../../helpers/styleClasses";
import styles from "./page.module.scss";

export default async function Page() {
  const lecturers = await getAll({ skip: 0, limit: loadCount });
  const filters = await getFilters();

  const t = await getTranslations("HomePage");

  return (
    <>
      <Header breakout={true}>
        <div className={styleClasses(styles, "hero", "breakout")}>
          <h1 className={styleClasses(styles, "subtitle")}>{t("subtitle")}</h1>
          <p className={styleClasses(styles, "title")}>
            {t.rich("title", {
              span: (chunks) => <span>{chunks}</span>,
            })}
          </p>
        </div>
      </Header>

      <main className="content-grid" style={{ marginBlock: "4rem" }}>
        <HomeView
          lecturersData={JSON.stringify(lecturers)}
          lecturerFilters={JSON.stringify(filters)}
          className="breakout"
        />
      </main>

      <Footer />
    </>
  );
}
