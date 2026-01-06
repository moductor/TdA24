import { redirect } from "../../../../i18n/routing";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  redirect({ href: "/user/dashboard/events", locale });
}
