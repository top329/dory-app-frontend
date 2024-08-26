'use client';

import { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Form, Input, Button, Row, Col, Divider, Switch } from 'antd';

import { Select, useNewJob } from '@/components';
import { Editor } from '@tinymce/tinymce-react';

import { useSelector } from '@/features/store';

import IconGlobal from '@/assets/icons/global.svg';
import type { LanguageType, Option } from '@/types/global';
import { NewJobsProps } from '@/types/new_job';

type formProps = {
  jobTitle: string;
  jobDepartId: string;
  recruiterId: string;
  hiringManagerId: string;
  jobLanguageId: string;
  jobCountry: string;
  jobCity: string;
  remoteStatus: boolean;
  jobDescription: string;
  jobRequirement: string;
};

export default function JobInformation() {
  const router = useRouter();
  const { form, jobs, onSubmit, nextSubStep } = useNewJob();
  const { jobInit } = useSelector(state => state.newJob);

  const [errorDepartment, setDepartmentError] = useState<boolean>(false);
  const [errorRecruiter, setRecruiterError] = useState<boolean>(false);
  const [errorHiring, setHiringError] = useState<boolean>(false);
  const [checkCareerHub, setCheckCareerHub] = useState<boolean>(jobs?.checkCareerHub ? jobs?.checkCareerHub : false);
  const [language, setLanguage] = useState<Option[]>([]);
//@ts-ignore
  const initialValues: formProps = useMemo(() => {
    const findDerpatment = jobInit?.departments.find((rs: Option) => rs.id === jobs?.jobDepartId);
    const findRecruiter = jobInit?.recruiters.find((rs: Option) => rs.id === jobs?.recruiterId);
    const findHiring = jobInit?.hiringManagers.find((rs: Option) => rs.id === jobs?.hiringManagerId);
    const findLanguage = language?.find((rs: Option) => rs.label === jobs?.jobLanguageId);

    return {
      jobTitle: jobs?.jobTitle || '',
      jobDepartId: findDerpatment?.label || '',
      recruiterId: findRecruiter?.label || '',
      hiringManagerId: findHiring?.label || '',
      jobLanguageId: findLanguage?.label || '',
      jobCountry: jobs?.jobCountry || '',
      jobCity: jobs?.jobCity || '',
      remoteStatus: jobs?.remoteStatus === '1' ? true : false,
      jobDescription: jobs?.jobDescription || '',
      jobRequirement: jobs?.jobRequirement || '',
    };
  }, [jobs]);

  useEffect(() => {
    const filterLanguage = jobInit?.languages?.map((rs: LanguageType) => {
      return {
        id: rs.id,
        label: rs.languageName,
        value: rs.languageCode,
      };
    });

    setLanguage(filterLanguage as Option[]);
  }, [jobInit]);

  const handleSwitchChange = (checked: boolean, index: string) => {
    if (index === 'hub') setCheckCareerHub(checked);
    if (index === 'status') form.setFieldValue('remoteStatus', checked);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      form.setFields([{ name: e.target.id, errors: undefined, value: e.target.value }]);
    } else {
      form.setFields([{ name: e.target.id, errors: ['This is a required field.'], value: e.target.value }]);
    }
  };

  const handleChangeEditor = (content: string, value: string) => {
    if (content !== '') {
      form.setFields([{ name: value, errors: undefined, value: content }]);
    } else {
      form.setFields([{ name: value, errors: ['This is a required field.'], value: '' }]);
    }
  };

  const handleSubmit = (data: NewJobsProps) => {
    let isValidate = false;

    if (!data?.jobTitle || data?.jobTitle === '') {
      form.setFields([{ name: 'jobTitle', errors: ['This is a required field.'] }]);
      isValidate = true;
    }

    if (!data?.jobDepartId || data?.jobDepartId === '') {
      form.setFields([{ name: 'jobDepartId', errors: ['This is a required field.'] }]);
      setDepartmentError(true);
      isValidate = true;
    }

    if (!data?.recruiterId || data?.recruiterId === '') {
      form.setFields([{ name: 'recruiterId', errors: ['This is a required field.'] }]);
      setRecruiterError(true);
      isValidate = true;
    }

    if (!data?.hiringManagerId || data?.hiringManagerId === '') {
      form.setFields([{ name: 'hiringManagerId', errors: ['This is a required field.'] }]);
      setHiringError(true);
      isValidate = true;
    }

    if (checkCareerHub) {
      if (!data?.jobCountry || data?.jobCountry === '') {
        form.setFields([{ name: 'jobCountry', errors: ['This is a required field.'] }]);
        isValidate = true;
      }

      if (!data?.jobCity || data?.jobCity === '') {
        form.setFields([{ name: 'jobCity', errors: ['This is a required field.'] }]);
        isValidate = true;
      }

      if (!data?.jobRequirement || data?.jobRequirement === '') {
        form.setFields([{ name: 'jobRequirement', errors: ['This is a required field.'] }]);
        isValidate = true;
      }
    }

    if (!data?.jobDescription || data?.jobDescription === '') {
      form.setFields([{ name: 'jobDescription', errors: ['This is a required field.'] }]);
      isValidate = true;
    }

    if (isValidate) return;

    const findDerpatment = jobInit?.departments.find((rs: Option) => rs.label === data.jobDepartId);
    const findRecruiter = jobInit?.recruiters.find((rs: Option) => rs.label === data.recruiterId);
    const findHiring = jobInit?.hiringManagers.find((rs: Option) => rs.label === data.hiringManagerId);
    const findLanguage = language.find((rs: Option) => rs.label === data.jobLanguageId);

    const jobDepartId = findDerpatment?.id || '0';
    const recruiterId = findRecruiter?.id || '0';
    const hiringManagerId = findHiring?.id || '0';
    const jobLanguageId = findLanguage?.id || '0';
    const remoteStatus = data.remoteStatus ? 1 : '0';

    const submit = { ...data, jobDepartId, recruiterId, hiringManagerId, jobLanguageId, remoteStatus, checkCareerHub };

    void onSubmit(submit as NewJobsProps, data);
    nextSubStep();
  };

  return (
    <Form
      className="!mb-8"
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialValues}
      id="form"
    >
      <div className="px-6 pt-8 pb-[84px] border-b border-b-[#EDEFF1]">
        <h1 className="text-2xl font-medium mb-8">Add Job Information</h1>
        <Card>
          <Form.Item
            name="jobTitle"
            label={
              <>
                Job title<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
              </>
            }
          >
            <Input placeholder="Fill job title" className="!h-10" onChange={handleChangeInput} />
          </Form.Item>
          <Form.Item
            name="jobDepartId"
            label={
              <>
                Department<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
              </>
            }
          >
            <Select
              form={form}
              options={jobInit?.departments as Option[]}
              className="w-full h-10 cursor-pointer"
              placeholder="Select department"
              searchable={false}
              error={errorDepartment}
              setError={setDepartmentError}
              errorMessage="This is a required field."
            />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="recruiterId"
                label={
                  <>
                    Recruiter<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                  </>
                }
              >
                <Select
                  form={form}
                  options={jobInit?.recruiters as Option[]}
                  className="w-full h-10 cursor-pointer"
                  placeholder="Select recruiter"
                  searchable={false}
                  error={errorRecruiter}
                  setError={setRecruiterError}
                  errorMessage="This is a required field."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hiringManagerId"
                label={
                  <>
                    Hiring manager<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                  </>
                }
              >
                <Select
                  form={form}
                  options={jobInit?.hiringManagers as Option[]}
                  className="w-full h-10 cursor-pointer"
                  placeholder="Select hiring manager"
                  searchable={false}
                  error={errorHiring}
                  setError={setHiringError}
                  errorMessage="This is a required field."
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="jobLanguageId" label="Language">
            <Select
              form={form}
              options={language}
              className="w-full h-10 cursor-pointer"
              placeholder="Select language"
              searchable={false}
            />
          </Form.Item>
        </Card>
        <Divider />
        <div className="flex items-center gap-4 mb-6">
          <Switch onChange={(checked: boolean) => handleSwitchChange(checked, 'hub')} checked={checkCareerHub} />
          <div>
            <p className="text-sm text-[#344054] font-medium leading-[20px]">
              Want to add this job to your career hub?
            </p>
            <p className="text-sm text-[#475467] leading-[20px]">
              Lorem ipsum is placeholder text commonly used in the graphic
            </p>
          </div>
        </div>

        {checkCareerHub && (
          <>
            <Card className="!mb-4">
              <Row gutter={24}>
                <Col span={12} className="!relative">
                  <Form.Item
                    name="jobCountry"
                    label={
                      <>
                        Job country<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                      </>
                    }
                  >
                    <Input placeholder="Job location" className="!h-10 !pl-8" onChange={handleChangeInput} />
                  </Form.Item>
                  <IconGlobal className="absolute left-5 top-1/2 mt-[-4px]" />
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="jobCity"
                    label={
                      <>
                        Job city<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                      </>
                    }
                  >
                    <Input placeholder="Find city" className="!h-10" onChange={handleChangeInput} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="remoteStatus" label="">
                <div className="flex items-center gap-4">
                  <Switch onChange={(checked: boolean) => handleSwitchChange(checked, 'status')} />
                  <div>
                    <p className="text-sm text-[#344054] font-medium leading-[20px]">Can this job be done remotely?</p>
                    <p className="text-sm text-[#475467] leading-[20px]">
                      Lorem ipsum is placeholder text commonly used in the graphic
                    </p>
                  </div>
                </div>
              </Form.Item>
            </Card>
          </>
        )}

        <Card className="!min-h-[353px]">
          <Form.Item
            name="jobDescription"
            label={
              <>
                Job description<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
              </>
            }
            getValueFromEvent={(_, editor) => editor.getContent()}
          >
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
              init={{ menubar: false, branding: false, height: 250, placeholder: 'Enter a description...' }}
              onEditorChange={content => handleChangeEditor(content, 'jobDescription')}
            />
          </Form.Item>

          {checkCareerHub && (
            <Form.Item
              name="jobRequirement"
              label={
                <>
                  Job recruitments<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                </>
              }
              getValueFromEvent={(_, editor) => editor.getContent()}
            >
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                init={{ menubar: false, branding: false, height: 250, placeholder: 'Enter a recruitments...' }}
                onEditorChange={content => handleChangeEditor(content, 'jobRequirement')}
              />
            </Form.Item>
          )}
        </Card>
      </div>
      <div className="flex items-center justify-between px-4 py-6">
        <Button
          type="default"
          className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75"
          onClick={() => router.back()}
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
