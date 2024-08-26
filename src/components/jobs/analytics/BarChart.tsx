import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
};

export default function BarChart({ values }: { values: { label: string[]; value: number[] } }) {
  const data = {
    labels: values?.label,
    datasets: [
      {
        label: '',
        data: values?.value,
        borderColor: '#0087F4',
        backgroundColor: '#0087F4',
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
