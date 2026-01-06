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

  if (user == undefined) return redirect({ href: "/user/auth/login/", locale });

  return (
    <PageContent user={user} getUser={await getCurrentUserWithSession()} />
  );
}
