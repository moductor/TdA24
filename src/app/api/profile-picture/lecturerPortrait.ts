import { NextResponse } from "next/server";
import { get } from "../../../database/functions/Lecturer";
import { Lecturer } from "../../../database/models/Lecturer";

export async function getLecturerPortrait(lecturer: Lecturer) {
  if (lecturer.picture_url) {
    const res = await fetch(lecturer.picture_url, { cache: "force-cache" });
    return new NextResponse(res.body);
  }
}

export async function getLecturerPortraitFromId(uuid?: string) {
  if (!uuid) return;
  const lecturer = await get(uuid);
  if (lecturer) return await getLecturerPortrait(lecturer);
}
