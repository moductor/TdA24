import { redirect } from "next/navigation";
import { get } from "../../../../database/functions/Lecturer";
import { getCurrentUserWithSession } from "../../../../helpers/userContext";
import MetadataSection from "./MetadataSection";
import TradeSection from "./TradeSection";

export default async function Page() {
  const user = getCurrentUserWithSession();
  if (!user?.lecturerId) redirect("/user/dashboard");
  const lecturer = await get(user.lecturerId);
  if (!lecturer) redirect("/user/dashboard");

  return (
    <>
      <MetadataSection lecturer={JSON.stringify(lecturer)} />
      <TradeSection lecturer={JSON.stringify(lecturer)} />
    </>
  );
}
