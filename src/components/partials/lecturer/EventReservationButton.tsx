"use client";

import { useState } from "react";
import Button from "../../widgets/forms/Button";
import EventReservationDialog from "./EventReservationDialog";

type Props = {
  lecturerId: string;
  buttonText: string;
};

export default function EventReservationButton({
  lecturerId,
  buttonText,
}: Props) {
  const [isDialogShown, setIsDialogShown] = useState(false);

  return (
    <>
      <Button onClick={() => setIsDialogShown(true)}>{buttonText}</Button>
      <EventReservationDialog
        show={isDialogShown}
        hide={() => setIsDialogShown(false)}
        lecturerId={lecturerId}
      />
    </>
  );
}
