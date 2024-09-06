import React from "react";

function EventList({ events, setEvents }) {
  const formatTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert hour to 12-hour format, with 12 instead of 0
    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== id));
      } else {
        console.error("Failed to delete event:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <h2>Events</h2>
      {console.log(events)}
      {events.length === 0 ? (
        <p>No events for this day</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.name} - {formatTime(event.startTime)} to{" "}
              {formatTime(event.endTime)}
              <button onClick={() => handleDelete(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;
