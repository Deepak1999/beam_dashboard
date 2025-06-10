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

const DashboardVarianceAnalysis = () => {
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
                backgroundColor: 'rgba(91, 234, 14, 0.87)',
            },
            {
                label: 'Budgeted Expenses',
                data: [-200, -210, -190, -180, -195, -205, -210, -220, -215, -225, -230, -240],
                backgroundColor: 'rgba(235, 84, 117, 0.87)',
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
                text: 'Variance Analysis (Actual & Budget)',
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

export default DashboardVarianceAnalysis;
