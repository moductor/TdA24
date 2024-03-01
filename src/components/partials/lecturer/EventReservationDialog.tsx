"use client";

import { useEffect, useState } from "react";
import InputList from "../../../app/user/dashboard/InputList";
import { Event, EventBase } from "../../../database/models/Event";
import { User } from "../../../database/models/User";
import { getEndpoint } from "../../../helpers/endpointUrl";
import { styleClasses } from "../../../helpers/styleClasses";
import { useForceUpdate } from "../../../helpers/useForceUpdate";
import { getCurrentUser } from "../../../helpers/userSession";
import Calendar from "../../widgets/Calendar";
import Icon from "../../widgets/Icon";
import Dialog from "../../widgets/dialogs/Dialog";
import DialogContentCustom from "../../widgets/dialogs/DialogContentCustom";
import Button from "../../widgets/forms/Button";
import TextAreaRow from "../../widgets/forms/TextAreaRow";
import TextFieldRow from "../../widgets/forms/TextFieldRow";
import styles from "./EventReservationDialog.module.scss";

type Props = {
  show: boolean;
  hide: () => void;
  lecturerId: string;
};

export default function EventReservationDialog({
  show,
  hide,
  lecturerId,
}: Props) {
  const forceUpdate = useForceUpdate();

  const [events, setEvents] = useState<Event[] | undefined>(undefined);

  const [user, setUser] = useState<User | undefined>(undefined);

  const [isOnDetailsPage, setIsOnDetailsPage] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const [errorText, setErrorText] = useState<string | undefined>(undefined);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => forceUpdate(), [show]);
  useEffect(() => {
    setErrorText(undefined);
    setIsSuccessful(false);
  }, [isOnDetailsPage]);

  useEffect(() => setUser(getCurrentUser()), []);

  async function loadEvents() {
    const res = await fetch(
      getEndpoint("/api/event", { params: { lecturerId } }),
    );

    if (res.status != 200) return;

    setEvents((await res.json()) as Event[]);
  }

  function onAddEvent(date?: Date) {
    setSelectedDate(date);
    setIsOnDetailsPage(true);
  }

  async function handleSubmit(data: FormData) {
    setErrorText(undefined);

    const dateTimeStart = new Date(data.get("startDate")!.toString());
    const dateTimeEnd = new Date(data.get("endDate")!.toString());
    const name = data.get("name")!.toString();
    const email = data.get("email")!.toString();
    const telephone = data.get("telephone")!.toString();
    const note = data.get("note")?.toString();

    if (
      dateTimeStart.getMinutes() != 0 ||
      dateTimeStart.getSeconds() != 0 ||
      dateTimeEnd.getMinutes() != 0 ||
      dateTimeEnd.getSeconds() != 0
    ) {
      setErrorText("Schůzka musí začínat i končit v celou hodinu!");
      return;
    }

    if (dateTimeStart.getTime() >= dateTimeEnd.getTime()) {
      setErrorText(
        "Koncový čas nesmí být dřív nebo ve stejnou dobu jako počáteční čas!",
      );
      return;
    }

    const res = await fetch(getEndpoint("/api/event"), {
      method: "POST",
      body: JSON.stringify({
        lecturerId,
        dateTimeStart,
        dateTimeEnd,
        userId: user?.uuid,
        name,
        email,
        telephone,
        note,
      } as EventBase),
    });

    if (res.status == 409) {
      setErrorText("V této době je již zarezervovaná jiná schůzka!");
      return;
    }

    if (res.status != 200) {
      setErrorText("Došlo k neznámé chybě.");
      return;
    }

    setIsSuccessful(true);
    loadEvents();
  }

  return (
    <Dialog
      show={show}
      onBackdropClick={hide}
      onCancel={hide}
      className={styleClasses(styles, "dialog")}
    >
      <div className={styleClasses(styles, "view-page", "calendar-page")}>
        <DialogContentCustom className={styleClasses(styles, "content")}>
          <Calendar
            className={styleClasses(styles, "calendar")}
            events={events}
            cancelButtonLabel="Zavřít"
            onCancel={hide}
            onAddEvent={onAddEvent}
            onEventClick={(event) => console.log("EVENT", event)}
          />
        </DialogContentCustom>
      </div>

      <form
        action={handleSubmit}
        className={styleClasses(
          styles,
          "view-page",
          "details-page",
          isOnDetailsPage ? "active" : "",
        )}
      >
        <DialogContentCustom className={styleClasses(styles, "header")}>
          <Button
            onClick={() => setIsOnDetailsPage(false)}
            icon="back"
            variant="secondary"
            className={styleClasses(styles, "back-button")}
            type="button"
          />
          <Button>Rezervovat</Button>
        </DialogContentCustom>

        <DialogContentCustom className={styleClasses(styles, "content")}>
          {errorText && <div>{errorText}</div>}

          <InputList>
            <div className={styleClasses(styles, "date-row")}>
              <TextFieldRow
                name="startDate"
                type="datetime-local"
                defaultValue={dateTimeToInputValue(selectedDate)}
                required={true}
              >
                Začátek schůzky
              </TextFieldRow>
              <TextFieldRow
                name="endDate"
                type="datetime-local"
                defaultValue={dateTimeToInputValue(
                  dateTimePlusHours(selectedDate),
                )}
                required={true}
              >
                Konec schůzky
              </TextFieldRow>
            </div>
            <TextFieldRow
              name="name"
              type="text"
              defaultValue={user?.name}
              required={true}
            >
              Jméno a příjmení
            </TextFieldRow>
            <TextFieldRow
              name="email"
              type="email"
              defaultValue={user?.email}
              required={true}
            >
              Email
            </TextFieldRow>
            <TextFieldRow
              name="telephone"
              type="tel"
              pattern="(\+420|00420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}"
              defaultValue={user?.telephone}
              required={true}
            >
              Telefonní číslo
            </TextFieldRow>
            <TextAreaRow name="note">Poznámka</TextAreaRow>
          </InputList>
        </DialogContentCustom>

        <div
          className={styleClasses(
            styles,
            "success-pane",
            isSuccessful ? "active" : "",
          )}
        >
          <Icon icon="check" />
          <div>
            <p className="title" role="heading">
              Schůzka byla přidána
            </p>
            <p>Schůzka byla úspěšně přidána!</p>
          </div>
          <Button onClick={() => setIsOnDetailsPage(false)} type="button">
            Zavřít
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

function padZero(val: number, length: number = 2): string {
  const res = val.toString();
  if (res.length >= length) return res;
  return `${"0".repeat(length - res.length)}${res}`;
}

function dateTimeToInputValue(dateTime?: Date): string | undefined {
  if (!dateTime) return;
  return `${dateTime.getFullYear()}-${padZero(dateTime.getMonth() + 1)}-${padZero(dateTime.getDate())}T${padZero(dateTime.getHours())}:${padZero(dateTime.getMinutes())}`;
}

function dateTimePlusHours(
  dateTime?: Date,
  hours: number = 1,
): Date | undefined {
  if (!dateTime) return;
  const newDateTime = new Date(dateTime);
  newDateTime.setHours(dateTime.getHours() + hours);
  return newDateTime;
}
