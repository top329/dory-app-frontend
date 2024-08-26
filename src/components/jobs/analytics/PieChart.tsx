import { Col, Row } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

export default function PieChart({ values }: { values: { label: string[]; value: number[] } }) {
  const data = {
    labels: values?.label,
    datasets: [
      {
        label: '',
        data: values?.value,
        backgroundColor: ['#D4FF6F', '#DED9D3', '#726DFF', '#FF7F62', '#CCE7FD', '#EBB6D2'],
        borderColor: ['#D4FF6F', '#DED9D3', '#726DFF', '#FF7F62', '#CCE7FD', '#EBB6D2'],
        borderWidth: 0.5,
      },
    ],
  };

  const COLOR = ['bg-[#D4FF6F]', 'bg-[#DED9D3]', 'bg-[#726DFF]', 'bg-[#FF7F62]', 'bg-[#CCE7FD]', 'bg-[#EBB6D2]'];

  return (
    <Row gutter={24} className="!h-[266px]">
      <Col span={12}>
        <Doughnut options={options} data={data} />
      </Col>
      <Col span={12} className="!flex !items-center">
        <div className="flex flex-col justify-center w-full">
          {data?.labels?.map((item: string, key: number) => (
            <div key={key} className="flex items-center justify-between mb-4 last:mb-0 w-full">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${COLOR[key]}`}></div>
                <p className="text-sm text-[#29292A] font-medium">{item}</p>
              </div>
              <p className="text-sm text-[#111827] font-medium">{data.datasets[0].data[key]}</p>
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
}
