import { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import LecturerBio from "../../../components/partials/lecturer/LecturerBio";
import LecturerContact from "../../../components/partials/lecturer/LecturerContact";
import LecturerMetadata from "../../../components/partials/lecturer/LecturerMetadata";
import LecturerPortrait from "../../../components/partials/lecturer/LecturerPortrait";
import LecturerTags from "../../../components/partials/lecturer/LecturerTags";
import BackgroundWrapper from "../../../components/widgets/BackgroundWrapper";
import { get } from "../../../database/functions/Lecturer";
import { getNameString } from "../../../database/models/Lecturer";
import { styleClasses } from "../../../helpers/styleClasses";
import styles from "./page.module.scss";

type Params = {
  uuid: string;
};

type Props = {
  params: Params;
};

export default async function Page({ params }: Props) {
  const lecturer = await getLecturerForUUID(params.uuid);

  const isTagsEmpty: boolean =
    lecturer.tags == undefined || !(lecturer.tags.length > 0);
  const isBioEmpty: boolean =
    lecturer.bio == undefined || !(lecturer.bio!.length > 0);
  const isTelNumbersEmpty: boolean = !(
    lecturer.contact.telephone_numbers.length > 0
  );
  const isEmailsEmpty: boolean = !(lecturer.contact.emails.length > 0);

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
              />
            )}
          </main>
        </div>

        <Footer />
      </div>
    </BackgroundWrapper>
  );
}

export async function generateMetadata({ params }: Props) {
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
