"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Calendar from "../../../../../components/widgets/Calendar";
import Button from "../../../../../components/widgets/forms/Button";
import { Event } from "../../../../../database/models/Event";
import { getEndpoint } from "../../../../../helpers/endpointUrl";
import DashboardSection from "../DashboardSection";
import PageHeader from "../PageHeader";
import EventDetailsDialog from "./EventDetailsDialog";
import IcalDialog from "./IcalDialog";

type Props = {
  userId: string;
  lecturerId?: string;
};

export default function PageContent({ userId, lecturerId }: Props) {
  const isLecturer = Boolean(lecturerId);

  const [events, setEvents] = useState<Event[] | undefined>(undefined);

  const [detailedEvent, setDetailedEvent] = useState<Event | undefined>(
    undefined,
  );
  const [showIcal, setShowIcal] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const res = await fetch(
      getEndpoint("/api/event", {
        params: lecturerId ? { lecturerId } : { userId },
      }),
    );

    if (res.status != 200) return;

    setEvents((await res.json()) as Event[]);
  }

  async function cancelEvent() {
    if (!detailedEvent) return;

    const res = await fetch(getEndpoint(`/api/event/${detailedEvent.uuid}`), {
      method: "DELETE",
    });

    setDetailedEvent(undefined);
    loadEvents();
  }

  function onEventClick(event: Event) {
    console.log(event);
    setDetailedEvent(event);
  }

  const t = useTranslations("Dashboard");

  return (
    <div>
      <PageHeader title={t("eventsTitle")}>
        <Button onClick={() => setShowIcal(true)}>{t("download")}</Button>
      </PageHeader>

      <DashboardSection>
        <Calendar
          hideAddEvent={true}
          events={events}
          useTitle={isLecturer ? "user" : "lecturer"}
          onEventClick={onEventClick}
        />
      </DashboardSection>

      <EventDetailsDialog
        show={Boolean(detailedEvent)}
        hide={() => setDetailedEvent(undefined)}
        cancelEvent={cancelEvent}
        event={detailedEvent}
        isLecturer={isLecturer}
      />

      <IcalDialog
        show={showIcal}
        hide={() => setShowIcal(false)}
        isLecturer={isLecturer}
        uuid={lecturerId || userId}
      />
    </div>
  );
}
