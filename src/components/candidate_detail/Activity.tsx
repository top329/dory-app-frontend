import { useSelector } from "@/features/store";
import { Avatar, Divider, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

import List from "@/assets/icons/list.svg";
import Setting from "@/assets/icons/setting_act.svg";
import Check from "@/assets/icons/check_act.svg";
import ListAct from "@/assets/icons/list_act.svg";
import Calendar from "@/assets/icons/calendar_act.svg";

type ActivityType = {
  date: string;
  contents: {
    kindId: number;
    actionKindId: number;
    occurKind: number;
    jobCandidateStatus: number;
    jobId: number;
    userName: string;
    candidateId: number;
    photoNormalUrl: string;
    photoThumbUrl: string;
    title: string;
    content: string;
    time: string;
  };
};

const { Paragraph } = Typography;

export default function Activity() {
  const activity = [
    {
      activityDate: "17 July 2023",
      contents: [
        {
          avatar: (
            <div>
              <Setting />
              <div className="absolute ml-[25px] -mt-[19px]">
                <List />
              </div>
            </div>
          ),
          name: "System activity: Tasks added and assigned to Georges System activity: Tasks added and assigned to Georges",
          content:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          time: "7m",
        },
        {
          avatar: (
            <div>
              <Calendar />
              <div className="absolute ml-[25px] -mt-[19px]">
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
              <Calendar />
              <div className="absolute ml-[25px] -mt-[19px]">
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
              <div className="absolute ml-[25px] -mt-[19px]">
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
              <div className="absolute ml-[25px] -mt-[19px]">
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
              <div className="absolute ml-[25px] -mt-[19px]">
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
              <div className="absolute ml-[25px] -mt-[19px]">
                <List />
              </div>
            </div>
          ),
          name: "System activity: Tasks added and assigned to Georges",
          content:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          time: "7m",
        },
      ],
    },
  ];
  return (
    <div className="px-4">
      {activity.map((act, key) => (
        <div key={key} className="border rounded-lg mt-6 p-4">
          <p className="text-base mb-4">{act.activityDate}</p>
          {act.contents.map((contents, subKey) => (
            <>
              <div
                key={`${key}-${subKey}`}
                className="w-full items-center gap-6 h-14"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="!w-[3vw]">{contents.avatar}</div>
                  <div className="items-center text-base !w-[33vw]">
                    <Paragraph
                      ellipsis
                      className="!overflow-hidden !text-base !mt-1 !mb-0.5 "
                    >
                      {contents.name}
                    </Paragraph>
                    <Paragraph
                      ellipsis
                      className="!overflow-hidden !text-sm !my-0.5 !text-[#666666]"
                    >
                      {contents.content}
                    </Paragraph>
                  </div>
                  <div className="!w-1/12 !ml-4">
                    <p className="text-sm">{contents.time}</p>
                  </div>
                </div>
              </div>
              {subKey !== act.contents.length - 1 && (
                <Divider className="!mx-[3px] !my-[7px]" />
              )}
            </>
          ))}
        </div>
      ))}
    </div>
  );
}
