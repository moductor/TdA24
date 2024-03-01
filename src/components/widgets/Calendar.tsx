"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import { EventInput } from "@fullcalendar/core/index.js";
import { MouseEvent, useRef } from "react";
import { Event } from "../../database/models/Event";
import { styleClasses } from "../../helpers/styleClasses";
import "./Calendar.scss";

type Props = {
  isLecturer?: boolean;
  // events?: { title: string; date: string }[];
  events?: Event[];
  onAddEvent?: (date?: Date) => void;
  cancelButtonLabel?: string;
  onCancel?: () => void;
  onEventClick?: (event: Event) => void;
  className?: string;
};

export default function Calendar({
  isLecturer = false,
  events = [],
  onAddEvent,
  cancelButtonLabel,
  onCancel,
  onEventClick,
  className,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  function convertEvents(): EventInput[] {
    return events.map((event) => ({
      id: event.uuid,
      date: event.dateTimeStart,
      start: event.dateTimeStart,
      end: event.dateTimeEnd,
    }));
  }

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const wrapper = wrapperRef.current!;

    const lane = (e.target as HTMLElement).closest(
      ".fc-scrollgrid-section-body .fc-timegrid-slot-lane",
    );

    if (!lane) return;

    const header = [
      ...wrapper.querySelectorAll(
        ".fc-scrollgrid-section-header .fc-col-header-cell",
      ),
    ].find((_element) => {
      const element = _element as HTMLDivElement;
      const rect = element.getBoundingClientRect();

      if (e.clientX < rect.left) return false;
      if (e.clientX > rect.left + rect.width) return false;

      return true;
    });

    if (!header) return;

    const dataDate = header.getAttribute("data-date")!;
    const dataTime = lane.getAttribute("data-time")!.split(":")[0] + ":00:00";
    const date = new Date(`${dataDate} ${dataTime}`);

    if (onAddEvent) onAddEvent(date);
  }

  return (
    <div
      className={styleClasses(undefined, "calendar", className || "")}
      ref={wrapperRef}
      onClick={handleClick}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={"timeGridWeek"}
        events={convertEvents()}
        eventClick={(e) => {
          if (!onEventClick) return;
          const uuid = e.event.id;
          const event = events.find((event) => event.uuid == uuid);
          if (!event) return;
          onEventClick(event);
        }}
        locale={"cs"}
        headerToolbar={{
          start: isLecturer ? "today" : "addEventButton today",
          center: "title",
          end:
            "dayGridMonth,timeGridWeek,timeGridDay prev,next" +
            (onCancel ? " cancelButton" : ""),
        }}
        titleFormat={{
          month: "long",
          year: "numeric",
          day: "2-digit",
        }}
        allDaySlot={false}
        buttonText={{
          month: "Měsíc",
          week: "Týden",
          day: "Den",
          today: "Dnes",
        }}
        firstDay={1}
        eventColor={"#74C7D3"}
        eventTextColor={"#333333"}
        eventBackgroundColor={"#74C7D3"}
        customButtons={{
          addEventButton: {
            text: "Přidat schůzku",
            click: () => {
              if (!onAddEvent) return;
              onAddEvent();
            },
          },
          cancelButton: {
            text: cancelButtonLabel || "Zrušit",
            click: () => {
              if (!onCancel) return;
              onCancel();
            },
          },
        }}
      />
    </div>
  );
}
