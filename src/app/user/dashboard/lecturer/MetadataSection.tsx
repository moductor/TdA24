"use client";

import { useState } from "react";
import { Lecturer } from "../../../../database/models/Lecturer";
import { styleClasses } from "../../../../helpers/styleClasses";
import DashboardSection from "../DashboardSection";
import TextFieldRowAutosave from "../TextFieldRowAutosave";
import InputList from "./InputList";
import styles from "./MetadataSection.module.scss";
import PortraitChanger from "./PortraitChanger";

type Props = {
  lecturer: string;
};

export default function MetadataSection({ lecturer: initialLecturer }: Props) {
  const [lecturerStr, setLecturerStr] = useState(initialLecturer);
  const lecturer = JSON.parse(lecturerStr) as Lecturer;

  async function saveTextField(field: string, value: string | undefined) {
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
    <DashboardSection title="Základní údaje">
      <div className={styleClasses(styles, "metadata")}>
        <div className={styleClasses(styles, "inputs")}>
          <InputList>
            <TextFieldRowAutosave
              name="title_before"
              label="Tituly před jménem"
              initialValue={lecturer.title_before}
              autosave={saveTextField}
            />
            <TextFieldRowAutosave
              name="first_name"
              label="Křestní jméno"
              initialValue={lecturer.first_name}
              required={true}
              autosave={saveTextField}
            />
            <TextFieldRowAutosave
              name="middle_name"
              label="Prostřední jméno"
              initialValue={lecturer.middle_name}
              autosave={saveTextField}
            />
            <TextFieldRowAutosave
              name="last_name"
              label="Příjmení"
              initialValue={lecturer.last_name}
              required={true}
              autosave={saveTextField}
            />
            <TextFieldRowAutosave
              name="title_after"
              label="Tituly za jménem"
              initialValue={lecturer.title_after}
              autosave={saveTextField}
            />
            <TextFieldRowAutosave
              name="claim"
              label="Osobní slogan"
              initialValue={lecturer.claim}
              autosave={saveTextField}
            />
          </InputList>
        </div>
        <PortraitChanger lecturer={lecturer} />
      </div>
    </DashboardSection>
  );
}
