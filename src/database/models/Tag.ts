import { WithUuid } from "./DB";

export type TagBase = {
  name: string;
};

export type Tag = WithUuid<TagBase>;
