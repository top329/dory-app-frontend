import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

export default function LineChart({ values }: { values: { label: string[]; value: number[] } }) {
  const data = {
    labels: values?.label,
    datasets: [
      {
        label: 'Candidate',
        data: values?.value,
        borderColor: '#0087F4',
        backgroundColor: '#0087F4',
        tension: 0.4,
        fill: false,
      },
    ],
  };
  return <Line options={options} data={data} />;
}
