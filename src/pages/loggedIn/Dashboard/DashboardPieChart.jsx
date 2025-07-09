import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DashboardPieChart = () => {
    const labels = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const dataValues = [
        100,
        100, 80, 90, 70, 110, 95, 105, 85, 75, 65, 95, 105,
        200
    ];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Monthly Flow',
                data: dataValues,
                backgroundColor: labels.map((_, i) => {
                    if (i === 0) return '#007bff';
                    if (i === labels.length - 1) return '#28a745';
                    return `hsl(${i * 25}, 70%, 60%)`;
                }),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Financial Flow: Start → Jan–Dec → End',
            },
        },
    };

    return (
        <div className="col-md-4 mb-12">
            <div className="card">
                <div className="card-body">
                    <Pie data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPieChart;