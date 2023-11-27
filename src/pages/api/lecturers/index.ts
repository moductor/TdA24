import type { APIRoute } from "astro";
import type { Error } from "../../models/Error";
import {
  get,
  getAll,
  insertOne,
  isInputValid,
  type LecturerBase,
} from "../../models/Lecturer";

export const GET: APIRoute = async ({ params, request }) => {
  const lecturers = await getAll();

  return new Response(JSON.stringify(lecturers), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const data = (await request.json()) as LecturerBase;

    if (!isInputValid(data)) {
      const error: Error = {
        code: 400,
        message: "This is not a valid input",
      };

      return new Response(JSON.stringify(error), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const id = await insertOne(data);
    const lecturer = await get(id);

    return new Response(JSON.stringify(lecturer), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
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
