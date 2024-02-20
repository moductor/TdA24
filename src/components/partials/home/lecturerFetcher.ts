import { Lecturer, LecturerFilters } from "../../../database/models/Lecturer";
import { Pagination } from "../../../database/models/Pagination";

export const loadCount = 10;

export async function fetchLecturers(
  pagination: Pagination = { skip: 0, limit: loadCount },
  filters: LecturerFilters,
): Promise<Lecturer[]> {
  const url = new URL(window.location.href);
  url.pathname = "/api/lecturers";
  url.searchParams.set("pagination", JSON.stringify(pagination));
  url.searchParams.set("filters", JSON.stringify(filters));

  const res = await fetch(url);
  const data = (await res.json()) as Lecturer[];

  return data;
}
