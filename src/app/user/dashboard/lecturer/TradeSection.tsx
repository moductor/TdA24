"use client";

import { useState } from "react";
import { Lecturer } from "../../../../database/models/Lecturer";
import DashboardSection from "../DashboardSection";
import TextFieldRowAutosave from "../TextFieldRowAutosave";
import InputList from "./InputList";

type Props = {
  lecturer: string;
};

export default function TradeSection({ lecturer: initialLecturer }: Props) {
  const [lecturerStr, setLecturerStr] = useState(initialLecturer);
  const lecturer = JSON.parse(lecturerStr) as Lecturer;

  async function saveTextField(
    field: string,
    value: string | number | undefined,
  ) {
    const body: { [prop: string]: any } = {};
    body[field] = value || null;

    const res = await fetch(`/api/lecturers/${lecturer.uuid}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    if (res.status != 200) return false;

    const data = await res.text();
    setLecturerStr(data);

    return true;
  }

  return (
    <DashboardSection title="Obchodní údaje">
      <InputList>
        <TextFieldRowAutosave
          name="location"
          label="Město působění"
          initialValue={lecturer.location}
          autosave={saveTextField}
        />
        <TextFieldRowAutosave
          type="number"
          name="price_per_hour"
          label="Cena za hodinu"
          initialValue={lecturer.price_per_hour?.toString()}
          autosave={(name, value) =>
            saveTextField(name, value && parseInt(value))
          }
        />
      </InputList>
    </DashboardSection>
  );
}
