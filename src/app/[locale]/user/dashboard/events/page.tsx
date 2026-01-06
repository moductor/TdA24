import { get } from "../../../../../database/functions/Lecturer";
import { getCurrentUserWithSession } from "../../../../../helpers/userContext";
import PageContent from "./PageContent";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = getCurrentUserWithSession()!;

  const lecturer = user?.lecturerId ? await get(user.lecturerId) : undefined;

  return <PageContent userId={user.uuid} lecturerId={lecturer?.uuid} />;
}
