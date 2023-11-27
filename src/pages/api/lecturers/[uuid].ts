import type { APIRoute } from "astro";
import type { Error } from "../../../models/Error";
import {
  get,
  remove,
  updateOneById,
  type LecturerBase,
} from "../../../models/Lecturer";

export const GET: APIRoute = async ({ params, request }) => {
  const uuid = params["uuid"] as string;
  const lecturer = await get(uuid);

  if (!lecturer) {
    const error: Error = {
      code: 404,
      message: "User not found",
    };

    return new Response(JSON.stringify(error), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(lecturer), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const uuid = params["uuid"] as string;
  const lecturer = await get(uuid);

  if (!lecturer) {
    const error: Error = {
      code: 404,
      message: "User not found",
    };

    return new Response(JSON.stringify(error), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  await remove(uuid);

  return new Response(null, { status: 200 });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const uuid = params["uuid"] as string;
  const lecturer = await get(uuid);

  if (!lecturer) {
    const error: Error = {
      code: 404,
      message: "User not found",
    };

    return new Response(JSON.stringify(error), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const data = (await request.json()) as LecturerBase;
    const lecturer = await updateOneById(uuid, data);

    return new Response(JSON.stringify(lecturer), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e);

    const error: Error = {
      code: 400,
      message: "An error occured while parsing the input data",
    };

    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
