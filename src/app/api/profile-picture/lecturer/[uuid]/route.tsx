import { NextRequest, NextResponse } from "next/server";
import { get } from "../../../../../database/functions/Lecturer";
import { getProfileImageResponse } from "../../imageGenerator";
import { getLecturerPortrait } from "../../lecturerPortrait";

type Params = {
  uuid: string;
};

type Props = {
  params: Params;
};

export async function GET(_: NextRequest, { params }: Props) {
  const lecturer = await get(params.uuid);
  if (!lecturer) return new NextResponse(null, { status: 404 });

  const res = await getLecturerPortrait(lecturer);
  if (res) return res;

  const name = `${lecturer.first_name} ${lecturer.last_name}`;
  return getProfileImageResponse(name);
}
