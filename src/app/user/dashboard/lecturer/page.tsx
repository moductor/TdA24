import { redirect } from "next/navigation";
import { get } from "../../../../database/functions/Lecturer";
import { getCurrentUserWithSession } from "../../../../helpers/userContext";
import PageContent from "./PageContent";

export default async function Page() {
  const user = getCurrentUserWithSession();
  if (!user?.lecturerId) redirect("/user/dashboard");
  const lecturer = await get(user.lecturerId);
  if (!lecturer) redirect("/user/dashboard");

  const lecturerStr = JSON.stringify(lecturer);

  return <PageContent lecturer={lecturerStr} />;
}
