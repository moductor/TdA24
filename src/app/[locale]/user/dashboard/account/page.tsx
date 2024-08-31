import { getCurrentUserWithSession } from "../../../../../helpers/userContext";
import { redirect } from "../../../../../i18n/routing";
import PageContent from "./PageContent";

export default function Page() {
  const user = getCurrentUserWithSession();

  if (user == undefined) redirect("/user/auth/login/");

  return <PageContent user={user!} getUser={getCurrentUserWithSession()} />;
}
