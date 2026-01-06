import { get } from "../../../../../database/functions/Lecturer";
import { getCurrentUserWithSession } from "../../../../../helpers/userContext";
import { redirect } from "../../../../../i18n/routing";
import PageContent from "./PageContent";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const user = await getCurrentUserWithSession();
  if (!user?.lecturerId) return redirect({ href: "/user/dashboard", locale });

  const lecturer = await get(user.lecturerId);
  if (!lecturer) return redirect({ href: "/user/dashboard", locale });

  const lecturerStr = JSON.stringify(lecturer);

  return <PageContent lecturer={lecturerStr} />;
}
