import { redirect } from "next/navigation";
import { getUserContext } from "../../../helpers/userContext";

export default function Page() {
  const user = getUserContext();

  if (user?.lecturerId) {
    redirect("/user/dashboard/events");
  }

  redirect("/user/dashboard/account");
}
