"use client";

import { useState } from "react";
import { useSelector } from "@/features/store";

import { Card } from "antd";
import { Table, useAuth } from "@/components";
import { Columns } from "./Columns";
import { useLazyGetDashboardDataQuery } from "@/features/projects";
import type { DashboardCandidateList } from "@/types/dashboard";
import IconUser from "@/assets/icons/users_1.svg";


export default function Candidates({
  setOverView,
  setCandidateId,
  isLoading,
}: {
  setOverView: any;
  setCandidateId: (id: number) => void;
  isLoading: boolean;
}) {

  const { candidateOverview } = useSelector((state) => state.detailCandidate)
  const { member } = useAuth();
  const { dashboard } = useSelector((state) => state.dashboard);
  const [getDashboardData, { isLoading: isGettingDashboard }] =
    useLazyGetDashboardDataQuery();

  const [activeTab, setActiveTab] = useState<string>("latest");

  const tabList = [
    {
      key: "latest",
      label: (
        <div className="flex items-center gap-2">
          <p className="text-base font-medium">Latest Candidates</p>
          <div className="flex items-center bg-[#EDECEA] rounded-md     gap-1 px-2 py-1">
            <IconUser />
            <p className="text-sm font-medium">
              {dashboard?.listInfo?.totalCnt} Candidate
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "most",
      label: <p className="text-base font-medium">Most Viewed Candidates</p>,
    },
  ];

  const handleChangePage = async (page: number) => {
    await getDashboardData({
      userId: Number(member?.userId),
      companyId: Number(member?.companyId),
      pageNumber: page,
      pageSize: 10,
      sortDirect: 1,
      sortItem: "",
    });
  };

  const contentList: Record<string, React.ReactNode> = {
    latest: (
      <>
        <Table
          data={dashboard?.listInfo.list as DashboardCandidateList[]}
          columns={Columns}
          rowKey={(rs: DashboardCandidateList) => rs.candidateId}
          loading={isLoading ? isLoading : isGettingDashboard}
          totalCnt={dashboard?.listInfo?.totalCnt as number}
          pageSize={10}
          currentPage={dashboard?.listInfo?.selectPageNumber as number}
          pagination={{
            current: dashboard?.listInfo?.selectPageNumber,
            pageSize: 10,
            total: dashboard?.listInfo?.totalCnt,
            onChange: (page: number) => handleChangePage(page),
          }}
          onRow={(record) => {
            return {
              onClick: async (event) => {
                // console.log({candidateId:record.candidateId});
                // await useGetCandidateOverviewQuery({candidateId:record.candidateId});
                // await getCandidateActivity({candidateId: record.candidateId});
                // // await getEvaluationComplete({jobId: record.jobId, candidateId: record.candidateId})
                setOverView(true);
                setCandidateId(record.candidateId);
                console.log(record);
              },
            };
          }}
        />
      </>
    ),
    most: <p>content2</p>,
  };

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <Card
      className="!border-[#EAE7E6]"
      tabList={tabList}
      onTabChange={onTabChange}
      bodyStyle={{ paddingTop: "1px", paddingLeft: 0, paddingRight: 0 }}
    >
      <div>{contentList[activeTab]}</div>
    </Card>
  );
}
