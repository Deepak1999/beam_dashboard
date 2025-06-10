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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardUtilization = () => {
    const labels = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const data = {
        labels,
        datasets: [
            {
                label: 'Budgeted Utilization',
                data: [10, 17, 31, 21, 51, 45, 38, 55, 95, 72, 62, 130],
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
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
                text: 'Budget Utilization (%)',
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
        <div className="col-md-6 mb-4">
            <div className="card">
                <div className="card-body">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default DashboardUtilization;
