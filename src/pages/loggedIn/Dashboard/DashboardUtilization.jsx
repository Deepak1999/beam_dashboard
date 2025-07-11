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

const DashboardUtilization = ({ revenueExpenseData }) => {

    const data = {
        labels: revenueExpenseData?.labels || [],
        datasets: [
            {
                label: 'Budgeted Utilization',
                // data: [10, 17, 31, 21, 51, 45, 38, 55, 95, 72, 62, 130],
                data: revenueExpenseData?.actualDifference || [],
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
                        const absValue = Math.abs(value);
                        const sign = value < 0 ? '-' : '';

                        if (absValue >= 1_00_00_000) return `${sign}${(absValue / 1_00_00_000).toFixed(1)}Cr`;
                        if (absValue >= 1_00_000) return `${sign}${(absValue / 1_00_000).toFixed(1)}L`;
                        if (absValue >= 1_000) return `${sign}${(absValue / 1_000).toFixed(1)}K`;
                        return `${value}`;
                    }
                }
            }
        }
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