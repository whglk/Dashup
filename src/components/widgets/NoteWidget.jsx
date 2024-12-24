// src/components/widgets/NoteWidget.jsx
import React, { useState } from 'react';

const NoteWidget = ({ content, onUpdate }) => {
  const [note, setNote] = useState(content?.text || '');

  const handleChange = (e) => {
    setNote(e.target.value);
    onUpdate({ text: e.target.value });
  };

  return (
    <textarea
      className="w-full h-full p-2 resize-none border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={note}
      onChange={handleChange}
      placeholder="Écrivez votre note ici..."
    />
  );
};

export default NoteWidget;