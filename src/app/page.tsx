import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeView from "../components/partials/home/HomeView";
import { getAll } from "../database/functions/Lecturer";

export default async function Page() {
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
