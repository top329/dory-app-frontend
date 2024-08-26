'use client';

import { ChangeEvent, useMemo, useState, useEffect } from 'react';
import { Button, Card, Col, Divider, Form, FormInstance, Input, Row, Switch } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

import { useSelector } from '@/features/store';
import { useLazyGetJobDetailDataQuery, useSetCreateNewJobsMutation } from '@/features/projects';

import { Select, useAuth } from '..';
import { type LanguageType, Option } from '@/types/global';
import { NewJobsProps } from '@/types/new_job';

import IconCancel from '@/assets/icons/circle_border_close.svg';
import IconGlobal from '@/assets/icons/global.svg';

interface EditJobProps {
  editJob: number;
  setEditJob: React.Dispatch<React.SetStateAction<number>>;
}

export default function EditJob({ editJob, setEditJob }: EditJobProps) {
  const { member } = useAuth();
  const [form] = Form.useForm();
  const { jobInit, jobData } = useSelector(state => state.jobs);
  const [getJobInfo, { isLoading: isGetJobInfo }] = useLazyGetJobDetailDataQuery();
  const [setUpdateJob, { isLoading: isEditing }] = useSetCreateNewJobsMutation();

  const [checkCareerHub, setCheckCareerHub] = useState<boolean>(false);
  const [language, setLanguage] = useState<Option[]>([]);
  const [errorDepartment, setDepartmentError] = useState<boolean>(false);
  const [errorRecruiter, setRecruiterError] = useState<boolean>(false);
  const [errorHiring, setHiringError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      form.resetFields();
      setDepartmentError(false);
      setRecruiterError(false);
      setHiringError(false);

      if (editJob !== 0 && !jobData) {
        await getJobInfo({ jobId: editJob, companyId: Number(member?.companyId) });
      }
    })();
  }, [editJob]);

  useEffect(() => {
    const filterLanguage = jobInit?.languages?.map((rs: LanguageType) => {
      return {
        id: rs.id,
        label: rs.languageName,
        value: rs.languageCode,
      };
    });

    setLanguage(filterLanguage as Option[]);
    setCheckCareerHub(jobData?.jobCountry ? true : false);

    const findDerpatment = jobInit?.departments.find((rs: Option) => rs.id === jobData?.jobDepartId);
    const findRecruiter = jobInit?.recruiters.find((rs: Option) => rs.id === jobData?.recruiterId);
    const findHiring = jobInit?.hiringManagers.find((rs: Option) => rs.id === jobData?.hiringManagerId);
    const findLanguage = filterLanguage?.find((rs: Option) => rs.id === jobData?.jobLanguageId);

    form.setFields([
      { name: 'jobTitle', errors: undefined, value: jobData?.jobTitle },
      { name: 'jobDepartId', errors: undefined, value: findDerpatment?.label },
      { name: 'recruiterId', errors: undefined, value: findRecruiter?.label },
      { name: 'hiringManagerId', errors: undefined, value: findHiring?.label },
      { name: 'jobLanguageId', errors: undefined, value: findLanguage?.label },
      { name: 'jobCountry', errors: undefined, value: jobData?.jobCountry },
      { name: 'jobCity', errors: undefined, value: jobData?.jobCity },
      { name: 'remoteStatus', errors: undefined, value: jobData?.remoteStatus === '1' ? true : false },
      { name: 'jobRequirement', errors: undefined, value: jobData?.jobRequirement },
      { name: 'jobDescription', errors: undefined, value: jobData?.jobDescription },
    ]);
  }, [jobData, jobInit, editJob]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      form.setFields([{ name: e.target.id, errors: undefined, value: e.target.value }]);
    } else {
      form.setFields([{ name: e.target.id, errors: ['This is a required field.'], value: e.target.value }]);
    }
  };

  const handleSwitchChange = (checked: boolean, index: string) => {
    if (index === 'hub') setCheckCareerHub(checked);
    if (index === 'status') form.setFieldValue('remoteStatus', checked);
  };

  const handleChangeEditor = (content: string, value: string) => {
    if (content !== '') {
      form.setFields([{ name: value, errors: undefined, value: content }]);
    } else {
      form.setFields([{ name: value, errors: ['This is a required field.'], value: '' }]);
    }
  };

  const handleSubmit = async (data: NewJobsProps) => {
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

    const submit = { ...data, jobDepartId, recruiterId, hiringManagerId, jobLanguageId, remoteStatus };

    await setUpdateJob({
      ...submit,
      companyId: member?.companyId.toString(),
      jobId: editJob.toString(),
    } as NewJobsProps);

    if (!isEditing) {
      setTimeout(() => {
        setEditJob(0);
      }, 500);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <div className="w-full">
        <div className="flex items-center justify-between px-6 py-[26px] border-b border-b-[#EAE7E6]">
          <h1 className="text-xl text-[#050505] font-medium">Edit Job Information</h1>
          <div className="flex items-center gap-4">
            <Button
              type="primary"
              htmlType="submit"
              className="!h-[33px] !bg-mainColor hover:!opacity-75"
              loading={isEditing}
            >
              Save Changes
            </Button>
            <div
              className="cursor-pointer hover:bg-gray-50 hover:opacity-75 rounded-full"
              onClick={() => setEditJob(0)}
            >
              <IconCancel />
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-b border-b-[#EDEFF1]">
          <Card loading={isGetJobInfo}>
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
              <Card className="!mb-4" loading={isGetJobInfo}>
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
                      <p className="text-sm text-[#344054] font-medium leading-[20px]">
                        Can this job be done remotely?
                      </p>
                      <p className="text-sm text-[#475467] leading-[20px]">
                        Lorem ipsum is placeholder text commonly used in the graphic
                      </p>
                    </div>
                  </div>
                </Form.Item>
              </Card>
            </>
          )}

          <Card className="!min-h-[353px]" loading={isGetJobInfo}>
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
            onClick={() => setEditJob(0)}
          >
            Discard Changes
          </Button>
          <Button type="primary" htmlType="submit" className="!h-9 !bg-mainColor hover:!opacity-75" loading={isEditing}>
            Save Changes
          </Button>
        </div>
      </div>
    </Form>
  );
}
