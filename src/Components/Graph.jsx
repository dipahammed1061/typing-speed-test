import React from 'react'
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'
import { useTheme } from '../Context/ThemeContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const Graph = ({ graphData, type, label = 'WPM', color }) => {
    const { theme } = useTheme();
    const lineColor = color || theme.title;

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: theme.background + 'ee',
                titleColor: theme.typeBoxText,
                bodyColor: lineColor,
                borderColor: lineColor + '55',
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                ticks: { color: theme.typeBoxText, font: { size: 10 }, maxTicksLimit: 8 },
                grid: { color: theme.typeBoxText + '14' },
            },
            y: {
                ticks: { color: theme.typeBoxText, font: { size: 10 } },
                grid: { color: theme.typeBoxText + '14' },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Line
                options={options}
                data={{
                    labels: graphData.map(i =>
                        type === 'date'
                            ? i[0].toDate().toLocaleString().split(',')[0]
                            : (i[0] + 1)
                    ),
                    datasets: [{
                        data: graphData.map(i => i[1]),
                        label,
                        borderColor: lineColor,
                        backgroundColor: lineColor + '18',
                        fill: true,
                        tension: 0.3,
                        pointRadius: graphData.length > 30 ? 0 : 3,
                        pointHoverRadius: 5,
                        borderWidth: 2,
                    }]
                }}
            />
        </div>
    )
}

export default Graph
