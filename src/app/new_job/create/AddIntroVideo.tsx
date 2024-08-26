import { useRouter } from 'next/navigation';
import { Button, Divider, Form, UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';

import { useNewJob } from '@/components';

import IconRecord from '@/assets/icons/record.svg';
import IconUpload from '@/assets/icons/upload_3.svg';

const props: UploadProps = {
  name: 'file',
  multiple: false,
  maxCount: 1,
  accept: 'video/mp4',
  beforeUpload: () => {
    return false;
  },
};

export default function AddIntroVideo() {
  const router = useRouter();
  const { form, prevStep, prevSubStep, onSubmit } = useNewJob();

  const normFile = (e: any) => {
    if (e?.fileList?.length !== 0 && e?.fileList[0].type.search('video') === -1) return [];
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handleSubmit = async (data: any) => {
    const file = data?.files[0].originFileObj;
    void onSubmit({ videoQuestionFile: file }, { videoQuestionFile: file });
    router.push('/new_job/create/videos?step=2');
  };

  return (
    <Form className="!mb-8" form={form} layout="vertical" onFinish={handleSubmit}>
      <div className="px-10 py-8 border-b border-b-[#EDEFF1]">
        <h1 className="text-2xl font-medium text-center mb-10">Add videos</h1>
        <h3 className="text-xl font-medium text-center mb-4">Record or upload your welcome video</h3>
        <h3 className="text-sm text-[#475467] leading-5 mb-14 text-center">
          Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <IconRecord />
            </div>
            <div>
              <p className="text-base font-medium leading-5 mb-2">You can record the welcoming video through Dory's website, are you ready?</p>
              <p className="text-sm leading-5">Lorem ipsum is placeholder text commonly used in the graphic</p>
            </div>
          </div>
          <Button
            type="primary"
            className="!h-10 rounded-lg !bg-[#CCE7FD] hover:!opacity-75 xl"
            onClick={() => router.push('/new_job/create/videos')}
          >
            <span className="text-sm font-semibold text-[#0071CB]">Record Video</span>
          </Button>
        </div>
        <Divider plain>
          <span className="text-sm text-[#94A3A9]">Or</span>
        </Divider>
        <Form.Item
          name="files"
          label="Would you like to add a question?"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ message: 'This is a required.', required: true }]}
        >
          <Dragger {...props} className="group !bg-white">
            <div className="flex items-center justify-center">
              <IconUpload />
            </div>
            <p className="text-sm text-[#1A1A1A]">
              <span className="text-[#0071CB] font-semibold">Click to upload</span>&nbsp;
              <span>or drag and drop</span>
              <br />
              <span>MP4</span>
            </p>
          </Dragger>
        </Form.Item>
      </div>
      <div className="flex items-center justify-between px-4 py-6">
        <Button
          type="default"
          className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75"
          onClick={() => {
            prevSubStep();
            prevStep();
          }}
        >
          Back
        </Button>
        <Button type="primary" htmlType="submit" className="!h-9 !bg-mainColor hover:!opacity-75">
          Next
        </Button>
      </div>
    </Form>
  );
}
