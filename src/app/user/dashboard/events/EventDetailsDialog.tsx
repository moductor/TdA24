"use client";

import { useEffect, useState } from "react";
import LoadingBar from "../../../../components/widgets/LoadingBar";
import Dialog from "../../../../components/widgets/dialogs/Dialog";
import DialogButtons from "../../../../components/widgets/dialogs/DialogButtons";
import DialogCloseButton from "../../../../components/widgets/dialogs/DialogCloseButton";
import DialogContent from "../../../../components/widgets/dialogs/DialogContent";
import DialogContentCustom from "../../../../components/widgets/dialogs/DialogContentCustom";
import Button from "../../../../components/widgets/forms/Button";
import { EventRes } from "../../../../database/models/Event";
import { styleClasses } from "../../../../helpers/styleClasses";
import styles from "./EventDetailsDialog.module.scss";

type Props = {
  show: boolean;
  hide: () => void;
  cancelEvent?: () => void;
  event?: EventRes;
  isLecturer: boolean;
};

export default function EventDetailsDialog({
  show,
  hide,
  cancelEvent,
  event,
  isLecturer,
}: Props) {
  const dateStart = event && new Date((event as any).dateTimeStart);
  const dateEnd = event && new Date((event as any).dateTimeEnd);

  const [isLoading, setIsLoading] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setDeleteActive(false);
  }, [show]);

  function getTimes() {
    if (!event) return;
    const startTime = dateStart!.toLocaleTimeString().split(":");
    startTime.pop();

    const endTime = dateEnd!.toLocaleTimeString().split(":");
    endTime.pop();

    return `${startTime.join(":")}-${endTime.join(":")}`;
  }

  return (
    <Dialog
      show={show}
      onBackdropClick={hide}
      onCancel={hide}
      className={styleClasses(styles, "dialog")}
    >
      <DialogCloseButton onClick={hide} />
      <div>
        {event && (
          <DialogContentCustom className={styleClasses(styles, "content")}>
            <dl>
              <dt>Termín:</dt>
              <dd>
                {dateStart!.toLocaleDateString()}
                <br />
                {getTimes()}
              </dd>

              {isLecturer ? (
                <>
                  <dt>Jméno:</dt>
                  <dd>{event.name}</dd>
                </>
              ) : (
                <>
                  <dt>Lektor:</dt>
                  <dd>{event.lecturerName}</dd>
                </>
              )}

              <dt>Email:</dt>
              <dd>{event.email}</dd>

              <dt>Telefon:</dt>
              <dd>{event.telephone}</dd>

              {event.note && (
                <>
                  <dt>Poznámka:</dt>
                  <dd>{event.note}</dd>
                </>
              )}
            </dl>
          </DialogContentCustom>
        )}
        <DialogButtons className={styleClasses(styles, "buttons")}>
          {isLecturer && (
            <Button
              variant="secondary"
              icon="trash"
              onClick={() => setDeleteActive(true)}
            />
          )}
          <Button onClick={hide}>OK</Button>
        </DialogButtons>
      </div>

      {isLecturer && (
        <div
          className={styleClasses(
            styles,
            "confirm",
            deleteActive ? "active" : "",
          )}
        >
          <DialogContent
            className={styleClasses(styles, "content")}
            title="Zrušit lekci"
            content="Skutečně chcete zrušit lekci?"
          />

          <DialogButtons>
            <Button variant="secondary" onClick={() => setDeleteActive(false)}>
              Ne
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!cancelEvent) return;
                setIsLoading(true);
                cancelEvent();
              }}
            >
              Ano
            </Button>
          </DialogButtons>
        </div>
      )}

      <div
        className={styleClasses(styles, "loading-pane")}
        data-visible={isLoading ? "visible" : undefined}
      >
        <LoadingBar />
      </div>
    </Dialog>
  );
}
