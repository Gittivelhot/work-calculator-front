import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';


export default function Calendar() {
  const [workingHours, setWorkingHours] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch('/api/userdetails', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.workingHours && Array.isArray(data.workingHours)) {
          setWorkingHours(data.workingHours);
        }
      })
      .catch((err) => console.log(err))
  }, []);

  const handleEventClick = (eventClickInfo) => {
    setSelectedEvent(eventClickInfo.event);
    setOpen(true);
  };

  const events = workingHours.map(item => ({
    title: `Work - ${item.id}`,
    start: new Date(item.startTime),
    end: new Date(item.endTime),
    textColor: '#ffffff',
  }));

  return (
    <div style={{ width: '94%', marginTop: '5%', paddingLeft: '5%', paddingRight: '5%' }}>
      <FullCalendar
        events={events}
        eventClick={handleEventClick}
        eventContent={(event) => {
          return (
            <div>
                  <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Työaika yksityiskohdat</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="title"
                value={selectedEvent.title}
                label="Title"
                fullWidth
                variant="standard"
                disabled
              />
              <TextField
                margin="dense"
                name="start"
                value={selectedEvent.start ? selectedEvent.start.toLocaleString() : ''}
                label="Start Time"
                fullWidth
                variant="standard"
                disabled
              />
              <TextField
                margin="dense"
                name="end"
                value={selectedEvent.end ? selectedEvent.end.toLocaleString() : ''}
                label="End Time"
                fullWidth
                variant="standard"
                disabled
              />
              {/* Add other fields with event information */}
            </>
          )}
        </DialogContent>
      </Dialog>
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
        aspectRatio={2.0}
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
  