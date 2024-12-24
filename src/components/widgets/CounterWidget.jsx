// src/components/widgets/CounterWidget.jsx
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const CounterWidget = ({ content, onUpdate }) => {
  const [count, setCount] = useState(content?.count || 0);

  const updateCount = (newCount) => {
    setCount(newCount);
    onUpdate({ count: newCount });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <div className="text-4xl font-bold">{count}</div>
      <div className="flex gap-2">
        <button
          onClick={() => updateCount(count - 1)}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <Minus size={20} />
        </button>
        <button
          onClick={() => updateCount(count + 1)}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default CounterWidget;