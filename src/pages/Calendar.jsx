import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/calendar.css";

export default function Calendar() {
  // State declarations
  const [workingHours, setWorkingHours] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [msg, setMsg] = useState([]);
  const [openEventId, setOpenEventId] = useState(null);

  // Close dialog and reset open event ID state
  const handleClose = () => {
    setOpen(false);
    setOpenEventId(null);
  };

  // Function to fetch working hours data from the server
  const fetchWorkingHours = () => {
    fetch("/api/userdetails", {
      method: "GET",
      mode: "cors",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.workingHours && Array.isArray(data.workingHours)) {
          setWorkingHours(data.workingHours);
        }
      })
      .catch((err) => console.log(err));
  };

  // Fetch working hours data on component mount
  useEffect(() => {
    fetchWorkingHours();
  }, []);

  // Function to handle delete action on a specific working hour entry
  const handleDelete = (id) => {
    if (window.confirm("Confirm delete")) {
      fetch(`/api/delete/${id}`, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            setMsg("Entry deleted successfully");
            setOpen(true);
            fetchWorkingHours(); // Fetch updated data after deletion
          } else {
            setMsg("Failed to delete entry");
            setOpen(true);
          }
        })
        .catch((err) => {
          console.error(err);
          setMsg("An error occurred");
          setOpen(true);
        });
    }
  };
  // Handle click on a calendar event
  const handleEventClick = (eventClickInfo) => {
    const selectedEventData = {
      id: eventClickInfo.event.id,
      title: eventClickInfo.event.title,
      start: eventClickInfo.event.start,
      end: eventClickInfo.event.end,
    };
    setSelectedEvent(selectedEventData);
    setOpenEventId(eventClickInfo.event.id);
  };
  // Check if the event is open based on event ID
  const isEventOpen = (eventId) => {
    return openEventId === eventId;
  };
  // Create events array for FullCalendar
  const events = workingHours.map((item) => ({
    title: `Work - ${item.id}`,
    start: new Date(item.startTime),
    end: new Date(item.endTime),
    id: item.id,
    textColor: "#ffffff",
  }));

  return (
    <div className="calendar">
      <FullCalendar
        events={events}
        eventClick={handleEventClick}
        eventContent={(event) => {
          return (
            <div>
              <Dialog open={isEventOpen(event.event.id)} onClose={handleClose}>
                <Button
                  onClick={handleClose}
                  endIcon={<CloseIcon />}
                  variant="filled"
                  color="secondary"
                  size="small"
                  style={{ position: "absolute", top: 0, right: 0 }}
                ></Button>
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
                        value={
                          selectedEvent.start
                            ? selectedEvent.start.toLocaleString()
                            : ""
                        }
                        label="Start Time"
                        fullWidth
                        variant="standard"
                        disabled
                      />

                      <TextField
                        margin="dense"
                        name="end"
                        value={
                          selectedEvent.end
                            ? selectedEvent.end.toLocaleString()
                            : ""
                        }
                        label="End Time"
                        fullWidth
                        variant="standard"
                        disabled
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ margin: 5 }}
                        onClick={() => handleDelete(selectedEvent.id)}
                        startIcon={<DeleteIcon />} size="large"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </DialogContent>
              </Dialog>
              <p>{event.event._def.title}</p>
              {event.event.start && event.event.end && (
                <p>
                  {event.event.start.toLocaleString("de-DE", {
                    hour: "numeric",
                    minute: "numeric",
                  })}{" "}
                  -{" "}
                  {event.event.end.toLocaleString("de-DE", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              )}
            </div>
          );
        }}
        aspectRatio={2.5}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
        }}
        firstDay={1}
        selectable={true}
        allDaySlot={false}
        dayHeaderFormat={{
          weekday: "long",
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          omitCommas: true,
        }}
        slotLabelInterval="01:00"
        slotDuration="00:15"
        slotLabelFormat={{
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          omitZeroMinute: false,
        }}
      />
      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={() => setOpen(false)}
        message={msg}
      />
    </div>
  );
}
