import { Lecturer, LecturerFilters } from "../../../database/models/Lecturer";
import { Pagination } from "../../../database/models/Pagination";
import { getEndpoint } from "../../../helpers/endpointUrl";

export const loadCount = 10;

export async function fetchLecturers(
  pagination: Pagination = { skip: 0, limit: loadCount },
  filters: LecturerFilters,
): Promise<Lecturer[]> {
  const res = await fetch(
    getEndpoint("/api/lecturers", {
      params: {
        pagination: JSON.stringify(pagination),
        filters: JSON.stringify(filters),
      },
    }),
  );
  const data = (await res.json()) as Lecturer[];

  return data;
}
