// src/App.jsx
import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Sidebar from './components/Sidebar';
import Widget from './components/Widget';
import WidgetSelector from './components/WidgetSelector';
import useLocalStorage from './hooks/useLocalStorage';

const ResponsiveGridLayout = WidthProvider(Responsive);

// Configuration des tailles par type de widget
const WIDGET_CONFIGS = {
  note: {
    minW: 4,
    minH: 4,
    maxW: 12,
    maxH: 12,
    defaultW: 6,
    defaultH: 4
  },
  todo: {
    minW: 4,
    minH: 6,
    maxW: 12,
    maxH: 16,
    defaultW: 6,
    defaultH: 8
  },
  counter: {
    minW: 3,
    minH: 3,
    maxW: 6,
    maxH: 6,
    defaultW: 4,
    defaultH: 4
  },
  calendar: {
    minW: 3,
    minH: 3, 
    maxW: 6, 
    maxH: 6,
    defaultW: 4,
    defaultH: 4
  },
  chart: {
    minW: 3, 
    minH: 3, 
    maxW: 6, 
    maxH: 6, 
    defaultW: 4,
    defaultH: 4
  }
};

const App = () => {
  // États principaux
  const [dashboards, setDashboards] = useLocalStorage('dashboards', [
    { id: '1', name: 'Dashboard principal', widgets: [] }
  ]);
  
  const [currentDashboard, setCurrentDashboard] = useState(dashboards[0]);
  const [layouts, setLayouts] = useLocalStorage(`layout-${currentDashboard.id}`, {});
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);

  // Gestionnaire de Dashboard
  const addDashboard = () => {
    const newDashboard = {
      id: `dashboard-${Date.now()}`,
      name: 'Nouveau Dashboard',
      widgets: []
    };
    setDashboards(prev => [...prev, newDashboard]);
  };

  const removeDashboard = (dashboardId) => {
    if (dashboards.length === 1) return;
    
    setDashboards(prev => prev.filter(d => d.id !== dashboardId));
    localStorage.removeItem(`layout-${dashboardId}`);
    
    if (currentDashboard.id === dashboardId) {
      setCurrentDashboard(dashboards[0]);
    }
  };

  const updateDashboard = (updatedDashboard) => {
    setDashboards(prev =>
      prev.map(d => d.id === updatedDashboard.id ? updatedDashboard : d)
    );
    setCurrentDashboard(updatedDashboard);
  };

  // Gestionnaire de Widgets
  const addWidget = (widgetType) => {
    const config = WIDGET_CONFIGS[widgetType.id];
    const newWidget = {
      id: `widget-${Date.now()}`,
      title: `Nouveau ${widgetType.name}`,
      type: widgetType.id,
      content: widgetType.defaultContent,
      config: config // Stocker la configuration pour référence future
    };
    
    const updatedDashboard = {
      ...currentDashboard,
      widgets: [...currentDashboard.widgets, newWidget]
    };
    
    updateDashboard(updatedDashboard);
  };

  const removeWidget = (widgetId) => {
    const updatedDashboard = {
      ...currentDashboard,
      widgets: currentDashboard.widgets.filter(w => w.id !== widgetId)
    };
    
    updateDashboard(updatedDashboard);
  };

  const updateWidget = (widgetId, updatedWidget) => {
    const updatedDashboard = {
      ...currentDashboard,
      widgets: currentDashboard.widgets.map(w =>
        w.id === widgetId ? updatedWidget : w
      )
    };
    
    updateDashboard(updatedDashboard);
  };

  // Gestionnaire de Layout
  const onLayoutChange = (currentLayout, allLayouts) => {
    setLayouts(allLayouts);
  };

  const getDefaultLayout = (widget) => {
    const existingLayout = layouts?.lg?.find(item => item.i === widget.id);
    const config = WIDGET_CONFIGS[widget.type];
    
    return existingLayout || {
      x: 0,
      y: Infinity,
      w: config.defaultW,
      h: config.defaultH,
      minW: config.minW,
      minH: config.minH,
      maxW: config.maxW,
      maxH: config.maxH,
    };
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        dashboards={dashboards}
        currentDashboard={currentDashboard}
        onSelectDashboard={setCurrentDashboard}
        onAddDashboard={addDashboard}
        onRemoveDashboard={removeDashboard}
      />

      <div className="flex-grow overflow-hidden">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {currentDashboard.name}
            </h1>
            <button
              onClick={() => setShowWidgetSelector(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                       transition-colors shadow-sm"
            >
              Ajouter un widget
            </button>
          </div>

          <div className="flex-grow overflow-auto">
            <ResponsiveGridLayout
              className="layout"
              layouts={layouts}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 9, sm: 6, xs: 4, xxs: 2 }}
              rowHeight={100}
              onLayoutChange={onLayoutChange}
              margin={[16, 16]}
              containerPadding={[0, 0]}
              isResizable={true}
              isDraggable={true}
              draggableHandle=".widget-header"
              resizeHandles={['se']}
              useCSSTransforms={true}
              transformScale={1}
              preventCollision={false}
              compactType="vertical"
              // Animation des widgets
              transition="transform 0.2s ease, opacity 0.2s ease"
            >
              {currentDashboard.widgets.map(widget => (
                <div 
                  key={widget.id} 
                  data-grid={getDefaultLayout(widget)}
                  className="transition-shadow hover:shadow-lg"
                >
                  <Widget
                    widget={widget}
                    onRemove={removeWidget}
                    onUpdate={updateWidget}
                  />
                </div>
              ))}
            </ResponsiveGridLayout>
          </div>
        </div>
      </div>

      {showWidgetSelector && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
                     justify-center z-50 animate-fade-in"
        >
          <WidgetSelector
            onSelect={addWidget}
            onClose={() => setShowWidgetSelector(false)}
          />
        </div>
      )}
    </div>
  );
};

export default App;