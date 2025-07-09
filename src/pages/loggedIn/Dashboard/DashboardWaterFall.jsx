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

const DashboardWaterFall = () => {
    const labels = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const startValue = 1000;

    const budgetedRevenue = [300, 280, 320, 310, 330, 340, 350, 360, 370, 380, 390, 400];
    const budgetedExpenses = [-200, -210, -190, -180, -195, -205, -210, -220, -215, -225, -230, -240];

    const monthlyNet = budgetedRevenue.map((rev, idx) => rev + budgetedExpenses[idx]);

    const totalChange = monthlyNet.reduce((acc, val) => acc + val, 0);
    const endValue = startValue + totalChange;

    const fullData = [startValue, ...monthlyNet, endValue];

    const backgroundColors = [
        '#007bff',
        ...monthlyNet.map(value => value >= 0 ? '#28a745' : '#dc3545'),
        '#007bff',
    ];

    const data = {
        labels,
        datasets: [
            {
                label: 'Net Change',
                data: fullData,
                backgroundColor: backgroundColors,
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
                text: 'Waterfall Chart Analysis with Start & End',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount',
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

export default DashboardWaterFall;