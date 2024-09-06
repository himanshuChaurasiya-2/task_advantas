const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let events = [];

app.get("/events", (req, res) => {
  res.json(events);
});

app.post("/events", (req, res) => {
  const { name, startTime, endTime, date } = req.body;
  const newEvent = {
    id: Math.floor(Math.random() * 10000),
    name,
    startTime,
    endTime,
    date,
  };

  const conflict = events.some(
    (event) =>
      event.date === date &&
      ((startTime >= event.startTime && startTime < event.endTime) ||
        (endTime > event.startTime && endTime <= event.endTime) ||
        (startTime <= event.startTime && endTime >= event.endTime))
  );

  if (conflict) {
    return res.status(409).json({ conflict: true });
  }

  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  events = events.filter((event) => event.id !== parseInt(id));
  res.status(200).json({ message: "Event deleted" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
