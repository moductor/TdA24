import { useEffect, useState } from "react";
import LecturerPortrait from "../../../../components/partials/lecturer/LecturerPortrait";
import Dialog from "../../../../components/widgets/Dialog";
import LoadingBar from "../../../../components/widgets/LoadingBar";
import Button from "../../../../components/widgets/forms/Button";
import TextFieldRow from "../../../../components/widgets/forms/TextFieldRow";
import { Lecturer } from "../../../../database/models/Lecturer";
import { styleClasses } from "../../../../helpers/styleClasses";
import styles from "./PortraitChanger.module.scss";

type Props = {
  lecturer: Lecturer;
};

export default function PortraitChanger({ lecturer: lecturerBase }: Props) {
  const [lecturer, setLecturer] = useState(lecturerBase);
  const [isLoading, setIsLoading] = useState(false);

  const [dialogModalDelete, setdialogModalDelete] = useState(false);

  const [dialogModalEdit, setdialogModalEdit] = useState(false);
  const [imageURL, setImageURL] = useState("");

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
    setdialogModalEdit(true);
  });

  const onDeleteDialog = () => {
    document.querySelector("body")!.style.overflow = "hidden";
    setdialogModalDelete(true);
  };

  const onDelete = runUpdateAction(async () => {
    const res = await fetch(`/api/lecturers/${lecturer.uuid}`, {
      method: "PUT",
      body: JSON.stringify({ picture_url: null }),
    });
    setLecturerFromRes(res);
    document.querySelector("body")!.style.overflow = "";
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
          <Button variant="destructive" icon="trash" onClick={onDeleteDialog} />
        )}
      </div>
      <div
        className={styleClasses(styles, "loading-pane")}
        data-visible={isLoading ? "visible" : undefined}
      >
        <LoadingBar />
      </div>
      {dialogModalDelete && (
        <Dialog show={dialogModalDelete}>
          <div className={styleClasses(styles, "dialog-text")}>
            Opravdu chcete vymazat profilový obrázek?
          </div>
          <div className={styleClasses(styles, "dialog-btns")}>
            <Button
              variant="destructive"
              onClick={async () => {
                onDelete();
                setdialogModalDelete(false);
                document.querySelector("body")!.style.overflow = "";
              }}
            >
              Odstranit
            </Button>
            <Button
              onClick={() => {
                setdialogModalDelete(false);
                document.querySelector("body")!.style.overflow = "";
              }}
            >
              Zrušit
            </Button>
          </div>
        </Dialog>
      )}
      {dialogModalEdit && (
        <Dialog show={dialogModalEdit}>
          <TextFieldRow
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className={styleClasses(styles, "dialog-btns")}
          >
            Zadejte URL obrázku:
          </TextFieldRow>
          <div className={styleClasses(styles, "dialog-btns")}>
            <Button
              onClick={async () => {
                const url = imageURL;
                if (!url) return;

                const res = await fetch(`/api/lecturers/${lecturer.uuid}`, {
                  method: "PUT",
                  body: JSON.stringify({ picture_url: url }),
                });
                setLecturerFromRes(res);
                setImageURL("");

                setdialogModalEdit(false);
                document.querySelector("body")!.style.overflow = "";
              }}
            >
              Potvrdit
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
