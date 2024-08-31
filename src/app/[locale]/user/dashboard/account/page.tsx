import { redirect } from "next/navigation";
import { getCurrentUserWithSession } from "../../../../../helpers/userContext";
import PageContent from "./PageContent";

export default function Page() {
  const user = getCurrentUserWithSession();

  if (user == undefined) redirect("/user/auth/login/");

  return <PageContent user={user} getUser={getCurrentUserWithSession()} />;
}
