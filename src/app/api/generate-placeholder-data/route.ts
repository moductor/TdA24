import { NextResponse } from "next/server";
import createPlaceholderData from "../../../database/placeholderData";

export async function GET(): Promise<NextResponse> {
  await createPlaceholderData(true);
  return new NextResponse("generated", { status: 200 });
}
