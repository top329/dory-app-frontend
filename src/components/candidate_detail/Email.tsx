import React, { useState } from "react";
import { Button, Collapse, Input } from "antd";
import Dragger from "antd/es/upload/Dragger";
import type { UploadProps } from "antd";
import { Editor } from "@tinymce/tinymce-react";

import { Select } from "@/components";
import EmailButton from "@/assets/icons/Featured icon.svg";
import HelpCircle from "@/assets/icons/help-circle.svg";
import TypeT from "@/assets/icons/Solid.svg";
import Attach from "@/assets/icons/attach.svg";
import Eye from "@/assets/icons/eye.svg";
import Selector from "../common/Selector";
import IconDown from "@/assets/icons/arrow_down.svg";

const props: UploadProps = {
  name: "file",
  multiple: false,
  maxCount: 10,
  beforeUpload: () => {
    return false;
  },
};

export default function Email() {
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = () => {
    setEmailSent(true);
  };
  if (emailSent) {
    return <SendMail />;
  }
  return (
    <div className="text-center py-64">
      <div className="flex items-center justify-center">
        <EmailButton />
      </div>
      <p className="text-xl text-[#0E181C] font-medium">No Emails Yet</p>
      <p className="py-6 text-sm text-[#666666]">
        Lorem ipsum is placeholder text commonly used in
        <br />
        the graphic, print, and publishing industries
      </p>
      <Button
        type="primary"
        className="bg-[#0087F4] w-25 h-[37px] !px-4"
        onClick={sendEmail}
      >
        <p className="text-sm font-medium">Send Email</p>
      </Button>
    </div>
  );
}
export function SendMail() {
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [cancel, setCancel] = useState(false);
  const cancelSend = () => {
    setCancel(true);
  };
  if (cancel) {
    return <Email />;
  }
  const text = `Hello...`;
  const options = ["Michael Juliana", "Michael Juliana", "Michael Juliana"];
  const handleSelectionChange = (newSelection: string): void => {
    console.log(`New selection is: ${newSelection}`);
  };
  return (
    <>
      <style jsx global>
        {`
          .tox-tinymce {
            border: none !important;
          }
          .tox-editor-header {
            box-shadow: none !important;
            border: none !important;
          }
          .tox .tox-toolbar__primary {
            background-color: #f8f8f8 !important;
            border-top: 1px solid #eae7e6 !important;
            border-bottom: 1px solid #eae7e6 !important;
          }
          .ant-collapse-item {
            border-radius: 0px !important;
            border-top: 1px solid #eae7e6 !important;
            border-bottom: 1px solid #eae7e6 !important;
          }
          .ant-upload-wrapper .ant-upload-drag {
            border-radius: 0px !important;
            border-top: 0px !important;
            border-left: 0px !important;
            border-right: 0px !important;
          }
          .ant-upload-wrapper .ant-upload-drag .ant-upload {
            padding-top: 13.5px;
            padding-bottom: 13.5px;
            padding-left: 22px;
            padding-right: 22px;
          }
          .ant-collapse-expand-icon {
            display: none !important;
          }
          .ant-collapse > .ant-collapse-item > .ant-collapse-header {
            padding-top: 5.5px;
            padding-bottom: 5.5px;
            padding-left: 20px;
            padding-right: 20px;
          }
        `}
      </style>
      <div className="px-4">
        <div className="pt-6 pb-4">
          <p className="text-base text-[#050505] font-medium pb-1.5">
            Select mail template
          </p>
          <Select
            placeholder="Mail template 1"
            className="w-full h-10 rounded-lg text-base"
            options={[
              { value: "1", label: "Mail template 0" },
              { value: "2", label: "Mail template 1" },
              { value: "3", label: "Mail template 2" },
              { value: "4", label: "Mail template 3" },
              { value: "5", label: "Mail template 4" },
              { value: "6", label: "Mail template 5" },
              { value: "7", label: "Mail template 6" },
              { value: "8", label: "Mail template 7" },
              { value: "9", label: "Mail template 8" },
              { value: "10", label: "Mail template 9" },
            ]}
          />
        </div>
        <div className="border rounded-lg">
          <div className="py-[10px] px-[20px]">
            <p className="mb-[6px] text-[#667085] text-base ">Send to</p>
            <Selector
              options={options}
              onSelectChange={handleSelectionChange}
              style={{
                color: "#FFFFFF",
                background: "#FF7F62",
                height: "20px",
                width: "120px",
                fontSize: "12px",
                borderRadius: "6px",
                borderColor: "#FF7F62",
                border: "12px",
              }}
            />
            <Input
              className="h-[36px] !border-none !text-base !mt-5 !mb-1.5 !p-0"
              placeholder="Email Subject"
              bordered={false}
            />
            <Input
              className="h-[36px] !border-none !text-base !p-0"
              placeholder="Email Title"
              bordered={false}
            />
          </div>

          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
            init={{
              menubar: false,
              branding: false,
              height: 250,
              placeholder: "Email body",
            }}
          />
          <div className="flex items-center h-[35px] border-t bg-[#F8F8F8] px-5 py-2">
            <p className="text-base pr-1.5">Placeholder</p>
            <HelpCircle />
            <div className="flex items-center bg-[#EDECEA] rounded-md ml-12 mr-2 pl-1.5 pr-2 py-0.5">
              <TypeT />
              <p className="text-xs ml-1">Label</p>
            </div>
            <div className="flex items-center bg-[#EDECEA] rounded-md mr-2 pl-1.5 pr-2 py-0.5">
              <TypeT />
              <p className="text-xs ml-1">Label</p>
            </div>
            <div className="flex items-center bg-[#EDECEA] rounded-md mr-2 pl-1.5 pr-2 py-0.5">
              <TypeT />
              <p className="text-xs ml-1">Label</p>
            </div>
            <div className="flex items-center bg-[#EDECEA] rounded-md mr-2 pl-1.5 pr-2 py-0.5">
              <TypeT />
              <p className="text-xs ml-1">Label</p>
            </div>
          </div>
          <Collapse
            size="small"
            items={[
              {
                key: "1",
                label: (
                  <div className="flex items-center !rounded-none">
                    <Eye />
                    <p className="text-base px-1.5">Placeholder</p>
                    <IconDown
                      className={`transition ${
                        selectOpen ? "rotate-[-90deg]" : "rotate-0"
                      }`}
                    />
                  </div>
                ),
                children: <p>{text}</p>,
              },
            ]}
            onChange={() => setSelectOpen(!selectOpen)}
            className="w-full bg-[#F8F8F8] !border-0 !rounded-none"
          />
            <Dragger {...props} className="rounded-none">
              <div className="flex items-center h-2">
                <Attach />
                <p className="text-base px-3">Attach File</p>
              </div>
            </Dragger>
          <div className="flex justify-between items-center rounded-b-lg bg-[#FAFAFB] h-[59PX] px-5 pt-4 pb-2.5">
            <Button
              size="large"
              type="link"
              className="!text-black !px-0"
              onClick={cancelSend}
            >
              cancel
            </Button>
            <div>
              <Button size="large" className="mx-4 !h-[33px] !px-3.5">
                <p className="text-sm">Send later</p>
              </Button>
              <Button type="primary" size="large" className="!h-[33px] !px-3.5">
                <p className="text-sm">Send</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
