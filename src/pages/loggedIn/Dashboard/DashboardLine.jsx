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

const DashboardLine = () => {
    const labels = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const data = {
        labels,
        datasets: [
            {
                label: 'Budgeted Profit',
                data: [100, 120, 140, 130, 160, 180, 170, 190, 200, 210, 220, 230],
                borderColor: 'rgb(54, 236, 236)',
                backgroundColor: 'rgba(21, 174, 174, 0.2)',
                tension: 0.4,
                fill: false,
            },
            {
                label: 'Actual Profit',
                data: [130, 140, 155, 115, 180, 211, 155, 130, 120, 190, 192, 255],
                borderColor: 'rgb(219, 49, 86)',
                backgroundColor: 'rgba(236, 41, 83, 0.2)',
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
                title: {
                    display: true,
                    // text: 'Profit ($)',
                },
            },
        },
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