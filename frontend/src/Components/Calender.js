import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar({ selectedDate, setSelectedDate }) {
  return (
    <div>
      <h2>Select Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
    </div>
  );
}

export default Calendar;
