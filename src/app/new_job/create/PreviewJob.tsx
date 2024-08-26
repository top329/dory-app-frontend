'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Col, Divider, Form, Input, Row, Switch, Tag } from 'antd';

import { useSetCreateNewJobsMutation } from '@/features/projects';

import { useAuth, useNewJob } from '@/components';

import { useNotifications } from '@/utils';
import type { VideoQuestionAddContentType, QuestionAddContentType } from '@/types/new_job';
import type { WorkflowStageType } from '@/types/workflow';

import IconEdit from '@/assets/icons/edit.svg';
import IconQuestion from '@/assets/icons/question.svg';
import IconCheck from '@/assets/icons/check_broken.svg';
import IconTextBox from '@/assets/icons/align-left.svg';
import IconCircle from '@/assets/icons/circle.svg';
import IconUpload from '@/assets/icons/upload-cloud.svg';
import IconLight from '@/assets/icons/light.svg';
import IconVideo from '@/assets/icons/video.svg';
import IconRepeat from '@/assets/icons/repeat.svg';
import IconSend from '@/assets/icons/send.svg';
import { ApiResponse } from '@/types/global';

export default function PreviewJob() {
  const router = useRouter();
  const { member } = useAuth();
  const { message } = useNotifications();
  const { prevStep, prevSubStep, nextStep, nextSubStep, prevJobs, jobs } = useNewJob();
  const [setCreateNewJobs, { isLoading }] = useSetCreateNewJobsMutation();

  const handlePublish = async () => {
    const { data } = (await setCreateNewJobs({ ...jobs, companyId: member?.companyId.toString() })) as {
      data: ApiResponse<{ publishUrl: string }>;
    };

    if (data?.code === 200) {
      typeof window !== 'undefined' && window.localStorage.setItem('jobId', data?.value as string);
      typeof window !== 'undefined' && window.localStorage.setItem('publishUrl', data?.data?.publishUrl);
    } else {
      message.error(data?.msg);
      return;
    }

    nextStep();
    nextSubStep();
    router.replace('/new_job/create?step=5&substep=7');
  };

  return (
    <>
      <div className="px-6 pt-8 pb-[84px] border-b border-b-[#EDEFF1]">
        <h1 className="text-2xl font-medium mb-4">Job Preview</h1>
        <Form className="!mb-8" layout="vertical" id="form">
          <Card className="!mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-black">Job Information</h3>
              <Button
                type="default"
                className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75"
                onClick={() => {
                  nextStep(0);
                  nextSubStep(0);
                }}
              >
                <div className="flex items-center gap-2">
                  <IconEdit />
                  <p>Edit</p>
                </div>
              </Button>
            </div>
            <Form.Item label="Job title">
              <Input className="!h-10" value={prevJobs?.jobTitle} readOnly />
            </Form.Item>
            <Form.Item label="Department">
              <Input className="!h-10" value={prevJobs?.jobDepartId} readOnly />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Recruiter">
                  <Input className="!h-10" value={prevJobs?.recruiterId} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Hiring manager">
                  <Input className="!h-10" value={prevJobs?.hiringManagerId} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Language">
              <Input className="!h-10" value={prevJobs?.jobLanguageId} readOnly />
            </Form.Item>
            <Divider />
            {prevJobs?.jobCountry && (
              <>
                <Row gutter={24}>
                  <Col span={12} className="!relative">
                    <Form.Item label="Job location">
                      <Input className="!h-10" value={prevJobs?.jobCountry} readOnly />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="City">
                      <Input className="!h-10" value={prevJobs?.jobCity} readOnly />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="">
                  <div className="flex items-center gap-4">
                    <Switch checked={prevJobs?.remoteStatus ? true : false} />
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
              </>
            )}
            <Form.Item label="Job description">
              <Input.TextArea className="!h-10" value={prevJobs?.jobDescription} readOnly />
            </Form.Item>

            {prevJobs?.jobCountry && (
              <Form.Item label="Job recruitments">
                <Input.TextArea className="!h-10" value={prevJobs?.jobRequirement} readOnly />
              </Form.Item>
            )}
          </Card>
          <Card className="!mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-black">Job Details</h3>
              <Button
                type="default"
                className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75"
                onClick={() => {
                  nextStep(0);
                  nextSubStep(1);
                }}
              >
                <div className="flex items-center gap-2">
                  <IconEdit />
                  <p>Edit</p>
                </div>
              </Button>
            </div>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Employee type">
                  <Input className="!h-10" value={prevJobs?.employeeTypeId} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Category">
                  <Input className="!h-10" value={prevJobs?.jobCategoryId} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Education">
              <Input className="!h-10" value={prevJobs?.requiredEducationId} readOnly />
            </Form.Item>
            <Divider />
            <Form.Item label="Salary Period">
              <Input className="!h-10" value={prevJobs?.salaryPeriodId} readOnly />
            </Form.Item>
            <Row gutter={24}>
              <Col span={10}>
                <Form.Item label="Min price">
                  <Input className="!h-10" value={prevJobs?.salaryMin} readOnly />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="Max price">
                  <Input className="!h-10" value={prevJobs?.salaryMax} readOnly />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Currency">
                  <Input className="!h-10" value={prevJobs?.currencyId} readOnly />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {prevJobs?.questionContent?.length && (
            <Card className="!mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-black">Qualification Question</h3>
                <Button
                  type="default"
                  className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75"
                  onClick={() => {
                    nextStep(1);
                    nextSubStep(2);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <IconEdit />
                    <p>Edit</p>
                  </div>
                </Button>
              </div>

              {prevJobs?.questionContent?.map((rs: QuestionAddContentType, key: number) => {
                let icon: ReactNode;

                switch (rs.kind) {
                  case 'PRE_ANSWER':
                    icon = <IconQuestion />;
                    break;
                  case 'MULTI_CHOICE':
                    icon = <IconCheck />;
                    break;
                  case 'TEXT_BOX':
                    icon = <IconTextBox />;
                    break;
                  case 'SCALE_ANSWER':
                    icon = <IconCircle />;
                    break;
                  case 'UPLOAD_PORTFOLIO':
                    icon = <IconUpload />;
                    break;
                }

                return (
                  <div
                    className="w-full border border-[#EDEFF1] rounded-lg bg-white h-12 px-6 mb-4 last:mb-0"
                    key={key}
                  >
                    <div className="flex items-center gap-3 w-full h-full">
                      <div className="pt-1">{icon}</div>
                      <p className="text-base text-[#101828] w-full whitespace-nowrap overflow-hidden text-ellipsis">
                        {rs.question}
                      </p>
                    </div>
                  </div>
                );
              })}
            </Card>
          )}

          <Card className="!mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-black">Add Intro Video</h3>
              <Button
                type="default"
                className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75"
                onClick={() => {
                  nextStep(2);
                  nextSubStep(3);
                }}
              >
                <div className="flex items-center gap-2">
                  <IconEdit />
                  <p>Edit</p>
                </div>
              </Button>
            </div>
            <Form.Item label="Video Title">
              <Input className="!h-10" value={prevJobs?.videoQuestionTitle} readOnly />
            </Form.Item>
            <Form.Item label="Video Description">
              <Input.TextArea rows={10} value={prevJobs?.videoQuestionDescription} readOnly />
            </Form.Item>
            <video className="object-cover rounded-3xl w-full" controls>
              {prevJobs?.videoQuestionFile && prevJobs?.videoQuestionFile?.size && (
                <source src={URL.createObjectURL(prevJobs?.videoQuestionFile as File)} type="video/mp4" />
              )}
            </video>
          </Card>
          <Card className="!mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-black">Candidates Video Answer</h3>
              <Button
                type="default"
                className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75"
                onClick={() => {
                  nextStep(2);
                  nextSubStep(4);
                }}
              >
                <div className="flex items-center gap-2">
                  <IconEdit />
                  <p>Edit</p>
                </div>
              </Button>
            </div>
            <Form.Item label="Select template">
              <Input className="!h-10" value={prevJobs?.videoQuestionTemplateId} readOnly />
            </Form.Item>

            {prevJobs?.candidateVideoQuestions?.map((rs: VideoQuestionAddContentType, key: number) => (
              <Card bodyStyle={{ padding: '20px' }} key={key} className="!mb-4 last:!mb-0">
                <p className="text-sm text-black font-semibold">Question {key + 1}</p>
                <p className="text-base text-black font-medium w-full whitespace-nowrap overflow-hidden text-ellipsis border-b border-[#EDEFF1] leading-[30px] mb-2">
                  {rs?.title}
                </p>
                <p className="text-base text-[#00000099] leading-[30px] border-b border-[#EDEFF1] mb-2">
                  Answer Type: <span className="text-black font-medium">Video answer</span>
                </p>
                <div className="flex items-center gap-9">
                  <div className="flex items-center gap-[10px]">
                    <IconLight />
                    <p className="text-base text-black font-medium">{rs?.thinkingTime}</p>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <IconVideo />
                    <p className="text-base text-black font-medium">{rs?.answerTime}</p>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <IconRepeat />
                    <p className="text-base text-black font-medium">{rs?.totalTakes}x Takes</p>
                  </div>
                </div>
              </Card>
            ))}
          </Card>
          <Card className="!mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-black">Select Workflow</h3>
              <Button
                type="default"
                className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75"
                onClick={() => {
                  nextStep(3);
                  nextSubStep(5);
                }}
              >
                <div className="flex items-center gap-2">
                  <IconEdit />
                  <p>Edit</p>
                </div>
              </Button>
            </div>
            <Card className="!mb-4">
              <p className="text-sm font-semibold text-black mb-4">Applicants Step</p>

              {prevJobs?.jobPipeline?.[0]?.stageList?.map((rs: WorkflowStageType, key: number) => (
                <Card bodyStyle={{ padding: '10px 14px 10px 28px' }} key={key} className="!mb-4 last:!mb-0">
                  <div className="flex items-center gap-2">
                    <p className="text-base text-[#101828] font-medium">{rs.stageName}</p>

                    {rs.stageTypeName !== 'No type' && (
                      <Tag
                        color={`${
                          rs.stageTypeColor
                            ? rs.stageTypeColor
                            : rs.stageName === 'Sourced'
                            ? '#F2F4F7'
                            : rs.stageName === 'Hired'
                            ? '#78BA44'
                            : ''
                        }`}
                      >
                        <span className="text-[10px] !text-[#0E181C] font-medium">{rs.stageTypeName}</span>
                      </Tag>
                    )}
                  </div>
                  <div className="flex items-center gap-2"></div>
                </Card>
              ))}
            </Card>
            <Card className="!mb-4">
              <p className="text-sm font-semibold text-black mb-4">Active process</p>

              {prevJobs?.jobPipeline?.[1]?.stageList?.map((rs: WorkflowStageType, key: number) => (
                <Card bodyStyle={{ padding: '10px 14px 10px 28px' }} key={key} className="!mb-4 last:!mb-0">
                  <div className="flex items-center gap-2">
                    <p className="text-base text-[#101828] font-medium">{rs.stageName}</p>

                    {rs.stageTypeName !== 'No type' && (
                      <Tag
                        color={`${
                          rs.stageTypeColor
                            ? rs.stageTypeColor
                            : rs.stageName === 'Sourced'
                            ? '#F2F4F7'
                            : rs.stageName === 'Hired'
                            ? '#78BA44'
                            : ''
                        }`}
                      >
                        <span className="text-[10px] !text-[#0E181C] font-medium">{rs.stageTypeName}</span>
                      </Tag>
                    )}
                  </div>
                  <div className="flex items-center gap-2"></div>
                </Card>
              ))}
            </Card>
            <Card>
              <p className="text-sm font-semibold text-black mb-4">Hires</p>

              {prevJobs?.jobPipeline?.[2]?.stageList?.map((rs: WorkflowStageType, key: number) => (
                <Card bodyStyle={{ padding: '10px 14px 10px 28px' }} key={key} className="!mb-4 last:!mb-0">
                  <div className="flex items-center gap-2">
                    <p className="text-base text-[#101828] font-medium">{rs.stageName}</p>

                    {rs.stageTypeName !== 'No type' && (
                      <Tag
                        color={`${
                          rs.stageTypeColor
                            ? rs.stageTypeColor
                            : rs.stageName === 'Sourced'
                            ? '#EDECEA'
                            : rs.stageName === 'Hired'
                            ? '#D4FF6F'
                            : ''
                        }`}
                      >
                        <span className="text-[10px] !text-white font-medium">{rs.stageTypeName}</span>
                      </Tag>
                    )}
                  </div>
                  <div className="flex items-center gap-2"></div>
                </Card>
              ))}
            </Card>
            <Divider />

            {prevJobs?.autoConfirmEmailStatus === '1' && (
              <>
                <Card
                  title={
                    <>
                      <Form.Item className="!my-4">
                        <Input className="!h-10" value={prevJobs?.autoEmailTemplate?.subject} readOnly />
                      </Form.Item>
                    </>
                  }
                >
                  <Form.Item>
                    <Input.TextArea
                      className="!h-[100px]"
                      rows={10}
                      value={prevJobs?.autoEmailTemplate?.body}
                      readOnly
                    />
                  </Form.Item>
                </Card>
              </>
            )}
          </Card>
        </Form>
      </div>
      <div className="flex items-center justify-between px-4 py-6">
        <Button
          type="default"
          className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75"
          onClick={() => {
            prevStep();
            prevSubStep();
          }}
        >
          Back
        </Button>
        <Button
          type="primary"
          className="!h-9 !bg-mainColor hover:!opacity-75 !flex !items-center"
          loading={isLoading}
          onClick={handlePublish}
        >
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm text-white font-semibold">Publish</p>
            <IconSend />
          </div>
        </Button>
      </div>
    </>
  );
}
