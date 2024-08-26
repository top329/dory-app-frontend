"use client"
import { useState } from "react";

import { Avatar, Divider, Typography, Drawer } from "antd";
import { UserOutlined } from "@ant-design/icons";
import List from "@/assets/icons/list.svg";
import Setting from "@/assets/icons/setting_act.svg";
import Check from "@/assets/icons/check_act.svg";
import ListAct from "@/assets/icons/list_act.svg";
import Calendar from "@/assets/icons/calendar_act.svg";

import DetailCandidate from "@/components/candidate_detail/DetailCandidate";

const activity = [
  {
    avatar: (
      <div>
        <Setting />
        <div className="ml-[25px] -mt-[19px] absolute">
          <List />
        </div>
      </div>
    ),
    name: "System activity: Tasks added and assigned to Georges System activity: Tasks added and assigned to Georges System activity: Tasks added and assigned to Georges",
    content:
      "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    time: "7m",
  },
  {
    avatar: (
      <div>
        <Calendar />
        <div className="ml-[25px] -mt-[19px] absolute">
          <List />
        </div>
      </div>
    ),
    name: "System activity: Tasks added and assigned to Georges",
    content:
      "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    time: "7m",
  },
  {
    avatar: (
      <div>
        <Calendar />
        <div className="ml-[25px] -mt-[19px] absolute">
          <List />
        </div>
      </div>
    ),
    name: "System activity: Tasks added and assigned to Georges",
    content:
      "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    time: "7m",
  },
  {
    avatar: (
      <div>
        <Check />
        <div className="ml-[25px] -mt-[19px] absolute">
          <List />
        </div>
      </div>
    ),
    name: "System activity: Tasks added and assigned to Georges",
    content:
      "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    time: "7m",
  },
  {
    avatar: (
      <div>
        <ListAct />
        <div className="ml-[25px] -mt-[19px] absolute">
          <List />
        </div>
      </div>
    ),
    name: "System activity: Tasks added and assigned to Georges",
    content:
      "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    time: "7m",
  },
  {
    avatar: (
      <div>
        <Check />
        <div className="ml-[25px] -mt-[19px] absolute">
          <List />
        </div>
      </div>
    ),
    name: "System activity: Tasks added and assigned to Georges",
    content:
      "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    time: "7m",
  },
  {
    avatar: (
      <div>
        <Avatar icon={<UserOutlined />} size={40} />
        <div className="ml-[25px] -mt-[19px] absolute">
          <List />
        </div>
      </div>
    ),
    name: "System activity: Tasks added and assigned to Georges",
    content:
      "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    time: "7m",
  },
];

export default function Activity() {
  const [overview, setOverview] = useState<boolean>(false);
  const [candidateId, setCandidateId] = useState<number>(0);

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
    <div className="border-2 rounded-lg m-2 p-4">
      <p className="text-lg">17 July 2023</p>
      {activity.map((act, key) => (
        <div key={key}>
          <div className="flex items-center justify-between  my-2" onClick={()=>setOverview(true)}>
            <div className="flex gap-4 items-center">
              <div>{act.avatar}</div>
              <div>
                <p style={{fontSize: "18px"}} >{act.name}</p>
                <p className="two-lines">{act.content}</p>
              </div>
            </div>
            <p className="mr-2">{act.time}</p>
          </div>
          {key !== activity.length - 1 && <Divider />}
        </div>
      ))}
    </div>
      </>
  );
}
