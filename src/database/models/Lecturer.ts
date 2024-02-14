import { Tag, TagBase } from "../models/Tag";

export type ContactInfo = {
  telephone_numbers: string[];
  emails: string[];
};

export type LecturerBase = {
  title_before?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  title_after?: string;
  picture_url?: string;
  location?: string;
  claim?: string;
  bio?: string;
  price_per_hour?: number;
  contact?: ContactInfo;
};

export type LecturerInput = LecturerBase & {
  tags?: TagBase[];
};

export type Lecturer = LecturerBase & {
  uuid: string;
  contact: ContactInfo;
  tags?: Tag[];
};

export function getNameString(lecturer: Lecturer) {
  const parts = [
    lecturer.title_before,
    lecturer.first_name,
    lecturer.middle_name,
    lecturer.last_name,
    lecturer.title_after,
  ].filter((part) => part != undefined);
  return parts.join(" ");
}
