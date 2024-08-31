import { get } from "../../../../../database/functions/Lecturer";
import { getCurrentUserWithSession } from "../../../../../helpers/userContext";
import { redirect } from "../../../../../i18n/routing";
import PageContent from "./PageContent";

export default async function Page() {
  const user = getCurrentUserWithSession();
  if (!user?.lecturerId) return redirect("/user/dashboard");

  const lecturer = await get(user.lecturerId);
  if (!lecturer) return redirect("/user/dashboard");

  const lecturerStr = JSON.stringify(lecturer);

  return <PageContent lecturer={lecturerStr} />;
}
