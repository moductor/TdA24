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
                useH1={true}
                name={getNameString(lecturer)}
                claim={lecturer.claim}
                location={lecturer.location}
                price={lecturer.price_per_hour}
                className={styleClasses(styles, "metadata")}
              />
            </div>
          </header>

          <main className={styleClasses(styles, "bento-subsection")}>
            <LecturerTags
              tags={lecturer.tags ? lecturer.tags : []}
              className={styleClasses(styles, "tags")}
            />
            <LecturerBio
              content={lecturer.bio ? lecturer.bio : ""}
              className={styleClasses(styles, "bio")}
            />
            <LecturerContact
              contact={lecturer.contact}
              className={styleClasses(styles, "contact")}
            />
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
