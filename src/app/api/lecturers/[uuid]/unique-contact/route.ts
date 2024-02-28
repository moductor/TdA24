import { NextRequest, NextResponse } from "next/server";
import { findNotUnique } from "../../../../../database/functions/Lecturer";
import { ContactInfo } from "../../../../../database/models/Lecturer";
import {
  getUnauthorizedError,
  isAuthorized,
} from "../../../checkAuthenticated";

type Params = {
  uuid: string;
};

type Props = {
  params: Params;
};

export async function POST(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse> {
  if (!isAuthorized(request, undefined, params.uuid)) {
    return getUnauthorizedError();
  }

  const data = (await request.json()) as ContactInfo;
  const result = await findNotUnique(params.uuid, data);

  if (result) {
    return NextResponse.json(result, { status: 409 });
  }

  return new NextResponse();
}
