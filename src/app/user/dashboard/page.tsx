import { redirect } from "next/navigation";
import { getCurrentUserWithSession } from "../../../helpers/userContext";

export default function Page() {
  const user = getCurrentUserWithSession();

  if (user?.lecturerId) {
    redirect("/user/dashboard/events");
  }

  redirect("/user/dashboard/account");
}
