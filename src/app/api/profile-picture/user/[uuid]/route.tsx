import { NextRequest, NextResponse } from "next/server";
import { get } from "../../../../../database/functions/User";
import { getProfileImageResponse } from "../../imageGenerator";
import { getLecturerPortraitFromId } from "../../lecturerPortrait";

export const dynamic = "force-dynamic";

type Params = {
  uuid: string;
};

type Props = {
  params: Params;
};

export async function GET(_: NextRequest, { params }: Props) {
  const user = await get(params.uuid);
  if (!user) return new NextResponse(null, { status: 404 });

  const res = await getLecturerPortraitFromId(user.lecturerId);
  if (res) return res;

  return getProfileImageResponse(user.name || user.username);
}
