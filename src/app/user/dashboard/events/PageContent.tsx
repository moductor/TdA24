"use client";

import { useEffect, useState } from "react";
import Calendar from "../../../../components/widgets/Calendar";
import Button from "../../../../components/widgets/forms/Button";
import { Event } from "../../../../database/models/Event";
import { getEndpoint } from "../../../../helpers/endpointUrl";
import DashboardSection from "../DashboardSection";
import PageHeader from "../PageHeader";

type Props = {
  userId: string;
  lecturerId?: string;
};

export default function PageContent({ userId, lecturerId }: Props) {
  const [events, setEvents] = useState<Event[] | undefined>(undefined);

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

  function onEventClick(event: Event) {
    console.log(event);
  }

  return (
    <>
      <PageHeader title="Rezervované schůzky">
        <Button>ICAL</Button>
      </PageHeader>

      <DashboardSection>
        <Calendar
          hideAddEvent={true}
          events={events}
          useTitle={lecturerId ? "user" : "lecturer"}
          onEventClick={onEventClick}
        />
      </DashboardSection>
    </>
  );
}
