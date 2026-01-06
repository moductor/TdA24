import { redirect } from "../../../../i18n/routing";

export const dynamic = "force-dynamic";

export default function Page() {
  redirect("/user/dashboard/events");
}
