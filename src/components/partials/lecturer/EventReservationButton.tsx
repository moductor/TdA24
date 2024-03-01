"use client";

import { useState } from "react";
import Button from "../../widgets/forms/Button";
import EventReservationDialog from "./EventReservationDialog";

type Props = {
  lecturerId: string;
};

export default function EventReservationButton({ lecturerId }: Props) {
  const [isDialogShown, setIsDialogShown] = useState(false);

  return (
    <>
      <Button onClick={() => setIsDialogShown(true)}>Rezervovat lekci</Button>
      <EventReservationDialog
        show={isDialogShown}
        hide={() => setIsDialogShown(false)}
        lecturerId={lecturerId}
      />
    </>
  );
}
