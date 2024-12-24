// src/components/WidgetSelector.jsx
import React from 'react';
import { StickyNote, CheckSquare, Hash } from 'lucide-react';

const WidgetSelector = ({ onSelect, onClose }) => {
  const widgetTypes = [
    {
      id: 'note',
      name: 'Note',
      icon: <StickyNote size={24} />,
      defaultContent: { text: '' }
    },
    {
      id: 'todo',
      name: 'Todo List',
      icon: <CheckSquare size={24} />,
      defaultContent: { todos: [] }
    },
    {
      id: 'counter',
      name: 'Compteur',
      icon: <Hash size={24} />,
      defaultContent: { count: 0 }
    }
  ];

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-white p-6 rounded-lg shadow-xl z-50">
      <h3 className="text-lg font-semibold mb-4">Choisir un type de widget</h3>
      <div className="grid grid-cols-3 gap-4">
        {widgetTypes.map(type => (
          <button
            key={type.id}
            onClick={() => {
              onSelect(type);
              onClose();
            }}
            className="flex flex-col items-center gap-2 p-4 border rounded-lg 
                     hover:bg-gray-50 transition-colors"
          >
            {type.icon}
            <span>{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WidgetSelector;