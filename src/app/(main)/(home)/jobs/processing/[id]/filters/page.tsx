"use client";
import { useParams } from 'next/navigation';

import { Table } from '@/components';
import { useSelector } from '@/features/store';
import { CandidatesType } from '@/types/candidate';
import { Columns } from './Columns';
import { useGetFilterInfoQuery, useLazyGetFilterInfoQuery } from '@/features/projects';

export default function FiltersPage() {
  const param = useParams();
  const { filters } = useSelector(state => state.candidate);
  const [getFiltersInfoByPage, { isLoading: isGettingFiltersByPage }] = useLazyGetFilterInfoQuery();
  const { isLoading: isGettingFilter } = useGetFilterInfoQuery({
    jobId: Number(param?.id),
    pageNumber: 1,
    pageSize: 10,
    sortDirect: 1,
    sortItem: '',
  });

  const handleChangePage = async (page: number) => {
    await getFiltersInfoByPage({
      jobId: Number(param?.id),
      pageNumber: page,
      pageSize: 10,
      sortDirect: 1,
      sortItem: '',
    });
  };

  return (
    <div className="border border-[#f0f0f0] rounded-lg">
      <Table
        data={filters?.list as CandidatesType[]}
        columns={Columns}
        loading={isGettingFilter ? isGettingFilter : isGettingFiltersByPage}
        rowKey={(rs: CandidatesType) => rs.candidateId as number}
        currentPage={filters?.selectPageNumber as number}
        totalCnt={filters?.totalCnt as number}
        pageSize={10}
        pagination={{
          pageSize: 10,
          total: filters?.totalCnt,
          current: filters?.selectPageNumber,
          onChange: (page: number) => handleChangePage(page),
        }}
      />
    </div>
  );
}
