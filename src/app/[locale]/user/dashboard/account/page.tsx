import { getCurrentUserWithSession } from "../../../../../helpers/userContext";
import { redirect } from "../../../../../i18n/routing";
import PageContent from "./PageContent";

export const dynamic = "force-dynamic";

export default function Page() {
  const user = getCurrentUserWithSession();

  if (user == undefined) return redirect("/user/auth/login/");

  return <PageContent user={user} getUser={getCurrentUserWithSession()} />;
}
