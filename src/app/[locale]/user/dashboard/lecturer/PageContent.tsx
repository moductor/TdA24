"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import FixedBanner from "../../../../../components/widgets/FixedBanner";
import ResultIndicator from "../../../../../components/widgets/ResultIndicator";
import Button from "../../../../../components/widgets/forms/Button";
import TagsEditor from "../../../../../components/widgets/forms/TagsEditor";
import TextFieldList from "../../../../../components/widgets/forms/TextFieldList";
import TextFieldRow from "../../../../../components/widgets/forms/TextFieldRow";
import WysiwygEditor from "../../../../../components/widgets/forms/WysiwygEditor";
import { Lecturer } from "../../../../../database/models/Lecturer";
import { Tag } from "../../../../../database/models/Tag";
import { styleClasses } from "../../../../../helpers/styleClasses";
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

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    setHasChanged(true);
  }, [lecturer]);

  useEffect(() => {
    if (!hasChanged) return;

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = "");
    }

    window.addEventListener("beforeunload", handleBeforeUnload, {
      capture: true,
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload, {
        capture: true,
      });
    };
  }, [hasChanged]);

  async function save() {
    if (sending) return;
    clearTimeout(clearResultTimeout);
    setResult(null);

    const data = { ...lecturer };

    Object.keys(data)
      .filter((key) => (data as any)[key] === undefined)
      .forEach((key) => ((data as any)[key] = null));

    const res = await fetch(`/api/lecturers/${lecturer.uuid}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    setResult(res.status == 200);
    clearResultTimeout = setTimeout(() => setResult(undefined), 2000);
    setHasChanged(false);
  }

  const t = useTranslations("Dashboard.lecturerProfile");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <PageHeader title={t("pageTitle")}>
        <FixedBanner>
          <div className={styleClasses(styles, "save-section")}>
            <Button>{t("saveChanges")}</Button>
            <ResultIndicator result={result} />
          </div>
        </FixedBanner>
      </PageHeader>

      <DashboardSection title={t("basicInfo")}>
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
                {t("titleBefore")}
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
                {t("firstName")}
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
                {t("middleName")}
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
                {t("lastName")}
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
                {t("titleAfter")}
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
                {t("claim")}
              </TextFieldRow>
            </InputList>
          </div>
          <PortraitChanger lecturer={lecturer} />
        </div>
      </DashboardSection>

      <DashboardSection title={t("businessInfo")}>
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
            {t("location")}
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
            {t("pricePerHour")}
          </TextFieldRow>
        </InputList>
      </DashboardSection>

      <DashboardSection title={t("aboutMe")}>
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

      <DashboardSection title={t("tags")}>
        <TagsEditor
          type="text"
          disabled={sending}
          tags={lecturer.tags?.map((tag) => tag.name)}
          onChange={(tags: string[]) => {
            setLecturer((lecturer) => ({
              ...lecturer,
              tags: tags.map((tag) => ({ name: tag }) as Tag),
            }));
          }}
        ></TagsEditor>
      </DashboardSection>

      <DashboardSection title={t("contactInfo")}>
        <InputList>
          <TextFieldList
            type="tel"
            label={t("telephoneNumbers")}
            value={lecturer.contact.telephone_numbers}
            pattern="(\+420|00420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}"
            errorText={t("phoneNumberExists")}
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
            type="email"
            label={t("emails")}
            value={lecturer.contact.emails}
            errorText={t("emailExists")}
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
    </form>
  );
}
