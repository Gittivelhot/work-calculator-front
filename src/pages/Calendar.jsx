import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function Calendar() {
  const [workingHours, setWorkingHours] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://work-calculator-back-fe87ca711a8e.herokuapp.com/api/workinghours')
      .then(response => response.json())
      .then(data => setWorkingHours(data));
  };

  const events = workingHours.map(item => ({
    title: `Work - ${item.id}`,
    start: new Date(item.startTime),
    end: new Date(item.endTime),
    textColor: '#ffffff',
  }));

  return (
    <div style={{ width: '100%', marginTop: '5%', paddingLeft: '5%', paddingRight: '5%' }}>
      <FullCalendar
        events={events}
        eventContent={(event) => {
          return (
            <div>
              <p>{event.event._def.title}</p>
              {event.event.start && event.event.end && (
                <p>
                  {event.event.start.toLocaleString('de-DE', { hour: 'numeric', minute: 'numeric' })} -{' '}
                  {event.event.end.toLocaleString('de-DE', { hour: 'numeric', minute: 'numeric' })}
                </p>
              )}
            </div>
          );
        }}
        aspectRatio={2.5}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridDay,timeGridWeek,dayGridMonth',
        }}
        firstDay={1}
        selectable={true}
        allDaySlot={false}
        dayHeaderFormat={{
          weekday: 'long',
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          omitCommas: true,
        }}
        slotLabelInterval="01:00"
        slotDuration="00:15"
        slotLabelFormat={{
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
        }}
      />
    </div>
  );
}
