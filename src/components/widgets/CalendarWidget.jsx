import React, { useState } from 'react';

const CalendarWidget = ({ content, onUpdate }) => {
  const [events, setEvents] = useState(content?.events || []);
  const [newEvent, setNewEvent] = useState('');

  const addEvent = () => {
    if (newEvent.trim()) {
      const updatedEvents = [...events, newEvent.trim()];
      setEvents(updatedEvents);
      onUpdate({ events: updatedEvents });
      setNewEvent(''); // Réinitialiser l'input
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addEvent();
    }
  };

  const deleteEvent = (indexToDelete) => {
    const updatedEvents = events.filter((_, index) => index !== indexToDelete);
    setEvents(updatedEvents);
    onUpdate({ events: updatedEvents });
  };

  return (
    <div className="h-full p-4">
      <h3 className="font-semibold mb-2">Événements</h3>
      <div className="overflow-y-auto max-h-[calc(100%-100px)]">
        <ul className="space-y-2">
          {events.map((event, index) => (
            <li 
              key={index} 
              className="p-2 bg-gray-100 rounded flex justify-between items-center"
            >
              <span>{event}</span>
              <button
                onClick={() => deleteEvent(index)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ajouter un événement..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default CalendarWidget;