"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Row, Col, Card, Button, Drawer } from "antd";

import Statistic from "./Statistic";
import DetailCandidate from "@/components/candidate_detail/DetailCandidate";
import Candidates from "./Candidates";
import TopJobs from "./TopJobs";

import { useAuth } from "@/components";
import { useGetDashboardDataQuery } from "@/features/projects";

import { PlusOutlined } from "@ant-design/icons";

export default function OverviewPage() {
  const router = useRouter();
  const { member } = useAuth();
  // const [getDashboardData] = useGetDashboardDataMutation();
  const [overview, setOverview] = useState<boolean>(true);
  const [candidateId, setCandidateId] = useState<number>(0);

  const { isLoading } = useGetDashboardDataQuery({
    userId: member?.userId as number,
    companyId: member?.companyId as number,
    pageNumber: 1,
    pageSize: 10,
    sortDirect: 1,
    sortItem: "",
  });

  return (
    <>
          <Drawer
        placement="right"
        open={overview}
        closable={false}
        onClose={() => setOverview(false)}
        width='85vw'
        bodyStyle={{ padding: "0" }}
      >
        <div className="w-full">
          <div>
            <DetailCandidate candidateId={candidateId}/>
          </div>
        </div>
      </Drawer>
      <div className="w-full bg-[#F9FAFB] p-6 min-h-full">
        <Row gutter={[20, 20]}>
          <Col span={17}>
            <Statistic isLoading={isLoading} />
          </Col>
          <Col span={7}>
            <Card className="!bg-[url('/star_bg.png')] !bg-no-repeat !bg-[100%,100%] !border-[#EAE7E6] !bg-[#726DFF]">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-semibold text-white leading-[30px] text-center mb-2">
                  Add new job positions
                  <br />
                  quickly and easily
                </h1>
                <h3 className="text-xs text-white mb-6">
                  Lorem ipsum is placeholder text commonly
                </h3>
                <Button
                  type="primary"
                  className="!bg-white !rounded-lg !h-10 !w-[250px] hover:!opacity-75"
                  onClick={() => router.push("/new_job/create")}
                >
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-base !text-[#050505] font-semibold">
                      Add New Job
                    </p>
                    <PlusOutlined className="!text-[#050505]" />
                  </div>
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={17}>
            <Candidates isLoading={isLoading} setOverView={setOverview} setCandidateId={setCandidateId} />
          </Col>
          <Col span={7}>
            <TopJobs />
          </Col>
        </Row>
      </div>
    </>
  );
}
