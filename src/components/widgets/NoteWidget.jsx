import React, { useState } from 'react';

const CalendarWidget = ({ content, onUpdate }) => {
  const [selectedDate, setSelectedDate] = useState(content?.date || new Date().toISOString().split('T')[0]);

  const handleChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    onUpdate({ date: newDate });
  };

  return (
    <div className="w-full p-2">
      <input
        type="date"
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedDate}
        onChange={handleChange}
        aria-label="Sélectionnez une date"
      />
    </div>
  );
};

export default CalendarWidget;