import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Footer from "../../../../components/Footer";
import Navbar from "../../../../components/Navbar";
import EventReservationButton from "../../../../components/partials/lecturer/EventReservationButton";
import LecturerBio from "../../../../components/partials/lecturer/LecturerBio";
import LecturerContact from "../../../../components/partials/lecturer/LecturerContact";
import LecturerMetadata from "../../../../components/partials/lecturer/LecturerMetadata";
import LecturerPortrait from "../../../../components/partials/lecturer/LecturerPortrait";
import LecturerTags from "../../../../components/partials/lecturer/LecturerTags";
import BackgroundWrapper from "../../../../components/widgets/BackgroundWrapper";
import { get } from "../../../../database/functions/Lecturer";
import { getNameString } from "../../../../database/models/Lecturer";
import { styleClasses } from "../../../../helpers/styleClasses";
import { getCurrentUserWithSession } from "../../../../helpers/userContext";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

type Params = {
  uuid: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const lecturer = await getLecturerForUUID(params.uuid);
  const user = await getCurrentUserWithSession();

  const isTagsEmpty: boolean =
    lecturer.tags == undefined || !(lecturer.tags.length > 0);
  const isBioEmpty: boolean =
    lecturer.bio == undefined || !(lecturer.bio!.length > 0);
  const isTelNumbersEmpty: boolean = !(
    lecturer.contact.telephone_numbers.length > 0
  );
  const isEmailsEmpty: boolean = !(lecturer.contact.emails.length > 0);

  const t = await getTranslations("Lecturer");

  return (
    <BackgroundWrapper>
      <div className={styleClasses(styles, "wrapper", "content-grid")}>
        <div className={styleClasses(styles, "bento")}>
          <header className={styleClasses(styles, "bento-subsection")}>
            <Navbar
              showBackButton={true}
              className={styleClasses(styles, "navbar")}
            />

            <div className={styleClasses(styles, "hero", "bento-subsection")}>
              <LecturerPortrait
                lecturer={lecturer}
                className={styleClasses(styles, "portrait")}
              />

              <LecturerMetadata
                onLecturerPage={true}
                name={getNameString(lecturer)}
                claim={lecturer.claim}
                location={lecturer.location}
                price={lecturer.price_per_hour}
                className={styleClasses(styles, "metadata")}
                suffix={
                  user?.lecturerId ? undefined : (
                    <EventReservationButton
                      lecturerId={lecturer.uuid}
                      buttonText={t("reservation")}
                    />
                  )
                }
              />
            </div>
          </header>

          <main className={styleClasses(styles, "bento-subsection")}>
            {!isTagsEmpty && (
              <LecturerTags
                tags={lecturer.tags ? lecturer.tags : []}
                className={styleClasses(
                  styles,
                  "tags",
                  isBioEmpty && (!isTelNumbersEmpty || !isEmailsEmpty)
                    ? "tags-no-bio-yes-contact"
                    : "",
                )}
              />
            )}
            {!isBioEmpty && (
              <LecturerBio
                content={lecturer.bio ? lecturer.bio : ""}
                className={styleClasses(
                  styles,
                  "bio",
                  isTelNumbersEmpty && isEmailsEmpty ? "bio-no-contact" : "",
                )}
                aboutMeText={t("aboutMe")}
              />
            )}
            {(!isTelNumbersEmpty || !isEmailsEmpty) && (
              <LecturerContact
                contact={lecturer.contact}
                isTelNumbersEmpty={isTelNumbersEmpty}
                isEmailsEmpty={isEmailsEmpty}
                className={styleClasses(
                  styles,
                  "contact",
                  isBioEmpty && isTagsEmpty
                    ? "contact-no-bio-no-tags"
                    : isBioEmpty
                      ? "contact-no-bio"
                      : "",
                )}
                contactText={t("contact")}
              />
            )}
          </main>
        </div>

        <Footer />
      </div>
    </BackgroundWrapper>
  );
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const lecturer = await getLecturerForUUID(params.uuid);

  return {
    title: getNameString(lecturer),
  } as Metadata;
}

async function getLecturerForUUID(uuid: string) {
  const lecturer = await get(uuid);
  if (!lecturer) notFound();
  return lecturer;
}
