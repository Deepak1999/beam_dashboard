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

const DashboardVarianceAnalysis = ({ revenueExpenseData }) => {

    const data = {
        labels: revenueExpenseData?.labels || [],
        datasets: [
            {
                label: 'Actual vs. Budget',
                data: revenueExpenseData?.actualDifference || [],
                backgroundColor: 'rgba(60, 2, 249, 0.87)',
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
                text: 'Variance Analysis',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        const absValue = Math.abs(value);
                        const sign = value < 0 ? '-' : '';

                        if (absValue >= 1_00_00_000) return `${context.dataset.label}: ${sign}${(absValue / 1_00_00_000).toFixed(1)}Cr`;
                        if (absValue >= 1_00_000) return `${context.dataset.label}: ${sign}${(absValue / 1_00_000).toFixed(1)}L`;
                        if (absValue >= 1_000) return `${context.dataset.label}: ${sign}${(absValue / 1_000).toFixed(1)}K`;
                        return `${context.dataset.label}: ${value}`;
                    }
                }
            }
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

export default DashboardVarianceAnalysis;