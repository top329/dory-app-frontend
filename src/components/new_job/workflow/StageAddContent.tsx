'use client';

import { ChangeEvent, useEffect } from 'react';
import { Button, Card, Col, Divider, Dropdown, Form, FormInstance, Input, Row, Space, Tooltip } from 'antd';

import { Alert, Select, useNewJob, useWorkflow } from '@/components';

import { WORKFLOW_STAGE_TYPE, type WorkflowStageType } from '@/types/workflow';
import { Option } from '@/types/global';

import IconHelp from '@/assets/icons/help.svg';
import IconInfo from '@/assets/icons/info-circle.svg';
import { ThunderboltOutlined } from '@ant-design/icons';

export default function StageAddContent({ form }: { form: FormInstance<any> }) {
  const { stageTimeLimit, workflowActionItems, stageModule, selectStageModule, stageContent, addStageContent } = useWorkflow();

  useEffect(() => {
    if (stageModule.applicantStep?.show) {
      form.setFieldValue('stageName', stageModule?.applicantStep?.stageName || 'Sourced');
      form.setFieldValue('stageTypeName', stageModule?.applicantStep?.stageTypeName || 'Sourced');
      form.setFieldValue('timeLimit', stageModule?.applicantStep?.timeLimit || 'No time limit');
    }

    if (stageModule.activeProcess?.show) {
      form.setFieldValue('stageName', stageModule?.activeProcess?.stageName || '');
      form.setFieldValue('stageTypeName', stageModule?.activeProcess?.stageTypeName || 'No type');
      form.setFieldValue('timeLimit', stageModule?.activeProcess?.timeLimit || 'No time limit');
    }

    if (stageModule.hires?.show) {
      form.setFieldValue('stageName', stageModule?.hires.stageName || '');
      form.setFieldValue('stageTypeName', stageModule?.hires.stageTypeName || 'Hired');
      form.setFieldValue('timeLimit', stageModule?.hires.timeLimit || 'No time limit');
    }
  }, [stageModule, selectStageModule]);

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      form.setFields([{ name: e.target.id, errors: undefined, value: e.target.value }]);
    } else {
      form.setFields([{ name: e.target.id, errors: ['This is a required field.'], value: '' }]);
    }
  };

  const handleCancel = () => {
    stageModule?.applicantStep?.show && selectStageModule({ applicantStep: { show: false } });
    stageModule?.activeProcess?.show && selectStageModule({ activeProcess: { show: false } });
    stageModule?.hires?.show && selectStageModule({ hires: { show: false } });

    form.resetFields();
  };
  const handleSave = () => {
    let isValidate = false;
    let id: number = 0;
    const fields = form.getFieldsValue();

    if (!fields.stageName || fields.stageName === '') {
      form.setFields([{ name: 'stageName', errors: ['This is a required field.'], value: '' }]);
      isValidate = true;
    }

    if (isValidate) return;

    if (stageModule?.applicantStep?.show) {
      if (!stageModule?.applicantStep?.stageName) {
        id = stageContent?.applicantStep?.length as number;
      } else {
        id = stageModule?.applicantStep?.id as number;
      }
    }

    if (stageModule?.activeProcess?.show) {
      if (!stageModule?.activeProcess?.stageName) {
        id = stageContent?.activeProcess?.length as number;
      } else {
        id = stageModule?.activeProcess?.id as number;
      }
    }

    if (stageModule?.hires?.show) {
      if (!stageModule?.hires?.stageName) {
        id = stageContent?.hires?.length as number;
      } else {
        id = stageModule?.hires?.id as number;
      }
    }

    const findColor = WORKFLOW_STAGE_TYPE.find((f: Option) => f.label === fields.stageTypeName);

    const submit: WorkflowStageType = {
      id,
      show: false,
      stageName: fields.stageName,
      stageTypeName: fields.stageTypeName,
      timeLimit: fields.timeLimit,
      stageTypeColor: findColor?.color,
    };

    if (stageModule?.applicantStep?.show) {
      if (!stageModule?.applicantStep?.stageName) {
        addStageContent({
          applicantStep: [...(stageContent?.applicantStep as WorkflowStageType[]), submit],
          activeProcess: stageContent?.activeProcess,
          hires: stageContent?.hires,
        });
      } else if (stageContent?.applicantStep) {
        const arrData = [...stageContent.applicantStep];
        const stageId = stageModule?.applicantStep?.id as number;
        arrData[stageId] = submit;
        addStageContent({ ...stageContent, applicantStep: arrData });
      }

      selectStageModule({ applicantStep: { show: false } });
    }

    if (stageModule?.activeProcess?.show) {
      if (!stageModule?.activeProcess?.stageName) {
        addStageContent({
          activeProcess: [...(stageContent?.activeProcess as WorkflowStageType[]), submit],
          applicantStep: stageContent?.applicantStep,
          hires: stageContent?.hires,
        });
      } else if (stageContent?.activeProcess) {
        const arrData = [...stageContent.activeProcess];
        const stageId = stageModule?.activeProcess?.id as number;
        arrData[stageId] = submit;
        addStageContent({ ...stageContent, activeProcess: arrData });
      }

      selectStageModule({ activeProcess: { show: false } });
    }

    if (stageModule?.hires?.show) {
      if (!stageModule?.hires?.stageName) {
        addStageContent({
          hires: [...(stageContent?.hires as WorkflowStageType[]), submit],
          applicantStep: stageContent?.applicantStep,
          activeProcess: stageContent?.activeProcess,
        });
      } else if (stageContent?.hires) {
        const arrData = [...stageContent.hires];
        const stageId = stageModule?.hires?.id as number;
        arrData[stageId] = submit;
        addStageContent({ ...stageContent, hires: arrData });
      }

      selectStageModule({ hires: { show: false } });
    }

    form.resetFields();
  };

  return (
    <>
      <Card className="!bg-[#F9FBFC] !border-[#EDEFF1]">
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="stageName"
              label={
                <>
                  Stage name<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                </>
              }
            >
              <Input className="!h-10" placeholder="Type stage name" onChange={handleInputValue} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="stageTypeName"
              label={
                <div className="flex items-center gap-2">
                  <p>Type</p>
                  <Tooltip title="Select a stage type to connect this stage's data to reports.">
                    <div className="cursor-pointer">
                      <IconHelp />
                    </div>
                  </Tooltip>
                </div>
              }
            >
              <Select
                form={form}
                options={WORKFLOW_STAGE_TYPE}
                className="w-full h-10 cursor-pointer bg-white"
                placeholder="Select"
                searchable={false}
                disabled={stageModule?.applicantStep?.show || stageModule?.hires?.show}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="timeLimit"
              label={
                <div className="flex items-center gap-2">
                  <p>Time limit</p>
                  <Tooltip title="Choose how long candidates should stay in this stage and receive reminders when they reach that limit.">
                    <div className="cursor-pointer">
                      <IconHelp />
                    </div>
                  </Tooltip>
                </div>
              }
            >
              <Select form={form} options={stageTimeLimit} className="w-full h-10 cursor-pointer bg-white" placeholder="Select" searchable={false} />
            </Form.Item>
          </Col>
        </Row>

        {stageModule?.applicantStep?.show && (
          <Alert
            show={true}
            icon={<IconInfo />}
            className="flex items-center !gap-2 !p-0"
            value={
              <p className="text-sm text-[#121317]">
                Candidates sourced via extension show in this stage. Stage only appears when there is a sourced candidate.
              </p>
            }
          />
        )}

        <Dropdown menu={{ items: workflowActionItems }} trigger={['click']}>
          <Space className="cursor-pointer py-2">
            <Button type="primary" className="!bg-[#EF9575] hover:!opacity-75 !h-10" icon={<ThunderboltOutlined />}>
              <span className="text-sm font-semibold">Add Automated Action</span>
            </Button>
          </Space>
        </Dropdown>
        <Divider />
        <div className="flex items-center justify-end gap-4">
          <Button type="default" className="!border-gray-300 !text-[#344054] hover:!opacity-75" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" className="!bg-mainColor hover:!opacity-75" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Card>
    </>
  );
}
