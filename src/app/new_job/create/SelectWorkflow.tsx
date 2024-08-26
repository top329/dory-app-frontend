'use client';

import { useState, useEffect } from 'react';
import { Button, Card, Divider, Form, Switch, Tooltip } from 'antd';

import { useSelector } from '@/features/store';
import { useLazyGetWorkflowByCompanyQuery } from '@/features/projects';

import {
  Alert,
  AutoConfirmationEmail,
  Select,
  StageActiveProcess,
  StageApplicants,
  StageHires,
  useNewJob,
  useWorkflow,
} from '@/components';

import { useNotifications } from '@/utils';
import { Option } from '@/types/global';
import { WORKFLOW_STAGE_TYPE, type WorkflowStageType } from '@/types/workflow';

import IconHelp from '@/assets/icons/help.svg';
import { PlusOutlined } from '@ant-design/icons';

export default function SelectWorkflow() {
  const { message } = useNotifications();
  const { form, prevStep, prevSubStep, onSubmit, nextStep, nextSubStep, jobs } = useNewJob();
  const { stageTimeLimit, stageModule, selectStageModule, addStageContent, stageContent } = useWorkflow();

  const { jobInit } = useSelector(state => state.newJob);
  const [getWorkflowData, { data: workflowData, isLoading }] = useLazyGetWorkflowByCompanyQuery();

  const [alert, setAlert] = useState<boolean>(true);
  const [activeConfirmEmail, setActiveConfirmEmail] = useState<boolean>(
    jobs?.activeConfirmEmail ? jobs?.activeConfirmEmail : false
  );

  useEffect(() => {
    const findWorkflowInit = jobInit?.workflows?.find((rs: Option) => rs.label === 'Default');

    if (!workflowData && findWorkflowInit?.id && stageContent?.applicantStep?.length === 0) {
      getWorkflowData(findWorkflowInit?.id as number);
    }

    if (!workflowData) return;

    if (workflowData?.code !== 200) {
      message.error(workflowData?.msg);
      return;
    }

    let applicantStep: WorkflowStageType[] = [];
    let activeProcess: WorkflowStageType[] = [];
    let hires: WorkflowStageType[] = [];

    if (stageContent?.applicantStep?.length !== 0) {
      addStageContent({ ...stageContent });
    } else {
      workflowData?.data?.pipelineContent?.filter(
        ({ stageKind, stageList }: { stageKind: string; stageList: WorkflowStageType[] }) => {
          if (stageKind === 'Applicants') {
            applicantStep = stageList.map((rs: WorkflowStageType, key: number) => {
              const findColor = WORKFLOW_STAGE_TYPE?.find((f: Option) => f.label === rs.stageTypeName);

              return {
                id: key,
                show: false,
                stageTypeColor: findColor?.color,
                ...rs,
              };
            });
          }

          if (stageKind === 'Active process') {
            activeProcess = stageList.map((rs: WorkflowStageType, key: number) => {
              const findColor = WORKFLOW_STAGE_TYPE?.find((f: Option) => f.label === rs.stageTypeName);

              return {
                id: key,
                show: false,
                stageTypeColor: findColor?.color,
                ...rs,
              };
            });
          }

          if (stageKind === 'Hires') {
            hires = stageList.map((rs: WorkflowStageType, key: number) => {
              const findColor = WORKFLOW_STAGE_TYPE?.find((f: Option) => f.label === rs.stageTypeName);

              return {
                id: key,
                show: false,
                stageTypeColor: findColor?.color,
                ...rs,
              };
            });
          }

          addStageContent({ applicantStep, activeProcess, hires });
        }
      );
    }
  }, [jobInit, workflowData, getWorkflowData]);

  const handleWorkflowStage = (item: Option) => {
    getWorkflowData(item?.id as number);
  };

  const handleSubmit = async (data: { subject: string; body: string }) => {
    let isValidate = false;

    if (stageContent?.activeProcess?.length === 0) {
      form.setFields([{ name: 'activeProcess', errors: ['This is a required'], value: '' }]);
      isValidate = true;
    }

    if (stageContent?.hires?.length === 0) {
      form.setFields([{ name: 'hires', errors: ['This is a required'], value: '' }]);
      isValidate = true;
    }

    if (activeConfirmEmail) {
      if (!data?.subject || data?.subject === '') {
        form.setFields([{ name: 'subject', errors: ['This is a required field.'] }]);
        isValidate = true;
      }

      if (!data?.body || data?.body === '') {
        form.setFields([{ name: 'body', errors: ['This is a required field.'] }]);
        isValidate = true;
      }
    }

    if (isValidate) return;

    const applicantStep = {
      stageKind: 'Applicants',
      stageList: stageContent?.applicantStep?.map((rs: WorkflowStageType) => {
        const findLimit = stageTimeLimit.find((f: Option) => f.label === rs.timeLimit);

        return {
          stageName: rs.stageName,
          stageTypeName: rs.stageTypeName,
          stageTypeColor: rs.stageTypeColor,
          timeLimit: findLimit?.value || '0',
          fairEvaluation: rs.fairEvaluation,
        };
      }),
    };

    const activeProcess = {
      stageKind: 'Active process',
      stageList: stageContent?.activeProcess?.map((rs: WorkflowStageType) => {
        const findLimit = stageTimeLimit.find((f: Option) => f.label === rs.timeLimit);

        return {
          stageName: rs.stageName,
          stageTypeName: rs.stageTypeName,
          stageTypeColor: rs.stageTypeColor,
          timeLimit: findLimit?.value || '0',
          fairEvaluation: rs.fairEvaluation,
        };
      }),
    };

    const hires = {
      stageKind: 'Hires',
      stageList: stageContent?.hires?.map((rs: WorkflowStageType) => {
        const findLimit = stageTimeLimit.find((f: Option) => f.label === rs.timeLimit);

        return {
          stageName: rs.stageName,
          stageTypeName: rs.stageTypeName,
          stageTypeColor: rs.stageTypeColor,
          timeLimit: findLimit?.value || '0',
          fairEvaluation: rs.fairEvaluation,
        };
      }),
    };

    const jobPipeline: { stageKind: string; stageList: WorkflowStageType[] }[] = [
      applicantStep as { stageKind: string; stageList: WorkflowStageType[] },
      activeProcess as { stageKind: string; stageList: WorkflowStageType[] },
      hires as { stageKind: string; stageList: WorkflowStageType[] },
    ];
    const autoEmailTemplate = { subject: data?.subject, body: data?.body };
    await onSubmit(
      {
        jobPipeline,
        autoConfirmEmailStatus: activeConfirmEmail ? '1' : '0',
        ...(activeConfirmEmail ? { autoEmailTemplate } : {}),
        activeConfirmEmail,
      },
      {
        jobPipeline: [
          { stageKind: 'Applicants', stageList: stageContent?.applicantStep as WorkflowStageType[] },
          { stageKind: 'Active process', stageList: stageContent?.activeProcess as WorkflowStageType[] },
          { stageKind: 'Hires', stageList: stageContent?.hires as WorkflowStageType[] },
        ],
        autoConfirmEmailStatus: activeConfirmEmail ? '1' : '0',
        autoEmailTemplate,
      }
    );

    nextStep();
    nextSubStep();
  };

  return (
    <Form className="!mb-8" form={form} layout="vertical" onFinish={handleSubmit} id="form">
      <div className="px-6 pt-8 pb-[84px] border-b border-b-[#EDEFF1]">
        <div className="flex items-center justify-between mb-6 w-full">
          <div>
            <h1 className="text-2xl font-medium mb-2">Workflow Settings</h1>
            <p className="text-sm text-[#4D6670]">Last edit 5mins ago</p>
          </div>
        </div>
        <Alert
          className="bg-[#FCF1D4] bg-opacity-60 border border-[#FCF1D4] mb-6"
          show={alert}
          value={
            <p className="text-[#785623] text-base leading-[20px]">
              Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries
            </p>
          }
          onClose={() => setAlert(false)}
        />
        <Card className="!mb-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl text-black font-medium mb-[6px]">General Workflow</h1>
              <p className="text-base text-[#4D6670]">Lorem ipsum is placeholder text commonly used in the graphic</p>
            </div>
            <div>
              <Select
                options={jobInit?.workflows as Option[]}
                className="min-w-[150px] w-full h-10 cursor-pointer"
                value="Default"
                searchable={true}
                menuStatus={true}
                onChangeValue={handleWorkflowStage}
              />
            </div>
          </div>
          <Card className="!mb-4" bodyStyle={{ padding: '24px 0' }}>
            <div className="w-full h-[34px] pl-5 bg-[#F4F3F3] flex items-center gap-2 mb-4">
              <p className="text-sm font-semibold text-black">Applicants Step</p>
              <Tooltip title="Stages that show you the candidate's origin">
                <div className="cursor-pointer">
                  <IconHelp />
                </div>
              </Tooltip>
            </div>
            <div className="px-4">
              <StageApplicants form={form} loading={isLoading} />
            </div>
          </Card>
          <Card className="!mb-4" bodyStyle={{ padding: '24px 0' }}>
            <div className="w-full h-[34px] pl-5 bg-[#F4F3F3] flex items-center gap-1 mb-4">
              <p className="text-sm font-semibold text-black">Active process</p>
              <Tooltip title="Stages that reflect the hiring process at your company">
                <div className="cursor-pointer">
                  <IconHelp />
                </div>
              </Tooltip>
            </div>
            <div className="px-4">
              <StageActiveProcess form={form} loading={isLoading} />
            </div>
            <Divider />

            {!stageModule?.activeProcess?.show && (
              <Form.Item name="activeProcess" className="!px-4 !mb-0">
                <Button
                  type="dashed"
                  className="!w-full !h-11 !text-start !border-[#EAE7E6] !bg-[#F8F8F8]"
                  icon={<PlusOutlined className="!text-[#050505]" />}
                  onClick={() => {
                    selectStageModule({ activeProcess: { show: true } });
                  }}
                >
                  <span className="text-[#050505] text-base">Add new workflow...</span>
                </Button>
              </Form.Item>
            )}
          </Card>
          <Card bodyStyle={{ padding: '24px 0' }}>
            <div className="w-full h-[34px] pl-5 bg-[#F4F3F3] flex items-center gap-1 mb-4">
              <p className="text-sm font-semibold text-black">Hires</p>
              <Tooltip title="Stages for hired candidates">
                <div className="cursor-pointer">
                  <IconHelp />
                </div>
              </Tooltip>
            </div>
            <div className="px-4">
              <StageHires form={form} loading={isLoading} />
            </div>
            <Divider />

            {!stageModule?.hires?.show && (
              <Form.Item name="hires" className="!px-4 !mb-0">
                <Button
                  type="dashed"
                  className="!w-full !h-11 !text-start !border-[#EAE7E6] !bg-[#F8F8F8]"
                  icon={<PlusOutlined className="!text-[#050505]" />}
                  onClick={() => {
                    selectStageModule({ hires: { show: true } });
                  }}
                >
                  <span className="text-[#050505] text-base">Add new workflow...</span>
                </Button>
              </Form.Item>
            )}
          </Card>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-start gap-2 mb-2">
                <Switch checked={activeConfirmEmail} onChange={(checked: boolean) => setActiveConfirmEmail(checked)} />
                <div>
                  <h1 className="font-medium">Auto-Confirmation email</h1>
                  <p className="text-[#475467]">Lorem ipsum is placeholder text commonly used in the graphic</p>
                </div>
              </div>
            </div>
            <div>
              <Select
                options={[]}
                className="min-w-[150px] w-full h-10 cursor-pointer"
                value="Default"
                searchable={true}
                menuStatus={true}
              />
            </div>
          </div>

          {activeConfirmEmail && <AutoConfirmationEmail form={form} />}
        </Card>
      </div>
      <div className="flex items-center justify-between px-4 py-6">
        <Button
          type="default"
          className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75"
          onClick={() => {
            prevStep();
            prevSubStep();
          }}
          disabled={stageModule?.applicantStep?.show || stageModule?.activeProcess?.show || stageModule?.hires?.show}
        >
          Back
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className={`!h-9 ${
            stageModule?.applicantStep?.show || stageModule?.activeProcess?.show || stageModule?.hires?.show
              ? '!bg-[#0000000a]'
              : '!bg-mainColor'
          } hover:!opacity-75`}
          disabled={stageModule?.applicantStep?.show || stageModule?.activeProcess?.show || stageModule?.hires?.show}
        >
          Next
        </Button>
      </div>
    </Form>
  );
}
