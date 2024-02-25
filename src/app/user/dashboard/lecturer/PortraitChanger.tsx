import { useEffect, useState } from "react";
import LecturerPortrait from "../../../../components/partials/lecturer/LecturerPortrait";
import LoadingBar from "../../../../components/widgets/LoadingBar";
import Button from "../../../../components/widgets/forms/Button";
import { Lecturer } from "../../../../database/models/Lecturer";
import { styleClasses } from "../../../../helpers/styleClasses";
import styles from "./PortraitChanger.module.scss";

type Props = {
  lecturer: Lecturer;
};

export default function PortraitChanger({ lecturer: lecturerBase }: Props) {
  const [lecturer, setLecturer] = useState(lecturerBase);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLecturer(lecturerBase);
  }, [lecturerBase]);

  async function setLecturerFromRes(res: Response) {
    if (res.status != 200) return;
    const data = await res.json();
    setLecturer(data as Lecturer);
  }

  function runUpdateAction(cb: () => Promise<void>) {
    return async () => {
      setIsLoading(true);
      await cb();
      setIsLoading(false);
    };
  }

  const onEdit = runUpdateAction(async () => {
    const url = prompt("Zadejte URL obrázku");
    if (!url) return;

    const res = await fetch(`/api/lecturers/${lecturer.uuid}`, {
      method: "PUT",
      body: JSON.stringify({ picture_url: url }),
    });
    setLecturerFromRes(res);
  });

  const onDelete = runUpdateAction(async () => {
    const res = await fetch(`/api/lecturers/${lecturer.uuid}`, {
      method: "PUT",
      body: JSON.stringify({ picture_url: null }),
    });
    setLecturerFromRes(res);
  });

  return (
    <div className={styleClasses(styles, "portrait")}>
      <LecturerPortrait
        lecturer={lecturer}
        className={styleClasses(styles, "portrait-image")}
      />
      <div className={styleClasses(styles, "edit-buttons")}>
        <Button icon="edit" onClick={onEdit} />
        {lecturer.picture_url && (
          <Button variant="destructive" icon="trash" onClick={onDelete} />
        )}
      </div>
      <div
        className={styleClasses(styles, "loading-pane")}
        data-visible={isLoading ? "visible" : undefined}
      >
        <LoadingBar />
      </div>
    </div>
  );
}
