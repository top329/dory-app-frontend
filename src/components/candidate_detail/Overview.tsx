import React from "react";
import { useSelector } from "@/features/store";
import { List, Button, Input } from "antd";
import { Select } from "@/components";

import Maximum from "@/assets/icons/maximize-01.svg";
import Edit from "@/assets/icons/edit-03.svg";
import More from "@/assets/icons/dots-horizontal.svg";
import Star from "@/assets/icons/star.svg";
import Single from "@/assets/icons/single.svg";
import Text from "@/assets/icons/Textarea.svg";
import Scale from "@/assets/icons/Scale.svg";
import Circle from "@/assets/icons/Yes_No.svg";
import Predefine from "@/assets/icons/Pre_defines.svg";
import Iframe from "react-iframe";

export default function Overview() {
  const data = [
    {
      title: "Email ",
      // description: useSelector(
      //   (state) => state.candidates.candidateOverview?.email
      // ),
    },
    {
      title: "Phone",
      // description: useSelector(
      //   (state) => state.candidates.candidateOverview?.phoneNumber
      // ),
    },
    {
      title: "Social ",
      // description: useSelector(
      //   (state) => state.candidates.candidateOverview?.socials
      // ),
    },
  ];
  const { TextArea } = Input;
  return (
    <div className="px-4">
      <div className="flex gap-3.5 pt-6 px-0">
        <a href="#info">
        <Button
          className="!h-[33px] !px-[14px]"
        >
          <p className="font-semibold">Contact Info</p>
        </Button>
        </a>
        <a href="#vitae">
        <Button className="!h-[33px] !px-[14px]">
          <p className="font-semibold">Curriculum Vitae</p>
        </Button>
        </a>
        <a href="#coverLetter">
        <Button className="!h-[33px] !px-[14px]">
          <p className="font-semibold">Cover Later</p>
        </Button>
        </a>
        <a href="#question">
        <Button className="!h-[33px] !px-[14px]">
          <p className="font-semibold">Questionnaire</p>
        </Button>
        </a>
      </div>
      <div id="info" className="my-4">
        <List
          size="large"
          bordered
          dataSource={data}
          className="!border-[#EAE7E6] !px-5 !py-1"
          renderItem={(item) => (
            <List.Item className="!px-0">
              <div className="flex">
                <p className="text-base">{item.title}</p>
                {/* <p className="mx-12 text-base">{item.description}</p> */}
              </div>
            </List.Item>
          )}
        />
      </div>
      <div id="vitae" className="border border-[#EAE7E6] rounded-lg p-4">
        <div className="flex justify-between">
          <p className="font-medium text-xl">Curriculum Vitae</p>
          <div>
            <Button.Group>
              <Button className="!w-11 !h-8 !items-center !px-[11px]">
                <Maximum />
              </Button>
              <Button className="!w-11 !h-8 !items-center !px-[11px]">
                <Edit />
              </Button>
              <Button className="!w-11 !h-8 !items-center !px-[11px]">
                <More />
              </Button>
            </Button.Group>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Iframe
            // url={useSelector(state => state.candidates.candidateOverview?.resumeFileUrl|| "defaultURL")}
            url="./Rafael.pdf"
            id="pdf-iframe"
            width="760px"
            height="700px"
            className="!rounded-t-xl border"
          />
        </div>
        <Button className="w-full !h-[37px] !rounded-lg !py-2 !px-4 !mt-4">
          <p className="text-sm font-semibold text-[#344054]">View More</p>
        </Button>
      </div>
      <div id="coverLetter" className="border border-[#EAE7E6] rounded-lg my-4 p-4">
        <div className="flex justify-between items-center">
          <p className="font-medium text-xl">Cover Later</p>
          <div>
            <Button.Group>
              <Button className="!w-11 !h-8 !items-center !px-[11px]">
                <Maximum />
              </Button>
              <Button className="!w-11 !h-8 !items-center !px-[11px]">
                <More />
              </Button>
            </Button.Group>
          </div>
        </div>
        <div>
          <p className="text-sm py-4">
            {/* {useSelector(
              (state) => state.candidates.candidateOverview?.coverLetter
            )} */}
            As a Senior Marketer with 12 years of experience, I believe that I
            am the ideal candidate for this position. I am a team player,
            goal-oriented, and open-minded. I look forward to hearing from you
            <br />
            <br />
            Sincerely,Serena K. Uppin
          </p>
          <Button className="w-full !h-[37px] !rounded-lg !py-2 !px-4">
            <p className="text-sm font-semibold text-[#344054]">View More</p>
          </Button>
        </div>
      </div>
      <div id="question" className="border border-[#EAE7E6] rounded-lg p-4 my-4">
        <p className="font-medium text-xl w-full">Questionnaire</p>
        <div className="mt-4">
          <div className="border-[1px] rounded-lg">
            <div className="flex justify-between text-center bg-[#F4F3F3] mt-4 h-10 p-4">
              <div className="flex items-center gap-2">
                <Single />
                <p className="font-semibold text-sm">Single Line</p>
              </div>
              <div className="flex items-center gap-2">
                <Star />
                <p className="bg-[#12B76A] rounded-md text-white text-xs h-4.5 w-[72px] text-center py-[1px]">
                  Answered
                </p>
              </div>
            </div>
            <div className="m-4">
              <p className="mb-2 text-base">Question</p>
              <Input
                className="h-[40px] !rounded-lg !text-base !py-2 !px-3"
                defaultValue="What are the top three things most important to you in a job?"
              />
              <p className="my-2 text-base">Answer</p>
              <Input
                className="h-[40px] !rounded-lg !text-base !py-2 !px-3"
                defaultValue="Lorem ipsum is placeholder text commonly used in the graphic"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="border-[1px] rounded-lg">
            <div className="flex justify-between text-center bg-[#F4F3F3] mt-4 h-10 p-4">
              <div className="flex items-center gap-2">
                <Text />
                <p className="font-semibold text-sm">Text area</p>
              </div>
              <div className="flex items-center gap-2">
                <Star />
                <p className="bg-[#12B76A] rounded-md text-white text-xs h-4.5 w-[72px] text-center py-[1px]">
                  Answered
                </p>
              </div>
            </div>
            <div className="m-4">
              <p className="mb-2 text-base">Question</p>
              <Input
                className="h-[40px] !rounded-lg !text-base !py-2 !px-3"
                defaultValue="What are the top three things most important to you in a job?"
              />
              <p className="my-2 text-base">Answer</p>
              <TextArea
                className="!rounded-lg !text-base !py-3 !px-3.5"
                defaultValue="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
                autoSize={{ minRows: 5, maxRows: 6 }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="border-[1px] rounded-lg">
            <div className="flex justify-between text-center bg-[#F4F3F3] mt-4 h-10 p-4">
              <div className="flex items-center gap-2">
                <Scale />
                <p className="font-semibold text-sm">Scale Answer</p>
              </div>
              <div className="flex items-center gap-2">
                <Star />
                <p className="bg-[#12B76A] rounded-md text-white text-xs h-4.5 w-[72px] text-center py-[1px]">
                  Answered
                </p>
              </div>
            </div>
            <div className="m-4">
              <p className="mb-2 text-base">Question</p>
              <Input
                className="h-[40px] !rounded-lg !text-base !py-2 !px-3"
                defaultValue="What are the top three things most important to you in a job?"
              />
              <p className="my-2 text-base">Answer</p>
              <Select
                placeholder="Neutral"
                className="w-full h-10 cursor-pointer text-base py-2"
                options={[
                  { value: "1", label: "Very Disagree" },
                  { value: "2", label: "Disagree" },
                  { value: "3", label: "Neutral" },
                  { value: "4", label: "Agree" },
                  { value: "5", label: "Very Agree" },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="border-[1px] rounded-lg">
            <div className="flex justify-between text-center bg-[#F4F3F3] mt-4 h-10 p-4">
              <div className="flex items-center gap-2">
                <Circle />
                <p className="font-semibold text-sm">Yes/No</p>
              </div>
              <div className="flex items-center gap-2">
                <Star />
                <p className="bg-[#12B76A] rounded-md text-white text-xs h-4.5 w-[72px] text-center py-[1px]">
                  Answered
                </p>
              </div>
            </div>
            <div className="m-4">
              <p className="mb-2 text-base">Question</p>
              <Input
                className="h-[40px] !rounded-lg !text-base !py-2 !px-3"
                defaultValue="What are the top three things most important to you in a job?"
              />
              <p className="my-2 text-base">Answer</p>
              <Select
                placeholder="Yes"
                className="w-full h-10 cursor-pointer text-base py-2"
                options={[
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="my-4">
          <div className="border-[1px] rounded-lg">
            <div className="flex justify-between text-center bg-[#F4F3F3] mt-4 h-10 p-4">
              <div className="flex items-center gap-2">
                <Predefine />
                <p className="font-semibold text-sm">Pre-defines Answer</p>
              </div>
              <div className="flex items-center gap-2">
                <Star />
                <p className="bg-[#12B76A] rounded-md text-white text-xs h-4.5 w-[72px] text-center py-[1px]">
                  Answered
                </p>
              </div>
            </div>
            <div className="m-4">
              <p className="mb-2 text-base">Question</p>
              <Input
                className="h-[40px] !rounded-lg !text-base !py-2 !px-3"
                defaultValue="What are the top three things most important to you in a job?"
              />
              <p className="my-2 text-base">Answer</p>
              <Select
                placeholder={
                  <div className="flex">
                    <p className="bg-gray-200 w-6 text-center rounded-md mr-2">
                      B
                    </p>
                    <p>Lorem ipsum dolor sit amet</p>
                  </div>
                }
                className="w-full h-10 cursor-pointer text-base py-2"
                options={[
                  {
                    value: "1",
                    label: (
                      <div className="flex">
                        <p className="bg-gray-200 w-6 text-center rounded-md mr-2">
                          A
                        </p>
                        <p>Lorem ipsum dolor sit amet</p>
                      </div>
                    ),
                  },
                  {
                    value: "2",
                    label: (
                      <div className="flex">
                        <p className="bg-gray-200 w-6 text-center rounded-md mr-2">
                          B
                        </p>
                        <p>Lorem ipsum dolor sit amet</p>
                      </div>
                    ),
                  },
                  {
                    value: "3",
                    label: (
                      <div className="flex">
                        <p className="bg-gray-200 w-6 text-center rounded-md mr-2">
                          C
                        </p>
                        <p>Lorem ipsum dolor sit amet</p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <Button className="w-full !h-[37px] !rounded-lg !py-2 !px-4">
          <p className="text-sm font-semibold text-[#344054]">View More</p>
        </Button>
      </div>
    </div>
  );
}
