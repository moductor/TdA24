import { NextRequest, NextResponse } from "next/server";
import { findNotUnique } from "../../../../../database/functions/Lecturer";
import { ContactInfo } from "../../../../../database/models/Lecturer";
import {
  getUnauthorizedError,
  isAuthorized,
} from "../../../checkAuthenticated";

export const dynamic = "force-dynamic";

type Params = {
  uuid: string;
};

type Props = {
  params: Promise<Params>;
};

export async function POST(
  request: NextRequest,
  props: Props,
): Promise<NextResponse> {
  const params = await props.params;
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
