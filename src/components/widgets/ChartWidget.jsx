import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrement des composants nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartWidget = () => {
  // État pour les données du graphique
  const [data, setData] = useState({
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  // État pour les options du graphique
  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Exemple de graphique linéaire',
      },
    },
  });

  // Gestion des mises à jour des données
  const updateData = () => {
    const newLabels = prompt(
      'Entrez les nouvelles étiquettes (séparées par des virgules)',
      data.labels.join(',')
    );
    const newData = prompt(
      'Entrez les nouvelles valeurs (séparées par des virgules)',
      data.datasets[0].data.join(',')
    );

    if (newLabels && newData) {
      setData({
        ...data,
        labels: newLabels.split(','),
        datasets: [
          {
            ...data.datasets[0],
            data: newData.split(',').map(Number),
          },
        ],
      });
    }
  };

  const updateTitle = () => {
    const newTitle = prompt('Entrez un nouveau titre pour le graphique', options.plugins.title.text);
    if (newTitle) {
      setOptions({
        ...options,
        plugins: {
          ...options.plugins,
          title: {
            ...options.plugins.title,
            text: newTitle,
          },
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow">
      <Line data={data} options={options} />
      <div className="flex gap-4">
        <button
          onClick={updateData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Modifier les données
        </button>
        <button
          onClick={updateTitle}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Modifier le titre
        </button>
      </div>
    </div>
  );
};

export default ChartWidget;
