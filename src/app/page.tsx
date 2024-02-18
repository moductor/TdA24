import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeView from "../components/partials/home/HomeView";
import { getAll } from "../database/functions/Lecturer";
import createPlaceholderData from "../database/placeholderData";

export default async function Page() {
  await createPlaceholderData();

  const lecturers = await getAll();

  return (
    <>
      <Header />

      <main className="content-grid" style={{ marginBlock: "4rem" }}>
        <HomeView
          lecturersData={JSON.stringify(lecturers)}
          className="breakout"
        />
      </main>

      <Footer />
    </>
  );
}
