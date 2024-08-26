import { Card } from 'antd';

import { StarFilled } from '@ant-design/icons';
import IconUser from '@/assets/icons/users_1.svg';
import Link from 'next/link';

export default function TopJobs() {
  return (
    <Card>
      <h1 className="text-[19px] text-black font-semibold mb-6">Top Jobs</h1>
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <StarFilled className="!text-[#F0AC45] !text-base" />
          <p className="text-base font-medium">Front Development</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="bg-[#EDECEA] rounded-md px-2 py-1 flex items-center gap-1">
            <IconUser />
            <p className="text-sm font-medium">40 Application</p>
          </div>
          <Link className="text-sm font-semibold text-[#0071CB] hover:!opacity-75" href="#">
            See All
          </Link>
        </div>
      </Card>
    </Card>
  );
}
