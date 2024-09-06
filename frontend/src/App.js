import React, { useState, useEffect } from "react";
import Calendar from "./Components/Calender";
import EventForm from "./Components/EventForm";
import EventList from "./Components/EventList";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [conflict, setConflict] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (newEvent) => {
    try {
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (response.status === 409) {
        setConflict(true);
      } else {
        const result = await response.json();
        setConflict(false);
        setEvents((prevEvents) => [...prevEvents, result]);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="App">
      <h1>Event Scheduler</h1>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <EventForm
        selectedDate={selectedDate}
        addEvent={addEvent}
        conflict={conflict}
      />
      <EventList events={events} setEvents={setEvents} />
    </div>
  );
}

export default App;
