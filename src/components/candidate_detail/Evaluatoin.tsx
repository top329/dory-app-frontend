import { Button, Avatar, Radio, Divider, Popover, Select } from "antd";
import React, { useState } from "react";
import { useSelector } from "@/features/store";
import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { UserOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import TextArea from "antd/es/input/TextArea";

import ThumbUp from "@/assets/icons/thumbs-up.svg";
import Trash from "@/assets/icons/trash.svg";
import Dropdown from "@/assets/icons/dorpDown.svg";
import Edit from "@/assets/icons/edit_fill.svg";
import Someones from "@/assets/icons/someones.svg";
import ArrowLeft from "@/assets/icons/arrow_left.svg";
import NoEmoji from "@/assets/icons/no.svg";
import StrongEmoji from "@/assets/icons/strong.svg";
import MaybeEmoji from "@/assets/icons/maybe.svg";
import GoodEmoji from "@/assets/icons/good.svg";
import ExcellentEmoji from "@/assets/icons/yes.svg";
import Start from "@/assets/icons/play.svg";
import Dot from "@/assets/icons/center_dot.svg";
import WhiteStrongNo from "@/assets/icons/white_strongno.svg";
import WhiteNo from "@/assets/icons/white_no.svg";
import WhiteMaybe from "@/assets/icons/white_maybe.svg";
import WhiteYes from "@/assets/icons/white_yes.svg";
import WhiteStrongYes from "@/assets/icons/white_strongyes.svg";

const teamData = [
  {
    avatar: <UserOutlined />,
    name: "Olivia Rhye",
    job: "Senior product designer",
    request: "Ahsan Pratama",
    time: "2022/1/2 23:23",
  },
  {
    avatar: <UserOutlined />,
    name: "Olivia Rhye",
    job: "Senior product designer",
    request: "Ahsan Pratama",
    time: "now",
  },
];

export default function Evaluation() {
  const [evaluationKind, setEvaluationKind] = useState<string>("Completed");
  const [statusEvaluation, setStatusEvaluation] = useState(true);

  const handleChangeEvaluationsKind = (value: SegmentedValue) => {
    setEvaluationKind(value.toString());
    setStatusEvaluation(!statusEvaluation);
  };

  const [fill, setFill] = useState(0);

  const fillFrom = () => {
    setFill(1);
  };
  const [formTemplate, setFormTemplate] = useState(false);

  const openForm = () => {
    setFormTemplate(true);
  };
  if (formTemplate) {
    return <EvaluationForm />;
  }

  function FillForm() {
    return (
      <div>
        <Button
          type="link"
          onClick={() => setFill(0)}
          className="text-[#111111] !p-0 !mt-[-5px]"
        >
          <div className="flex items-center mr-56 text-black">
            <ArrowLeft />
            <p className="mx-2 text-sm">Fill out evaluation form</p>
          </div>
        </Button>
        <p className="text-base">Select Evaluation Form</p>
        <Select
          placeholder="Select evaluation form"
          size="large"
          options={[
            { value: "1", label: "Senior Front Designer" },
            { value: "2", label: "Senior Product Engineer" },
          ]}
          className="border !border-[#EAE7E6] rounded-lg items-center !my-1 !w-full"
        />
        <Button
          type="primary"
          className="items-center mt-[15px] !h-[33px] w-full"
          onClick={openForm}
        >
          <p className="text-sm font-semibold">Open form</p>
        </Button>
      </div>
    );
  }

  function AskSomeone() {
    return (
      <div>
        <Button
          type="link"
          onClick={() => setFill(0)}
          className="text-[#111111] !p-0 !mt-[-5px]"
        >
          <div className="flex items-center mr-40 text-black">
            <ArrowLeft />
            <p className="mx-2 text-sm">Ask someone to fill evaluation form</p>
          </div>
        </Button>
        <p className="text-base">Team member</p>
        <Select
          mode="multiple"
          placeholder="Select evaluation form"
          size="large"
          className="border !border-[#EAE7E6] !text-base rounded-lg items-center !my-1 !w-full"
          options={[
            {
              value: "1",
              label: (
                <div className="flex items-center">
                  <Avatar icon={<UserOutlined />} size={16} />
                  <p>Olivia</p>
                </div>
              ),
            },
            {
              value: "2",
              label: (
                <div className="flex items-center">
                  <Avatar icon={<UserOutlined />} size={16} />
                  <p>Phoenix</p>
                </div>
              ),
            },
          ]}
        />
        <p className="text-base my-1">Select Evaluation Form</p>
        <Select
          placeholder="Select evaluation form"
          size="large"
          className="border !border-[#EAE7E6] rounded-lg items-center !w-full"
          options={[
            { value: "1", label: "Senior Front Designer" },
            { value: "2", label: "Senior Product Engineer" },
          ]}
        />
        <Button
          type="primary"
          className="items-center w-full !mt-4 !h-[33px]"
          onClick={openForm}
        >
          <p className="text-sm font-semibold">Open form</p>
        </Button>
      </div>
    );
  }

  function Content() {
    return (
      <div>
        <Button
          type="link"
          className="!h-[60px] !text-black !p-0 !mt-[-9px] !text-left"
          onClick={fillFrom}
        >
          <div className="flex items-center">
            <Edit />
            <div className="mx-3">
              <p className="text-base">Fill evaluation form</p>
              <p className="text-gray-400 text-sm">
                Lorem ipsum is placeholder text
              </p>
            </div>
          </div>
        </Button>
        <Divider className="!my-2 !p-0" />
        <Button
          type="link"
          className="!h-[60px] !text-black !p-0 !text-left"
          onClick={() => setFill(2)}
        >
          <div className="flex items-center">
            <Someones />
            <div className="mx-3">
              <p className="text-base">Ask someone to fill</p>
              <p className="text-gray-400 text-sm">
                Lorem ipsum is placeholder text
              </p>
            </div>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="py-6 px-4 w-full">
        <div className="flex justify-between">
          <div className="flex item-center justify-between h-10 mb-[20px]">
            <Segmented
              className="!rounded-full !bg-[#EDECEA] !border !border-[#EDEFF1] !h-[42px] !p-[3px]"
              value={evaluationKind}
              options={[
                {
                  label: (
                    <div className="h-[34px] w-[150px] flex items-center justify-center gap-[10px]">
                      <p className="text-base font-medium">Completed</p>
                      <div className="w-[30px] h-5 bg-[#EDECEA] rounded-md flex items-center justify-center">
                        <p className="text-sm text-[#344054] font-medium">1</p>
                      </div>
                    </div>
                  ),
                  value: "Completed",
                },
                {
                  label: (
                    <div className="h-[34px] w-[150px] flex items-center justify-center gap-[10px]">
                      <p className="text-base font-medium">Pending</p>
                      <div className="w-[30px] h-5 bg-[#EDECEA] rounded-md flex items-center justify-center">
                        <p className="text-sm text-[#344054] font-medium">2</p>
                      </div>
                    </div>
                  ),
                  value: "Pending",
                },
              ]}
              onChange={handleChangeEvaluationsKind}
            />
          </div>
          <Popover
            placement="bottomRight"
            content={() => {
              switch (fill) {
                case 0:
                  return <Content />;
                case 1:
                  return <FillForm />;
                case 2:
                  return <AskSomeone />;
                default:
                  return <Content />;
              }
            }}
            trigger="click"
          >
            <Button className="!h-[36px] mt-1">
              <div className="flex items-center">
                <p className="mx-2 text-sm">Evaluation with form</p>
                <Dropdown />
              </div>
            </Button>
          </Popover>
        </div>

        {statusEvaluation ? <CompletedEvaluation /> : <PendingEvaluation />}
      </div>
    </>
  );
}

export function EvaluationForm() {
  const [firstButtonEmoji, setFirstButtonEmoji] = useState(true);
  const [secondButtonEmoji, setSecondButtonEmoji] = useState(true);
  const [thirdButtonEmoji, setThirdButtonEmoji] = useState(true);
  const [fourthButtonEmoji, setFourthButtonEmoji] = useState(true);
  const [fifthButtonEmoji, setFifthButtonEmoji] = useState(true);



  const [valueCuriosity, setCuriosityValue] = useState(1);
  const [valueEager, setEagerValue] = useState(1);
  const [valueFocus, setFocusValue] = useState(1);
  const [valueChallenge, setChallengeValue] = useState(1);
  const [valueTechnology, setTechnologyValue] = useState(1);

  const onChangeCuriosity = (e: RadioChangeEvent) => {
    setCuriosityValue(e.target.value);
  };
  const onChangeEager = (e: RadioChangeEvent) => {
    setEagerValue(e.target.value);
  };
  const onChangeFocus = (e: RadioChangeEvent) => {
    setFocusValue(e.target.value);
  };
  const onChangeChallenge = (e: RadioChangeEvent) => {
    setChallengeValue(e.target.value);
  };
  const onChangeTechnology = (e: RadioChangeEvent) => {
    setTechnologyValue(e.target.value);
  };

  const [evaluate, setEvaluation] = useState(false);
  const backEvaluation = () => {
    setEvaluation(true);
  };
  if (evaluate) {
    return <Evaluation />;
  }

  return (
    <div className="px-4">
      <div className="grid gap-4 mt-2">
        <p className="text-base">Would you hire this candidate?</p>
        <div className="flex justify-between">
          <Button
            className={`!flex items-center !justify-center gap-2 !w-[7.5vw] !h-9 ${
              firstButtonEmoji
                ? "!bg-white !text-black"
                : "!bg-blue-500 !text-white"
            }`}
            onClick={() => {
              setFirstButtonEmoji(!firstButtonEmoji);
              setSecondButtonEmoji(firstButtonEmoji);
              setThirdButtonEmoji(firstButtonEmoji);
              setFourthButtonEmoji(firstButtonEmoji);
              setFifthButtonEmoji(firstButtonEmoji);

            }}
          >
            <p className="text-sm font-semibold">Strong no</p>
            {firstButtonEmoji ? <StrongEmoji /> : <WhiteStrongNo />}
          </Button>
          <Button
            className={`!flex items-center !justify-center gap-2 !w-[7.5vw] !h-9 ${
              secondButtonEmoji
                ? "!bg-white !text-black"
                : "!bg-blue-500 !text-white"
            }`}
            onClick={() => {
              setFirstButtonEmoji(secondButtonEmoji);
              setSecondButtonEmoji(!secondButtonEmoji);
              setThirdButtonEmoji(secondButtonEmoji);
              setFourthButtonEmoji(secondButtonEmoji);
              setFifthButtonEmoji(secondButtonEmoji);
            }}
          >
            <p className="text-sm font-semibold">No</p>
            {secondButtonEmoji ? <NoEmoji /> : <WhiteNo />}
          </Button>
          <Button
            className={`!flex items-center !justify-center gap-2 !w-[7.5vw] !h-9 ${
              thirdButtonEmoji
                ? "!bg-white !text-black"
                : "!bg-blue-500 !text-white"
            }`}
            onClick={() => {
              setFirstButtonEmoji(thirdButtonEmoji);
              setSecondButtonEmoji(thirdButtonEmoji);
              setThirdButtonEmoji(!thirdButtonEmoji);
              setFourthButtonEmoji(thirdButtonEmoji);
              setFifthButtonEmoji(thirdButtonEmoji);
            }}
          >
            <p className="text-sm font-semibold">Maybe</p>
            {thirdButtonEmoji ? <MaybeEmoji /> : <WhiteMaybe />}
          </Button>
          <Button
            className={`!flex items-center !justify-center gap-2 !w-[7.5vw] !h-9 ${
              fourthButtonEmoji
                ? "!bg-white !text-black"
                : "!bg-blue-500 !text-white"
            }`}
            onClick={() => {
              setFirstButtonEmoji(fourthButtonEmoji);
              setSecondButtonEmoji(fourthButtonEmoji);
              setThirdButtonEmoji(fourthButtonEmoji);
              setFourthButtonEmoji(!fourthButtonEmoji);
              setFifthButtonEmoji(fourthButtonEmoji);
            }}
          >
            <p className="text-sm font-semibold">Yes</p>
            {fourthButtonEmoji ? <GoodEmoji /> : <WhiteYes />}
          </Button>
          <Button
            className={`!flex items-center !justify-center gap-2 !w-[7.5vw] !h-9 ${
              fifthButtonEmoji
                ? "!bg-white !text-black"
                : "!bg-blue-500 !text-white"
            }`}
            onClick={() => {
              setFirstButtonEmoji(fifthButtonEmoji);
              setSecondButtonEmoji(fifthButtonEmoji);
              setThirdButtonEmoji(fifthButtonEmoji);
              setFourthButtonEmoji(fifthButtonEmoji);
              setFifthButtonEmoji(!fifthButtonEmoji);
            }}
          >
            <p className="text-sm font-semibold">Strong yes</p>
            {fifthButtonEmoji ? <ExcellentEmoji /> : <WhiteStrongYes />}
          </Button>
        </div>
        <Divider className="!mt-2 !mb-1" />
        <Button type="link" onClick={backEvaluation} className="!mb-2">
          <div className="flex items-center">
            <ArrowLeft />
            <p className="text-xl font-medium text-black mx-4">
              Senior Product Designer Evaluation
            </p>
          </div>
        </Button>
        <div className="border rounded-lg p-5">
          <p className="text-base font-medium">
            Describe a situation where you faced serious challenges in doing
            your job efficiently. What were the challenges, and how did you
            overcome them?<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
          </p>
          <div>
            <p className="mt-4 text-base">Answer</p>
            <TextArea
              placeholder="Fill answer here"
              autoSize={{ minRows: 5, maxRows: 7 }}
              className="!text-base !px-3.5 !py-3"
            ></TextArea>
          </div>
        </div>
        <div className="border rounded-lg p-5">
          <p className="text-base">
            Describe a situation where you faced serious challenges in doing
            your job efficiently. What were the challenges, and how did you
            overcome them? <span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
          </p>
          <div>
            <p className="text-base mt-4">Answer</p>
            <TextArea
              placeholder="Fill answer here"
              autoSize={{ minRows: 5, maxRows: 7 }}
              className="!text-base !px-3.5 !py-3"
            ></TextArea>
          </div>
        </div>
        <div className="border rounded-lg p-5">
          <p className="text-base">
            Tell me about a team project when you had to work with someone
            difficult.<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
          </p>
          <div>
            <p className="mt-4 text-base">Answer</p>
            <TextArea
              placeholder="Fill answer here"
              autoSize={{ minRows: 5, maxRows: 7 }}
              className="!text-base  !px-3.5 !py-3"
            ></TextArea>
          </div>
        </div>
        <div className="border rounded-lg p-5">
          <p className="text-base">
            What interests you most about this position?{" "}
            <span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
          </p>
          <div>
            <p className="mt-4 text-base">Answer</p>
            <TextArea
              placeholder="Fill answer here"
              autoSize={{ minRows: 5, maxRows: 7 }}
              className="!text-base"
            ></TextArea>
          </div>
        </div>
        <div className="border rounded-lg p-5 mb-4">
          <p className="text-base">
            Scorecard <span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
          </p>
          <Divider className="!my-3" />
          <div className="border rounded-lg p-4">
            <div className="flex justify-between border-b pb-2">
              <p className="text-base">Curiosity</p>
              <div>
                <Radio.Group
                  onChange={onChangeCuriosity}
                  value={valueCuriosity}
                >
                  <Radio value={1}>
                    <p className="text-xs">1</p>
                  </Radio>
                  <Radio value={2}>
                    <p className="text-xs">2</p>
                  </Radio>
                  <Radio value={3}>
                    <p className="text-xs">3</p>
                  </Radio>
                  <Radio value={4}>
                    <p className="text-xs">4</p>
                  </Radio>
                  <Radio value={5}>
                    <p className="text-xs">5</p>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="flex justify-between border-b py-2">
              <p className="text-base">Eager to perform</p>
              <div>
                <Radio.Group onChange={onChangeEager} value={valueEager}>
                  <Radio value={1}>
                    <p className="text-xs">1</p>
                  </Radio>
                  <Radio value={2}>
                    <p className="text-xs">2</p>
                  </Radio>
                  <Radio value={3}>
                    <p className="text-xs">3</p>
                  </Radio>
                  <Radio value={4}>
                    <p className="text-xs">4</p>
                  </Radio>
                  <Radio value={5}>
                    <p className="text-xs">5</p>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="flex justify-between border-b py-2">
              <p className="text-base">Focus on career</p>
              <div>
                <Radio.Group onChange={onChangeFocus} value={valueFocus}>
                  <Radio value={1}>
                    <p className="text-xs">1</p>
                  </Radio>
                  <Radio value={2}>
                    <p className="text-xs">2</p>
                  </Radio>
                  <Radio value={3}>
                    <p className="text-xs">3</p>
                  </Radio>
                  <Radio value={4}>
                    <p className="text-xs">4</p>
                  </Radio>
                  <Radio value={5}>
                    <p className="text-xs">5</p>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="flex justify-between border-b py-2">
              <p className="text-base">Looking for challenge</p>
              <div>
                <Radio.Group
                  onChange={onChangeChallenge}
                  value={valueChallenge}
                >
                  <Radio value={1}>
                    <p className="text-xs">1</p>
                  </Radio>
                  <Radio value={2}>
                    <p className="text-xs">2</p>
                  </Radio>
                  <Radio value={3}>
                    <p className="text-xs">3</p>
                  </Radio>
                  <Radio value={4}>
                    <p className="text-xs">4</p>
                  </Radio>
                  <Radio value={5}>
                    <p className="text-xs">5</p>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <p className="text-base">Technology knowledge</p>
              <div>
                <Radio.Group
                  onChange={onChangeTechnology}
                  value={valueTechnology}
                >
                  <Radio value={1}>
                    <p className="text-xs">1</p>
                  </Radio>
                  <Radio value={2}>
                    <p className="text-xs">2</p>
                  </Radio>
                  <Radio value={3}>
                    <p className="text-xs">3</p>
                  </Radio>
                  <Radio value={4}>
                    <p className="text-xs">4</p>
                  </Radio>
                  <Radio value={5}>
                    <p className="text-xs">5</p>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function PendingEvaluation() {
  return (
    <div>
      {teamData.map((data, key) => (
        <div key={key} className="border rounded-lg p-4 pr-0 mb-2 h-[72px]">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-4">
              <Avatar icon={data.avatar} size={40}></Avatar>
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <p className="text-base mr-2">{data.name}</p>
                  <Dot />
                  <p className="text-sm text-[#666666] mx-2">{data.job}</p>
                </div>
                <p className="text-xs text-[#666]">
                  Requested by {data.request} {data.time}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <Button className="!flex !justify-end !items-center !h-9">
                <Start />
                <p className="mx-1 text-sm">Start</p>
              </Button>
              <Button type="link">
                <Trash />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CompletedEvaluation() {
  return (
    <div className="border rounded-xl p-4">
      <div className="flex items-center justify-between border-b border-solid pb-4">
        <div className="flex">
          <div className="flex items-center border-r border-solid pr-4">
            <ThumbUp />
            <span className="text-base pl-2">Strong</span>
          </div>
          <div className="flex flex-row items-center pl-4">
            <Avatar icon={<UserOutlined />} size={40} />
            <div className="flex flex-col pl-4">
              <p className="text-black text-base font-medium">Olivia Rachel</p>
              <p className="text-xs text-[#8C8C8C]">10 Days ago</p>
            </div>
          </div>
        </div>
        <Button type="link">
          <Trash />
        </Button>
      </div>
      <div className="border-b py-4">
        <p className="text-base font-medium">Summary</p>
        <p className="text-[#666666]">
          She is definitely the person we are looking for!
        </p>
      </div>
      <div className="border-b py-4">
        <p className="text-base font-medium">Tell us about yourself</p>
        <p className="text-[#666666]">
          Marketing enthusiast, social media meetups leader, personal blog owner
          - writing about making good content, getting experience since
          graduating from college.
        </p>
      </div>
      <div className="pt-4">
        <Button className="w-full !h-[37px]">
          <p className="text-sm">View More</p>
        </Button>
      </div>
    </div>
  );
}
