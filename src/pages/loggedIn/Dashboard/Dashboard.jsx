import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import DashboardLine from './DashboardLine';
import DashboardUtilization from './DashboardUtilization';
import DashboardVarianceAnalysis from './DashboardVarianceAnalysis';
import DashboardWaterFall from './DashboardWaterFall';
import DashboardPieChart from './DashboardPieChart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const labels = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Budgeted Revenue',
        data: [300, 280, 320, 310, 330, 340, 350, 360, 370, 380, 390, 400],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Actual Revenue',
        data: [300, 280, 320, 310, 330, 340, 350, 360, 370, 380, 390, 400],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Budgeted Expenses',
        data: [-200, -210, -190, -180, -195, -205, -210, -220, -215, -225, -230, -240],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
      {
        label: 'Actual Expenses',
        data: [-200, -210, -190, -180, -195, -205, -210, -220, -215, -225, -230, -240],
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Budget Vs. Actual (Revenue & Expenses)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return (value);
          },
        },
      },
    },
  };

  return (
    <div className="p-4 content_main_open" id="create_expense">
      <h5>this is company list</h5>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
        <DashboardLine />
        <DashboardUtilization />
        <DashboardVarianceAnalysis />
        <DashboardWaterFall />
        {/* <DashboardPieChart /> */}
      </div>
    </div>
  );
};

export default Dashboard;