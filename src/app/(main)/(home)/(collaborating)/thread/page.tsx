"use client";

import React, { ChangeEvent, useState } from "react";
import {
  Row,
  Col,
  Button,
  Typography,
  Input,
  Avatar,
  Badge,
  Popover,
  Radio,
  DatePicker,
  Checkbox,
} from "antd";

import {
  SearchOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import Filter from "@/assets/icons/filter.svg";
import Archive from "@/assets/icons/archive.svg";
import ConfirmChat from "@/assets/icons/conform_chat.svg";
import MidChat from "@/assets/icons/mid_chat.svg";
import NotificationChat from "@/assets/icons/notification_chat.svg";
import Read from "@/assets/icons/read.svg";
import Reply from "@/assets/icons/reply.svg";
import More from "@/assets/icons/dots-horizontal.svg";
import View from "@/assets/icons/view.svg";
import Attach from "@/assets/icons/chat_attach.svg";
import List from "@/assets/icons/chat_list.svg";
import Send from "@/assets/icons/chat_send.svg";
import Trash from "@/assets/icons/trash.svg";

const { Title } = Typography;
type CandidateType = {
  id: string;
  name: string;
  description: string;
  status: string;
  date: string;
  stage: string;
};
type MessageType = {
  messageText: string;
};
const candidates = [
  {
    id: "adsfasdf",
    name: "Bruce Lee",
    description: "our project will be success, I am sure",
    status: "req",
    date: "29 Jul",
    stage: "Interview",
  },
  {
    id: "adsfasaadf",
    name: "Blare Pak",
    description: "our project will be success, I am sure",
    status: "done",
    date: "29 Jul",
    stage: "Evaluation",
  },
  {
    id: "adsfasdfasdfasfa",
    name: "Bruce Lee",
    description: "our project will be success, I am sure",
    status: "req",
    date: "29 Jul",
    stage: "Interview",
  },
  {
    id: "adsdf",
    name: "James Bond",
    description: "At the moment I saw you for the first time..",
    status: "mid",
    date: "29 Jul",
    stage: "Phone screen",
  },
  {
    id: "adqwereqw3sfasdf",
    name: "James Bond",
    description: "At the moment I saw you for the first time..",
    status: "mid",
    date: "29 Jul",
    stage: "Phone screen",
  },
  {
    id: "adsfabfbnsdf",
    name: "James Bond",
    description: "At the moment I saw you for the first time..",
    status: "mid",
    date: "29 Jul",
    stage: "Interview",
  },
  {
    id: "adsvvvvfasdf",
    name: "James Bond",
    description: "At the moment I saw you for the first time..",
    status: "mid",
    date: "29 Jul",
    stage: "Evaluation",
  },
  {
    id: "adsfa32111sdf",
    name: "James Bond",
    description: "At the moment I saw you for the first time..",
    status: "mid",
    date: "29 Jul",
    stage: "Interview",
  },
  {
    id: "12erfvadsfasdf",
    name: "James Bond",
    description: "At the moment I saw you for the first time..",
    status: "mid",
    date: "29 Jul",
    stage: "Phone screen",
  },
  {
    id: "adsfasdfffde23",
    name: "James Bond",
    description: "At the moment I saw you for the first time..",
    status: "mid",
    date: "29 Jul",
    stage: "Evaluation",
  },
];

export default function Thread() {
  const [id, setId] = useState<string>("id");
  const [message, setMessage] = useState("Hi");

  const sendMessage = () => {
    setMessage(message);
  };

  const _renderCandidate = (data: CandidateType) => (
    <div
      onClick={() => setId(data.id)}
      className={`border-gray-100 border-b box-border px-3 gap-4 py-2 flex ${
        data.id === id && "bg-[#F8F8F8]"
      }`}
    >
      <Col>
        <Avatar icon={<UserOutlined />} className="mt-2" />
      </Col>
      <Col flex="auto">
        <h3 className="text-md font-black">{data.name}</h3>
        <p className="leading-3 text-sm mt-1">{data.description}</p>
        <div className="gap-1 flex mt-2">
          <Archive />
          {data.stage === "Interview" && (
            <Badge count={data.stage} color="#FF7F62" />
          )}
          {data.stage === "Evaluation" && (
            <Badge
              count={data.stage}
              color="#CCE7FD"
              className="custom-badge"
            />
          )}
          {data.stage === "Phone screen" && (
            <Badge count={data.stage} color="#726DFF" />
          )}
        </div>
      </Col>
      <Col flex="40px" className="flex items-end flex-col">
        <p className="text-sm">{data.date}</p>
        {data.status === "req" && (
          <Badge count={1} className="site-badge-count-109" />
        )}
        {data.status === "mid" && <ConfirmChat />}
        {data.status === "done" && <MidChat />}
      </Col>
    </div>
  );

  const _renderEditTask = () => (
    <div className="bg-white border rounded-xl">
      <div className="border-gray-200 border-b checkbox-round py-2 px-6 flex gap-3 items-center justify-between rounded-t-xl">
        <span className="text-lg font-sans font-bold">Edit Task</span>
        <div className="w-2/12 text-md font-sans flex justify-end">
          <Button.Group>
            <Button
            className="!rounded-l-2xl"
            >
              <Reply />
            </Button>
            <Button
            className="!rounded-r-2xl"
            >
              <More />
            </Button>
          </Button.Group>
        </div>
      </div>
      <div className="py-4 px-6 gap-3">
        <div className="flex gap-3">
          <Avatar icon={<UserOutlined />} />
          <div>
            <p className="text-md font-sans font-bold">Arhsan Pratama</p>
            <p>To Aliano Primy (abutcuman@gmail.com)</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="mt-2">
            Your application for the job search in Software Frontend developer
            is suearch in Software Frontend developer is suearch in Software
            Frontend developer is successfully submit.
          </p>
          <p className="mt-2">
            Your application for the job earch in Software Frontend developer is
            suearch in Software Frontend developer is suearch in Software
            Frontend developer is suSoftware Frontend developer is successfully
            submit.
          </p>
          <p className="mt-2">
            Your application for the job search in Software Frontendearch in
            Software Frontend developer is sueveloper is successfully submit.
          </p>
        </div>
      </div>
    </div>
  );

  const _renderDeadline = () => (
    <div className="border-gray-200 border rounded-xl mt-2">
      <div className="border-gray-200 border-b checkbox-round py-1 px-6 flex gap-3 items-center justify-between bg-[#EDEFF1] rounded-t-xl">
        <Checkbox className="inline-block">
          <span className="text-lg font-sans">Task name</span>
        </Checkbox>
        <div className="w-1/12 text-md font-sans mr-2">Deadline</div>
      </div>
      <div className="checkbox-round py-3 px-6 flex gap-3 items-center justify-between">
        <Checkbox className="inline-block">
          <span className="text-lg font-sans">
            Please Evaluate Bruce Lee with evaluate joints after the interview.
          </span>
        </Checkbox>
        <div className="w-1/12 text-md font-sans flex gap-2 mr-2">
          <ClockCircleOutlined />
          08/08/23
        </div>
      </div>
    </div>
  );
  const _sendMessage = ({ messageText }: MessageType) => (
    <div className="flex items-end font-sans mt-2 justify-end">
      <div className="rounded-xl bg-[#726DFF] p-3 message text-white w-[22vw]">
        <p>{messageText}</p>
        <p className="text-end text-xs">Now</p>
      </div>
      <div className="triangle_receive"></div>
      <div className="w-30">
        <Read />
      </div>
    </div>
  );
  const _reminderFrom = () => (
    <div className="border-gray-200 border rounded-xl mt-2">
      <div className="border-gray-200 border-b checkbox-round py-1 px-6 flex gap-3 items-center justify-between bg-[#EDEFF1] rounded-t-xl">
        <div className="flex items-center">
          <NotificationChat />
          <span className="text-lg font-sans mx-3">Task reminder from</span>
          <Avatar icon={<UserOutlined />} size={22} />
        </div>
        <div className="w-1/12 text-md font-sans mr-2">Deadline</div>
      </div>
      <div className="checkbox-round py-3 px-6 flex gap-3 items-center justify-between">
        <Checkbox className="inline-block">
          <span className="text-lg font-sans">
            Please Evaluate Bruce Lee with evaluate joints after the interview.
          </span>
        </Checkbox>
        <div className="w-1/12 text-md font-sans flex gap-2 mr-2">
          <ClockCircleOutlined />
          08/08/23
        </div>
      </div>
    </div>
  );
  return (
    <div className="p-6">
      <Row className="border-gray-100 border-2 rounded-lg w-full h-[88vh] flex">
        <Col sm={8} className="pt-8">
          <div className="flex justify-between px-5">
            <Title level={3}>Thread</Title>
            <Popover
              content={
                <div className="w-[400px]">
                  <p
                    className="py-2 px-5 border-b border-gray-200 text-lg -m-3"
                  >
                    Filters
                  </p>
                  <div className="p-2 border-b border-gray-200 flex gap-5">
                    <div className="w-4/12">Chat by</div>
                    <div className="w-8/12 flex gap-3">
                      <Radio.Group>
                        <Radio value={1}>&nbsp;&nbsp;Read Text</Radio>
                        <Radio value={2}>&nbsp;&nbsp;Unread Text</Radio>
                      </Radio.Group>
                    </div>
                  </div>
                  <div className="p-2 border-b border-gray-200 items-center flex gap-5">
                    <div className="w-4/12">Job Opening</div>
                    <div className="w-8/12 flex gap-3">
                      <DatePicker className="w-full" />
                    </div>
                  </div>
                  <div className="p-2 border-b border-gray-200 flex items-center gap-5">
                    <div className="w-4/12">Date</div>
                    <div className="w-8/12 flex gap-3">
                      <DatePicker className="w-full" />
                    </div>
                  </div>
                  <div className="p-2 flex items-center gap-5">
                    <div className="w-4/12">Stage</div>
                    <div className="w-8/12 flex gap-3">
                      <Input className="w-full" />
                    </div>
                  </div>
                  <div
                    className="pt-3 pb-2 px-2 border-t border-gray-200 text-lg flex justify-between -mx-3"
                  >
                    <Button type="link">
                      <div className="flex items-center">
                        <Trash />
                        <p className="text-[#B42318] text-sm">Clear Filter</p>
                      </div>
                    </Button>
                    <div className="flex justify-end gap-2">
                      <Button>Cancel</Button>
                      <Button type="primary">Apply Filter</Button>
                    </div>
                  </div>
                </div>
              }
              placement="bottomLeft"
              trigger="hover"
              arrow={false}
            >
              <Button type="link">
                <Filter />
              </Button>
            </Popover>
          </div>
          <div className="px-5">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search candidate..."
              className="!h-10"
            />
          </div>
          <div className="pt-4 h-[75vh] overflow-y-auto">
            {candidates.map((item) => _renderCandidate(item))}
          </div>
        </Col>
        <Col sm={16}>
          <div className="border-gray-100 border-b py-6 px-3 flex justify-between">
            <div className="w-8/12 flex gap-3">
              <Avatar size="large" icon={<UserOutlined />} />
              <div>
                <p className="font-sans text-md">
                  Bruce Lee{" "}
                  <Badge
                    count="Evaluation"
                    color="#CCE7FD"
                    className="custom-badge"
                  />
                </p>
                <p>Senior Frontend Engineer</p>
              </div>
            </div>
            <div className="w-4/12 flex justify-end items-center gap-3 text-md font-semibold">
              View Candidate Details
              <View />
            </div>
          </div>
          <div className="h-[71vh] border-gray-100 border-b p-4 overflow-y-auto">
            {_renderEditTask()}
            {_renderDeadline()}
            {_reminderFrom()}
            <div className="flex items-end font-sans mt-2">
              <div className="w-30">
                <Avatar icon={<UserOutlined />} size={30} />
              </div>
              <div className="triangle_send"></div>
              <div className="rounded-xl bg-white p-3 message w-[22vw]">
                <p>Bruce Lee</p>
                <p className="break-words">
                  Here come with your specification of Backend Development
                  Skills
                </p>
                <p className="text-end text-xs">Now</p>
              </div>
            </div>
            <_sendMessage messageText="Here come with your specification of Backend Development Skills..." />
            <div className="flex items-end font-sans mt-2">
              <div className="w-30">
                <Avatar icon={<UserOutlined />} size={30} />
              </div>
              <div className="triangle_send"></div>
              <div className="rounded-xl bg-white p-3 message w-[22vw]">
                <p>Bruce Lee</p>
                <p className="break-words">
                  Here come with your specification of Backend Development
                  Skills
                </p>
                <p className="text-end text-xs">Now</p>
              </div>
            </div>
            <_sendMessage messageText="Here come with your specification of Backend Development Skills..." />
            <_sendMessage messageText={message} />

          </div>
          <div className="px-3 pt-2.5 flex gap-2 items-center">
            <List />
            <Attach />
            <Input
              className="rounded-2xl !p-2 inline-block"
              placeholder="Type message..."
            />
            <Button type="link" className="!p-0 !h-10" onClick={sendMessage}>
              <Send />
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
