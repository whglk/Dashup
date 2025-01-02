// src/components/Widget.jsx
import React, { useState } from 'react';
import { X, Edit2, Check } from 'lucide-react';
import { NoteWidget, TodoWidget, CounterWidget, CalendarWidget, ChartWidget } from './widgets/index';

const Widget = ({ widget, onRemove, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(widget.title);

  const handleTitleSubmit = () => {
    onUpdate(widget.id, { ...widget, title });
    setIsEditing(false);
  };

  const handleContentUpdate = (content) => {
    onUpdate(widget.id, { ...widget, content });
  };

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'note':
        return <NoteWidget content={widget.content} onUpdate={handleContentUpdate} />;
      case 'todo':
        return <TodoWidget content={widget.content} onUpdate={handleContentUpdate} />;
      case 'counter':
        return <CounterWidget content={widget.content} onUpdate={handleContentUpdate} />;
      case 'calendar':
          return <CalendarWidget content={widget.content} onUpdate={handleContentUpdate} />;
      case 'chart':
          return <ChartWidget content={widget.content} onUpdate={handleContentUpdate} />;
      default:
        return <div>Type de widget non supporté</div>;
    }
  };

  return (
    <div className="h-full bg-white p-4 rounded-lg shadow flex flex-col">
      <div className="flex justify-between items-center mb-2 widget-header">
        {isEditing ? (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-1 rounded"
              autoFocus
            />
            <button
              onClick={handleTitleSubmit}
              className="p-1 hover:bg-gray-100 rounded text-green-500"
            >
              <Check size={16} />
            </button>
          </div>
        ) : (
          <h3 className="font-semibold">{widget.title}</h3>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 hover:bg-gray-100 rounded"
            title={isEditing ? "Annuler" : "Modifier"}
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onRemove(widget.id)}
            className="p-1 hover:bg-gray-100 rounded text-red-500"
            title="Supprimer"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-hidden">
        {renderWidgetContent()}
      </div>
    </div>
  );
};

export default Widget;