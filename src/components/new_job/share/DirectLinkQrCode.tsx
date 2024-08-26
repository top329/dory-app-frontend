'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Col, DatePicker, Divider, Form, QRCode, Row, type DatePickerProps, Tooltip } from 'antd';

import { useSetCreateNewJobsMutation } from '@/features/projects';
import { Select, useAuth, useNewJob } from '@/components';

import { COUNTRIES } from '@/types/global';
import { NewJobsProps } from '@/types/new_job';
import type { InviteCandidatesProps } from '@/app/new_job/create/ShareJob';

import IconCopy from '@/assets/icons/copy.svg';
import IconDownload from '@/assets/icons/download.svg';

export default function DirectLinkQrCode({ shareOpen, shareJobKind, setShareOpen }: InviteCandidatesProps) {
  const router = useRouter();
  const { member } = useAuth();
  const { form, onSubmit, jobs } = useNewJob();
  const [setUpdateNewJobs, { isLoading }] = useSetCreateNewJobsMutation();

  const jobId = typeof window !== 'undefined' && window.localStorage.getItem('jobId');
  const publishUrl = typeof window !== 'undefined' && window.localStorage.getItem('publishUrl');

  const [error, setError] = useState<boolean>(false);
  const [deadLine, setDeadLine] = useState<string>('');

  useEffect(() => {
    form.resetFields();
  }, [shareOpen, shareJobKind]);

  const handleDownload = () => {
    const canvas = document.getElementById('qrcode')?.querySelector<HTMLCanvasElement>('canvas');

    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    if (dateString !== '') {
      form.setFields([{ name: 'jobDeadline', errors: undefined, value: date }]);
      setDeadLine(dateString);
    } else {
      form.setFields([{ name: 'jobDeadline', errors: ['This is a required field.'], value: '' }]);
    }
  };

  const handleClipboard = async () => {
    await window.navigator.clipboard.writeText(publishUrl as string);
  };

  const handleSubmit = async (data: NewJobsProps) => {
    let isValidate = false;
    setDeadLine('');

    if (!data.jobDeadline || data.jobDeadline === '') {
      form.setFields([{ name: 'jobDeadline', errors: ['This is a required field.'] }]);
      isValidate = true;
    }

    if (!data.jobShareCountry || data.jobShareCountry === '') {
      setError(true);
      form.setFields([{ name: 'jobShareCountry', errors: ['This is a required field.'] }]);
      isValidate = true;
    }

    if (isValidate) return;

    const submit = {
      jobDeadline: deadLine,
      jobShareCountry: data.jobShareCountry,
    };

    await onSubmit(submit as NewJobsProps);
    await setUpdateNewJobs({ ...jobs, ...submit, companyId: member?.companyId.toString(), jobId: jobId as string });

    if (!isLoading) {
      setTimeout(() => {
        router.replace('/jobs');
        if (setShareOpen) setShareOpen(false);
      }, 500);
    }
  };

  return (
    <>
      <div className="w-full mb-6">
        <h3 className="text-xl text-black font-medium mb-2">Workflow Selection</h3>
        <p className="text-base text-[#666666]">Lorem ipsum is placeholder text commonly used in the graphic</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="w-[90%] border border-gray-300 h-11 rounded-tl-lg rounded-bl-lg bg-gray-50 px-[14px] py-[10px]">
          <p className="text-base text-[#667085]">{publishUrl as string}</p>
        </div>
        <Tooltip title="Copied!" trigger="click" placement="top">
          <div
            className="w-[10%] h-11 border border-gray-300 rounded-tr-lg rounded-br-lg border-l-0 cursor-pointer flex items-center justify-center gap-2"
            onClick={handleClipboard}
          >
            <IconCopy />
            <p className="text-base text-[#294753] font-semibold">Copy</p>
          </div>
        </Tooltip>
      </div>
      <Divider />
      <div className="w-full mb-6">
        <h3 className="text-xl text-black font-medium mb-2">Scan QR Code</h3>
        <p className="text-base text-[#4D6670]">Lorem ipsum is placeholder text commonly used in the graphic</p>
      </div>
      <div className="flex items-center gap-6 mb-6">
        <div id="qrcode" className="w-[182px] h-[182px] border-[12px] border-[#EDEFF1]">
          <QRCode value={publishUrl as string} bgColor="#fff" bordered={false} />
        </div>
        <div>
          <p className="text-sm text-[#4D6670] mb-2">PNG 500x500px</p>
          <Button type="default" className="!h-10 !border-gray-300 !text-[#344054] hover:!opacity-75" onClick={handleDownload}>
            <div className="flex items-center gap-2">
              <IconDownload />
              <p>Button CTA</p>
            </div>
          </Button>
        </div>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={24} className="items-center">
          <Col span={11}>
            <Form.Item
              name="jobDeadline"
              label={
                <>
                  Choose Deadline<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                </>
              }
            >
              <DatePicker className="!h-10" onChange={handleChangeDate} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="jobShareCountry"
              label={
                <>
                  Country<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                </>
              }
            >
              <Select
                form={form}
                options={COUNTRIES}
                className="w-full h-10 cursor-pointer"
                placeholder="Select country"
                searchable={true}
                error={error}
                setError={setError}
                errorMessage="This is a required field."
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Button type="primary" htmlType="submit" loading={isLoading} className={`!h-10 !bg-mainColor hover:!opacity-75`}>
              Set
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
