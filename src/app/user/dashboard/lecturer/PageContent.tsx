"use client";

import { useState } from "react";
import FixedBanner from "../../../../components/widgets/FixedBanner";
import ResultIndicator from "../../../../components/widgets/ResultIndicator";
import Button from "../../../../components/widgets/forms/Button";
import TextFieldList from "../../../../components/widgets/forms/TextFieldList";
import TextFieldRow from "../../../../components/widgets/forms/TextFieldRow";
import WysiwygEditor from "../../../../components/widgets/forms/WysiwygEditor";
import { Lecturer } from "../../../../database/models/Lecturer";
import { styleClasses } from "../../../../helpers/styleClasses";
import DashboardSection from "../DashboardSection";
import InputList from "../InputList";
import PageHeader from "../PageHeader";
import styles from "./PageContent.module.scss";
import PortraitChanger from "./PortraitChanger";

type Props = {
  lecturer: string;
};

let clearResultTimeout: any;

export default function PageContent({ lecturer: lecturerStr }: Props) {
  const initialLecturer = JSON.parse(lecturerStr) as Lecturer;
  const [lecturer, setLecturer] = useState(initialLecturer);

  const [result, setResult] = useState<boolean | null | undefined>(undefined);
  const sending = result === null;

  async function save() {
    if (sending) return;
    clearTimeout(clearResultTimeout);
    setResult(null);

    const data = { ...lecturer, _id: undefined, uuid: undefined };

    Object.keys(data)
      .filter((key) => (data as any)[key] === undefined)
      .forEach((key) => ((data as any)[key] = null));

    const res = await fetch(`/api/lecturers/${lecturer.uuid}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    setResult(res.status == 200);
    clearResultTimeout = setTimeout(() => setResult(undefined), 2000);
  }

  return (
    <>
      <PageHeader title="Profil lektora">
        <FixedBanner>
          <div className={styleClasses(styles, "save-section")}>
            <Button onClick={save}>Uložit změny</Button>
            <ResultIndicator result={result} />
          </div>
        </FixedBanner>
      </PageHeader>

      <DashboardSection title="Základní údaje">
        <div className={styleClasses(styles, "metadata")}>
          <div className={styleClasses(styles, "inputs")}>
            <InputList>
              <TextFieldRow
                type="text"
                disabled={sending}
                value={lecturer.title_before}
                onChange={(e) =>
                  setLecturer((lecturer) => ({
                    ...lecturer,
                    title_before: e.target.value || undefined,
                  }))
                }
              >
                Tituly před jménem
              </TextFieldRow>

              <TextFieldRow
                type="text"
                disabled={sending}
                value={lecturer.first_name}
                required={true}
                onChange={(e) =>
                  setLecturer((lecturer) => ({
                    ...lecturer,
                    first_name: e.target.value,
                  }))
                }
              >
                Křestní jméno
              </TextFieldRow>

              <TextFieldRow
                type="text"
                disabled={sending}
                value={lecturer.middle_name}
                onChange={(e) =>
                  setLecturer((lecturer) => ({
                    ...lecturer,
                    middle_name: e.target.value || undefined,
                  }))
                }
              >
                Prostřední jméno
              </TextFieldRow>

              <TextFieldRow
                type="text"
                disabled={sending}
                value={lecturer.last_name}
                required={true}
                onChange={(e) =>
                  setLecturer((lecturer) => ({
                    ...lecturer,
                    last_name: e.target.value,
                  }))
                }
              >
                Příjmení
              </TextFieldRow>

              <TextFieldRow
                type="text"
                disabled={sending}
                value={lecturer.title_after}
                onChange={(e) =>
                  setLecturer((lecturer) => ({
                    ...lecturer,
                    title_after: e.target.value || undefined,
                  }))
                }
              >
                Tituly za jménem
              </TextFieldRow>

              <TextFieldRow
                type="text"
                disabled={sending}
                value={lecturer.claim}
                onChange={(e) =>
                  setLecturer((lecturer) => ({
                    ...lecturer,
                    claim: e.target.value || undefined,
                  }))
                }
              >
                Osobní slogan
              </TextFieldRow>
            </InputList>
          </div>
          <PortraitChanger lecturer={lecturer} />
        </div>
      </DashboardSection>

      <DashboardSection title="Obchodní údaje">
        <InputList>
          <TextFieldRow
            type="text"
            disabled={sending}
            value={lecturer.location}
            onChange={(e) =>
              setLecturer((lecturer) => ({
                ...lecturer,
                location: e.target.value || undefined,
              }))
            }
          >
            Město působění
          </TextFieldRow>

          <TextFieldRow
            type="number"
            disabled={sending}
            value={lecturer.price_per_hour?.toString()}
            onChange={(e) => {
              const value = e.target.value
                ? parseInt(e.target.value)
                : undefined;
              if (Number.isNaN(value)) return;

              setLecturer((lecturer) => ({
                ...lecturer,
                price_per_hour: value,
              }));
            }}
          >
            Cena za hodinu
          </TextFieldRow>
        </InputList>
      </DashboardSection>

      <DashboardSection title="O mně">
        <WysiwygEditor
          value={lecturer.bio}
          onChange={(e) => {
            setLecturer((lecturer) => ({
              ...lecturer,
              bio: e.target.value || undefined,
            }));
          }}
        />
      </DashboardSection>

      <DashboardSection title="Kontaktní údaje">
        <InputList>
          <TextFieldList
            type="text"
            label="Telefonní čísla"
            value={lecturer.contact.telephone_numbers}
            onChange={(value) => {
              setLecturer((lecturer) => ({
                ...lecturer,
                contact: {
                  ...lecturer.contact,
                  telephone_numbers: value,
                },
              }));
            }}
          />

          <TextFieldList
            type="text"
            label="Emailové adresy"
            value={lecturer.contact.emails}
            onChange={(value) => {
              setLecturer((lecturer) => ({
                ...lecturer,
                contact: {
                  ...lecturer.contact,
                  emails: value,
                },
              }));
            }}
          />
        </InputList>
      </DashboardSection>
    </>
  );
}
