// src/components/Sidebar.jsx
import React from 'react';
import { Plus, X } from 'lucide-react';

const Sidebar = ({ 
  dashboards, 
  currentDashboard, 
  onSelectDashboard, 
  onAddDashboard, 
  onRemoveDashboard 
}) => {
  return (
    <div className="w-64 bg-gray-100 p-4 border-r h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Dashboards</h2>
        <button
          onClick={onAddDashboard}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="Ajouter un dashboard"
        >
          <Plus size={20} />
        </button>
      </div>
      <ul className="space-y-2">
        {dashboards.map(dashboard => (
          <li
            key={dashboard.id}
            className={`flex justify-between items-center p-2 rounded cursor-pointer transition-colors ${
              currentDashboard.id === dashboard.id ? 'bg-blue-100' : 'hover:bg-gray-200'
            }`}
          >
            <span
              onClick={() => onSelectDashboard(dashboard)}
              className="flex-grow"
            >
              {dashboard.name}
            </span>
            {dashboards.length > 1 && (
              <button
                onClick={() => onRemoveDashboard(dashboard.id)}
                className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                title="Supprimer le dashboard"
              >
                <X size={16} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;