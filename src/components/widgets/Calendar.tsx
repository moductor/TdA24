"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import "./Calendar.scss";

type Props = {
  isLecturer?: boolean;
};

export default function Calendar({ isLecturer = false }: Props) {
  return (
    <div className={"calendar"}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={"dayGridMonth"}
        events={[
          { title: "event 1", date: "2024-02-01" },
          { title: "event 2", date: "2024-02-22" },
        ]}
        locale={"cs"}
        headerToolbar={{
          start: isLecturer ? "today" : "addEventButton today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay prev,next",
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
        eventColor={"#74C7D3"}
        eventTextColor={"#333333"}
        eventBackgroundColor={"#74C7D3"}
        customButtons={{
          addEventButton: {
            text: "Přidat schůzku",
            click: function () {
              alert("Co na mě klikáš???");
            },
          },
        }}
      />
    </div>
  );
}
