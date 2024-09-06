import React, { useState } from "react";

function EventForm({ selectedDate, addEvent, conflict }) {
  const [eventData, setEventData] = useState({
    name: "",
    startTime: "",
    endTime: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...eventData,
      date: selectedDate.toISOString().split("T")[0],
    };
    addEvent(newEvent);
    setEventData({
      name: "",
      startTime: "",
      endTime: "",
    });
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventData.name}
          onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
          required
        />
        <input
          type="time"
          value={eventData.startTime}
          onChange={(e) =>
            setEventData({ ...eventData, startTime: e.target.value })
          }
          required
        />
        <input
          type="time"
          value={eventData.endTime}
          onChange={(e) =>
            setEventData({ ...eventData, endTime: e.target.value })
          }
          required
        />
        <button type="submit">Add Event</button>
        {conflict && (
          <p style={{ color: "red" }}>Event conflicts with an existing event</p>
        )}
      </form>
    </div>
  );
}

export default EventForm;
