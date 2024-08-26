import { Card } from 'antd';

export default function StatisticItem({
  item,
  isLoading,
}: {
  item: { score: string; icon: React.ReactNode; title: string; status: string; value: string };
  isLoading: boolean;
}) {
  return (
    <Card bordered={false} className="!bg-[#F8F8F8] !w-[20%]" loading={isLoading}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[32px] text-[#0E181C] font-semibold">{item.score}</p>
        {item.icon}
      </div>
      <p className="text-[#050505] font-medium mb-[10px]">{item.title}</p>
      <div className="flex items-center gap-2">
        <p className="text-sm text-[#050505] font-medium">{item.status} :</p>
        <p className="text-sm text-[#666666]">{item.value}</p>
      </div>
    </Card>
  );
}
