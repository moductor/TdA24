import Calendar from "../../../../components/widgets/Calendar";
import DashboardSection from "../DashboardSection";
import PageHeader from "../PageHeader";

import { get } from "../../../../database/functions/Lecturer";
import { getCurrentUserWithSession } from "../../../../helpers/userContext";

export default async function Page() {
  let isLecturer = false;

  const user = getCurrentUserWithSession();
  if (user?.lecturerId) {
    const lecturer = await get(user.lecturerId);
    if (lecturer) {
      //const lecturerStr = JSON.stringify(lecturer);
      isLecturer = true;
    }
  }

  const events = [
    { title: "event 1", date: "2024-02-01" },
    { title: "event 2", date: "2024-02-22" },
  ];

  return (
    <>
      <PageHeader title="Rezervované schůzky" />

      <DashboardSection title="Kalendář schůzek">
        <Calendar isLecturer={isLecturer} events={events} />
      </DashboardSection>
    </>
  );
}
