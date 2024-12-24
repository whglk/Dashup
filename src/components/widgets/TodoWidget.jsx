// src/components/widgets/TodoWidget.jsx
import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';

const TodoWidget = ({ content, onUpdate }) => {
  const [todos, setTodos] = useState(content?.todos || []);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const updatedTodos = [...todos, { id: Date.now(), text: newTodo, completed: false }];
    setTodos(updatedTodos);
    setNewTodo('');
    onUpdate({ todos: updatedTodos });
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    onUpdate({ todos: updatedTodos });
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    onUpdate({ todos: updatedTodos });
  };

  return (
    <div className="h-full flex flex-col">
      <form onSubmit={addTodo} className="flex gap-2 mb-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nouvelle tâche..."
          className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus size={20} />
        </button>
      </form>
      <ul className="flex-grow overflow-auto space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center gap-2 p-2 bg-gray-50 rounded"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`p-1 rounded ${
                todo.completed ? 'text-green-500' : 'text-gray-400'
              }`}
            >
              <Check size={16} />
            </button>
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-400' : ''}`}>
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="p-1 text-red-500 hover:text-red-700 rounded"
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoWidget;