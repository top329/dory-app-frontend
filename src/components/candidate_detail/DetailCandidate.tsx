"use client";

import {
  Avatar,
  Button,
  Tabs,
  TabsProps,
  Dropdown,
  Input,
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { StarFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";

import Image from "next/image";
import Send from "@/assets/icons/send.svg";
import SendComment from "@/assets/icons/send_2.svg";
import ArrowUp from "@/assets/icons/arrow-up.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import Vector from "@/assets/icons/Vector.svg";
import firstScene from "@/assets/images/video.png";
import { Select } from "@/components";
import Evaluation from "./Evaluatoin";
import Activity from "./Activity";
import Overview from "./Overview";
import Email from "./Email";
import Task from "./Task";

export default function DetailCandidate({
  candidateId,
}: {
  candidateId: number;
}) {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <p className="text-base font-bold w-32 text-center">Overview</p>,
      children: <Overview />,
    },
    {
      key: "2",
      label: <p className="text-base font-bold w-32 text-center">Email</p>,
      children: <Email />,
    },
    {
      key: "3",
      label: <p className="text-base font-bold w-32 text-center">Evaluation</p>,
      children: <Evaluation />,
    },
    {
      key: "4",
      label: <p className="text-base font-bold w-32 text-center">Activity</p>,
      children: <Activity />,
    },
    {
      key: "5",
      label: <p className="text-base font-bold w-32 text-center">Task</p>,
      children: <Task />,
    },
  ];

  const dropItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} size={24} />
          <p className="m-1.5">Phoenix Baker</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} size={24} />
          <p className="m-1.5">Michael Orlando</p>
        </div>
      ),
    },
  ];

  const images = [
    { src: firstScene, text: "1" },
    { src: firstScene, text: "2" },
    { src: firstScene, text: "3" },
  ];

  const comments = [
    {
      avatar: <Avatar size={28} icon={<UserOutlined />} />,
      name: "Aliando Syarief",
      date: "5 Days",
      rank: (
        <div className="flex">
          <StarFilled className="!text-[#FAC818] text-xs mx-2" /> <p>4.5</p>
        </div>
      ),
      comment:
        "Lorem ipsum is ceholder text commonly used in the graphic, print, and publishing industriesLorem ipsum is ceholder text commonly used in the graphic, print, and publishing industries",
    },
    {
      avatar: <Avatar size={28} icon={<UserOutlined />} />,
      name: "Aliando Syarief",
      date: "5 Days",
      rank: (
        <div className="flex">
          <StarFilled className="!text-[#FAC818] text-xs mx-2" /> <p>4.5</p>
        </div>
      ),
      comment:
        "Lorem ipsum is ceholder text commonly used in the graphic, print, and publishing industriesLorem ipsum is ceholder text commonly used in the graphic, print, and publishing industries",
    },
    {
      avatar: <Avatar size={28} icon={<UserOutlined />} />,
      name: "Aliando Syarief",
      date: "5 Days",
      rank: (
        <div className="flex">
          <StarFilled className="!text-[#FAC818] text-xs mx-2" /> <p>4.5</p>
        </div>
      ),
      comment:
        "Lorem ipsum is ceholder text commonly used in the graphic, print, and publishing industriesLorem ipsum is ceholder text commonly used in the graphic, print, and publishing industries",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-0 min-w-[1280px]">
      <style jsx global>
        {`
          .ant-tabs-top > .ant-tabs-nav {
            margin-bottom: 0px !important;
          }
        `}
      </style>
      <div className="h-full border-r pt-6">
        <div className="flex justify-between px-4">
          <div className="flex items-center gap-3">
            <Avatar size={56} icon={<UserOutlined />} />
            <div>
              <p className="font-semibold text-2xl">{candidateId}</p>
              <p className="text-gray-400 text-sm">Candidate apply july 07 2023</p>
            </div>
          </div>
          <div className="mt-8">
            <Button className="h-[33px] !px-3.5">
              <p className="text-sm">Follow Candidate</p>
            </Button>
          </div>
        </div>
        <div className="flex items-center ml-[86px]">
          <StarFilled className="!text-[#FAC818] !text-base" />
          <StarFilled className="!text-[#FAC818] !text-base" />
          <StarFilled className="!text-[#FAC818] !text-base" />
          <StarFilled className="!text-[#FAC818] !text-base" />
          <StarFilled className="!text-[#d1c9c9] !text-base" />
          <p className="mx-2.5 text-sm">4.0</p>
          <Divider type="vertical" className="!h-5 !mx-0"/>
            <Dropdown menu={{ items: dropItems }} placement="bottomLeft" arrow className="mx-2.5">
              <Button type="link" className="!px-0">
                <p className="text-sm text-black">Details</p>
              </Button>
            </Dropdown>
        </div>
        <Tabs centered defaultActiveKey="1" items={items} />
      </div>
      <div className="h-full border-l">
        <div className="flex justify-between items-center px-4 py-6">
          <p className="text-xl font-semibold">Senior Product Designer</p>
          <div className="flex items-center gap-2">
            <Select
              placeholder="Phone Screen"
              className="border rounded-lg !w-[142px] h-9"
              options={[
                { value: "1", label: "Phone Screen" },
                { value: "2", label: "Interview" },
                { value: "3", label: "Evaluation" },
                { value: "4", label: "Offer" },
              ]}
            />
            <Button type="link" className="!p-0">
              <Send />
            </Button>
            <Button type="link" className="!p-0">
              <Vector />
            </Button>
          </div>
        </div>
        <Divider className="!mt-0"/>
        <div className="px-4">
          <video
            className="object-cover display rounded-3xl w-full h-full"
            controls
          ></video>
          <div className="flex gap-2 pt-2 pb-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  className="object-cover h-16 w-[110px] rounded-lg"
                  alt=""
                  src={image.src}
                  priority={true}
                />
                <p className="absolute top-0 left-0 pl-2 pt-10 text-white text-xs font-semibold">
                  {image.text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xl font-semibold py-4">Comment</p>
          <div>
            {comments.map((comment, key) => (
              <div key={key}>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {comment.avatar}
                    <div className="px-2">
                      <p className="font-medium text-base">{comment.name}</p>
                      <p className="text-gray-400 text-xs">{comment.date}</p>
                    </div>
                  </div>
                  <div className="mt-3 mr-2">{comment.rank}</div>
                </div>
                <p className="ml-[38px] text-sm">{comment.comment}</p>
                {key !== comments.length - 1 && <Divider className="!my-2" />}
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 sendComment">
            <Input
              className="text-base w-full"
              suffix={
                <Button type="link" className="!px-0">
                  <SendComment />
                </Button>
              }
              placeholder="Write comments"
            />
          </div>
        </div>
      </div>
      <div className="gap-2 absolute -left-10 bottom-1/2 flex flex-col">
        <Button
          className="!h-[30px] !w-[30px] !rounded-full !p-[7px]"
          onClick={() => {}}
        >
          <ArrowUp />
        </Button>
        <Button
          className="!h-[30px] !w-[30px] !rounded-full !p-[9px]"
          onClick={() => {}}
        >
          <ArrowDown />
        </Button>
      </div>
    </div>
  );
}
