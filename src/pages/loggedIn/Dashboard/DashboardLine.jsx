import React from 'react';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DashboardLine = ({ revenueExpenseData }) => {

    const data = {
        labels: revenueExpenseData?.labels || [],
        datasets: [
            {
                label: 'Budgeted Profit',
                data: revenueExpenseData?.projectedProfit || [],
                borderColor: 'rgb(7, 152, 152)',
                backgroundColor: 'rgba(5, 156, 43, 0.2)',
                tension: 0.4,
                fill: false,
            },
            {
                label: 'Actual Profit',
                data: revenueExpenseData?.actualProfit || [],
                borderColor: 'rgba(215, 13, 57, 0.95)',
                backgroundColor: 'rgba(236, 65, 65, 0.2)',
                tension: 0.4,
                fill: false,
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
                text: 'Budgeted vs Actual Profit',
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
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default DashboardLine;