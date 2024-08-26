import {
  Checkbox,
  Avatar,
  Typography,
  Button,
  Input,
  Popover,
  DatePicker,
  Modal,
  Divider,
  Select,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

import More from "@/assets/icons/more.svg";
import Trash from "@/assets/icons/trash_black.svg";
import Edit from "@/assets/icons/edit.svg";
import Plus from "@/assets/icons/plus.svg";
import Schedule from "@/assets/icons/schedule.svg";
import ManPlus from "@/assets/icons/plusman.svg";
import Close from "@/assets/icons/close_circle.svg";

const { Text } = Typography;
const { RangePicker } = DatePicker;
type CandidateType = {
  id: string;
  description: string;
  checked: boolean;
  date: string;
  avatar: string;
};

export default function Task() {
  const [users, setUsers] = useState<CandidateType[]>([
    {
      id: "1",
      checked: true,
      description:
        "Please evaluate Jackson with your own testing tool from UK and Agile methodology. Blockchain technology..",
      date: "Yesterday",
      avatar: "avatar.png",
    },
    {
      id: "2",
      checked: false,
      description:
        "Please evaluate Jackson with your own testing tool from UK and Agile methodology. Blockchain technology..",
      date: "2001/01/02",
      avatar: "avatar.png",
    },
    {
      id: "3",
      checked: true,
      description:
        "Please evaluate Jackson with your own testing tool from UK and Agile methodology. Blockchain technology..",
      date: "Yesterday",
      avatar: "avatar.png",
    },
    {
      id: "4",
      checked: false,
      description:
        "Please evaluate Jackson with your own testing tool from UK and Agile methodology. Blockchain technology..",
      date: "Yesterday",
      avatar: "avatar.png",
    },
    {
      id: "5",
      checked: false,
      description:
        "Please evaluate Jackson with your own testing tool from UK and Agile methodology. Blockchain technology..",
      date: "Yesterday",
      avatar: "avatar.png",
    },
  ]);

  const [showAddEditor, setShowAddEditor] = useState<boolean>(false);
  const [editData, setEditData] = useState<{
    checked: boolean;
    description: string;
    date: string;
  }>({
    checked: false,
    description: "",
    date: "",
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChecked = (value: boolean, id: string) => {
    setUsers((prev) => {
      let temp = [...prev];
      temp = temp.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      return temp;
    });
  };

  const isTodayOrYesterday = (date: String): boolean => {
    return date === "Today" || date === "Yesterday";
  };

  const _renderCandidateItem = (user: CandidateType) => (
    <div className="items-center" key={user.id}>
      <div className="flex items-center text-center checkbox-round gap-2 w-full h-[42px]">
        <Popover
          content={
            <>
              <p
                onClick={() => setShowModal(true)}
                className="hover:cursor-pointer mb-2"
              >
                <div className="flex">
                  <Edit />
                  &nbsp;&nbsp;Edit task
                </div>
              </p>
              <p className="hover:cursor-pointer">
                <div className="flex items-center">
                  <Trash />
                  &nbsp;&nbsp;Delete task
                </div>
              </p>
            </>
          }
          placement="right"
          trigger="click"
          arrow={false}
        >
          <div className="group">
            <Button
              type="link"
              className="opacity-0 group-hover:opacity-100 inline-flex justify-center items-center transition-opacity duration-500 !px-0 !-ml-4"
            >
              <More />
            </Button>
          </div>
        </Popover>
        <Checkbox
          checked={user.checked}
          onChange={(e: CheckboxChangeEvent) =>
            handleChecked(e.target.checked, user.id)
          }
          className="!rounded-full !w-[1vw] !mb-1 !-ml-1.5"
        />
        <Text className={`!w-[66vw] !text-base ${user.checked ? "!text-[#666]" : "!text-black"}`} ellipsis delete={user.checked} >
          {user.description}
        </Text>
        <Text
          type="secondary"
          className={`!w-1/4 ${
            isTodayOrYesterday(user.date) ? "!text-[#F13528]" : "!text-current"
          }`}
        >
          {user.date}
        </Text>
        <div className="!w-[3vw]">
          <Avatar size={24} icon={<UserOutlined />} />
        </div>
      </div>
      <Divider className="!my-2 !pl-[-5px]" />
    </div>
  );

  return (
    <div className="pt-6 px-4">
      <Modal
        centered
        open={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        footer={false}
        closeIcon={false}
      >
        <div className="flex justify-end border-b border-slate-200 p-6">
          <Button type="link" className="!p-0"><Close /></Button>
        </div>
        <div className="font-medium text-base font-sans p-6">
          Task
          <TextArea
            className="h-[40px] font-medium !text-base"
            defaultValue="Please, evaluate erena with the General Evalution template after the interview"
            autoSize={{ minRows: 5, maxRows: 7 }}
          />
          <div className="rounded-md  text-sm checkbox-round border p-5 mt-4">
            <div className="flex">
              <div className="font-medium text-base w-4/12">Task Status</div>
              <div className="flex items-center gap-2">
                <style jsx global>
                  {`
                    .ant-checkbox-inner {
                      width: 20px !important;
                      height: 20px !important;
                    }
                  `}
                </style>
                <Checkbox className="!h-5 !w-5" />
                <p className="font-medium text-base">To-do</p>
              </div>
            </div>
            <div className="flex mt-1">
              <p className="font-medium text-base w-4/12">Candidate</p>
              <div className="flex items-center gap-2">
                <Avatar size={20} className="!bg-[#FF7A00] !items-center">
                  <p className="text-xs mt-[1px]">M</p>
                </Avatar>
                <p className="font-medium text-base">Michael Juliano</p>
              </div>
            </div>
            <div className="flex mt-1">
              <div className="font-medium text-base w-4/12">Owner</div>
              <div className="flex items-center gap-2">
                <Avatar
                  size={20}
                  icon={<UserOutlined />}
                  className="items-center"
                />
                <p className="font-medium text-base flex items-center">
                  Aliano Shiraf
                  <Divider type="vertical" />
                  <Popover
                    content={
                      <div>
                        <p className="text-sm mb-4">Edit Owner</p>
                        <p className="text-base mr-64">Change Owner</p>
                        <div className="flex flex-col space-y-1">
                          <Select
                            mode="multiple"
                            size="large"
                            options={[
                              {
                                value: "jack",
                                label: (
                                  <div className="flex items-center">
                                    <Avatar icon={<UserOutlined />} size={16} />
                                    <p>Phoenix</p>
                                  </div>
                                ),
                              },
                              {
                                value: "lucy",
                                label: (
                                  <div className="flex items-center">
                                    <Avatar icon={<UserOutlined />} size={16} />
                                    <p className="m-0">Baker</p>
                                  </div>
                                ),
                              },
                              {
                                value: "Yiminghe",
                                label: (
                                  <div className="flex items-center">
                                    <Avatar icon={<UserOutlined />} size={16} />
                                    <p className="m-0">Lucy</p>
                                  </div>
                                ),
                              },
                            ]}
                            className="border rounded-lg !mb-3"
                          />
                          <Button className="w-full !h-[33px]" type="primary">
                            Edit owner
                          </Button>
                        </div>
                      </div>
                    }
                    placement="bottom"
                    trigger="hover"
                    arrow={false}
                  >
                    <Edit />
                  </Popover>
                </p>
              </div>
            </div>
            <div className="flex mt-1">
              <div className="font-medium text-base w-4/12">Due date</div>
              <div className="flex items-center">
                <p className="font-medium text-base">01/06/2023</p>
                <Divider type="vertical" />
                <Popover
                  content={
                    <div>
                      <RangePicker />
                    </div>
                  }
                  placement="bottomRight"
                  trigger="hover"
                  arrow={false}
                >
                  <Edit />
                </Popover>
              </div>
            </div>
          </div>
          <div className="text-sm flex justify-between mt-4">
            <Button onClick={() => setShowModal(false)} className="!h-[33px]">
              <p className="font-medium text-sm">Discard Changes</p>
            </Button>
            <Button type="primary" className="!h-[33px]">
              <p className="font-medium text-base">Save Changes</p>
            </Button>
          </div>
        </div>
      </Modal>
      <div className="border rounded-md border-slate-200 p-4 ">
        <p className="text-xl font-medium mb-4">Candidate Task</p>
        {users.map((user) => _renderCandidateItem(user))}
        <div className="border border-[#cccbcb] border-dashed rounded-lg checkbox-round flex items-center gap-x-2 justify-between bg-[#F8F8F8] h-11 p-1.5">
          {!showAddEditor ? (
            <div
              className="flex gap-x-2 items-center mx-1"
              onClick={() => setShowAddEditor(true)}
            >
              <Plus /> Add new question modal here...
            </div>
          ) : (
            <>
              <Checkbox className="rounded-full !pb-1" />
              <div className="border-none-input w-full">
                <Input
                  placeholder="Write new task..."
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData })}
                  className="!pl-[1px]"
                />
              </div>
              <div className="justify-self-end gap-x-1 flex items-center">
                <Popover
                  content={
                    <div>
                      <RangePicker />
                    </div>
                  }
                  placement="bottomRight"
                  trigger="hover"
                  arrow={false}
                >
                  <Button type="link" className="!p-0">
                    <Schedule />
                  </Button>
                </Popover>
                <Popover
                  content={
                    <div>
                      <p className="text-sm mr-64 mb-4">Add Owner</p>
                      <p className="text-base">Add Owner</p>
                      <div className="flex flex-col space-y-1">
                        <Select
                          mode="multiple"
                          size="large"
                          options={[
                            {
                              value: "jack",
                              label: (
                                <div className="flex items-center">
                                  <Avatar icon={<UserOutlined />} size={19} />
                                  <p className="m-0">Phoenix</p>
                                </div>
                              ),
                            },
                            {
                              value: "lucy",
                              label: (
                                <div className="flex items-center">
                                  <Avatar icon={<UserOutlined />} size={19} />
                                  <p className="m-0">Baker</p>
                                </div>
                              ),
                            },
                            {
                              value: "Yiminghe",
                              label: (
                                <div className="flex items-center">
                                  <Avatar icon={<UserOutlined />} size={19} />
                                  <p className="m-0">Lucy</p>
                                </div>
                              ),
                            },
                          ]}
                          className="border rounded-lg items-center !mb-3"
                        />
                        <Button
                          className="w-full mt-1 !h-[33px]"
                          type="primary"
                        >
                          Add owner
                        </Button>
                      </div>
                    </div>
                  }
                  placement="bottomRight"
                  trigger="hover"
                  arrow={false}
                >
                  <Button type="link" className="!p-0">
                    <ManPlus />
                  </Button>
                </Popover>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
