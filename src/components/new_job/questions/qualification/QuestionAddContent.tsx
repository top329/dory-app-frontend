'use client';

import { ChangeEvent, useState, useEffect } from 'react';

import { Dropdown, Space, Button, Form, Input } from 'antd';
import type { FormInstance, FormListFieldData, MenuProps } from 'antd';
import { AnswerItem, useNewJob } from '@/components';
import { QuestionKindEnum, QuestionTitleEnum, type QuestionAddContentType } from '@/types/new_job';

import IconDown from '@/assets/icons/arrow_down.svg';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

export default function QuestionAddContent({ form }: { form: FormInstance<any> }) {
  const { selectQuestModule, questModule, addAnswerContent, answerContent } = useNewJob();

  const [indicatorOption, setIndicatorOption] = useState<string>('');

  const indicator: MenuProps['items'] = [
    {
      label: (
        <Button type="link" className="!text-[#344054] !text-sm !px-0" onClick={() => setIndicatorOption('Required')}>
          Required
        </Button>
      ),
      key: 'required',
    },
    {
      label: (
        <Button type="link" className="!text-[#344054] !text-sm !px-0" onClick={() => setIndicatorOption('Optional')}>
          Optional
        </Button>
      ),
      key: 'optional',
    },
  ];

  useEffect(() => {
    setIndicatorOption(questModule?.required ? questModule?.required : 'Optional');

    if (questModule?.question) {
      form.setFieldValue('question', questModule?.question);
      form.setFieldValue('answers', questModule?.answers);
    }
  }, [form, questModule]);

  const handleChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      form.setFields([{ name: e.target.id, errors: undefined, value: e.target.value }]);
    } else {
      form.setFields([{ name: e.target.id, errors: ['This is a required field.'], value: '' }]);
    }
  };

  const handleCancel = () => {
    selectQuestModule({ kind: QuestionKindEnum.empty, show: false, title: QuestionTitleEnum.empty, icon: <></> });
    setIndicatorOption('Optional');
    form.resetFields();
  };

  const handleSave = () => {
    let isValidate = false;
    const fields = form.getFieldsValue();

    if ((!fields.question || fields.question === '') && questModule.kind !== QuestionKindEnum.upload_portfolio) {
      form.setFields([{ name: 'question', errors: ['This is a required field.'], value: '' }]);
      isValidate = true;
    }

    if (questModule.kind !== QuestionKindEnum.text_box && questModule.kind !== QuestionKindEnum.upload_portfolio) {
      fields.answers.filter((rs: any, key: number) => {
        if (!rs?.answer || rs?.answer === '') {
          form.setFields([{ name: ['answers', key, 'answer'], errors: ['This is a required field.'], value: '' }]);
          isValidate = true;
        }
      });
    }

    if (isValidate) return;

    const submit: QuestionAddContentType = {
      ...questModule,
      ...(!questModule?.question ? { id: answerContent?.length } : { ...questModule }),
      show: false,
      question: fields.question,
      required: indicatorOption === 'Required' ? 'Required' : 'Optional',
      answers: fields.answers ? fields.answers?.map((rs: any) => ({ answer: rs.answer })) : [],
    };

    if (!questModule?.question) {
      const resSubmit = { ...submit, ...(questModule?.kind === QuestionKindEnum.upload_portfolio && { question: 'Upload CV/portfolio' }) };
      addAnswerContent([...answerContent, resSubmit]);
    } else {
      answerContent[questModule?.id as number] = {
        ...submit,
        ...(questModule?.kind === QuestionKindEnum.upload_portfolio && { question: 'Upload CV/portfolio' }),
      };
      addAnswerContent(answerContent);
    }

    selectQuestModule({ kind: QuestionKindEnum.empty, show: false, title: QuestionTitleEnum.empty, icon: <></> });
    setIndicatorOption('Optional');
    form.resetFields();
  };

  return (
    <div className="w-full border border-[#EDEFF1] rounded-lg bg-[#F9FBFC]">
      <div className="w-full px-3 h-12 border-b border-b-[#EDEFF1] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {questModule.icon}
          <span className="text-base font-medium">{questModule.title}</span>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Dropdown menu={{ items: indicator }} trigger={['click']}>
            <Space className="cursor-pointer py-2 gap-3">
              <p className="text-sm leading-5 font-semibold text-[#344054]">{indicatorOption}</p>
              <IconDown className="mt-1" />
            </Space>
          </Dropdown>
          <Button type="link" icon={<CloseOutlined className="!text-[#344054]" />} onClick={handleCancel} />
        </div>
      </div>

      {questModule.kind !== QuestionKindEnum.upload_portfolio && (
        <div className="p-4 border-b border-b-[#EDEFF1]">
          <Form.Item
            className="!mb-0"
            name="question"
            label={
              <>
                Question<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
              </>
            }
          >
            <Input className="!h-9" onChange={handleChangeQuestion} />
          </Form.Item>
        </div>
      )}

      {questModule.kind !== QuestionKindEnum.text_box && questModule.kind !== QuestionKindEnum.upload_portfolio && (
        <div className="p-4 border-b border-b-[#EDEFF1]">
          <h3 className="text-base font-medium mb-2">Answer</h3>
          <Form.List name="answers">
            {(fields, { add, remove, move }) => {
              const moveCard = (dragIndex: number, hoverIndex: number) => {
                move(dragIndex, hoverIndex);
              };

              return (
                <>
                  {fields.map((field: FormListFieldData) => (
                    <AnswerItem
                      key={field.key}
                      id={field.key}
                      index={field.key}
                      field={field}
                      remove={remove}
                      moveCard={moveCard}
                      totalCnt={fields.length}
                      form={form}
                    />
                  ))}

                  <Button type="default" className="!border-gray-300 !text-[#344054] mt-4" icon={<PlusOutlined />} onClick={add}>
                    Add Answer
                  </Button>
                </>
              );
            }}
          </Form.List>
        </div>
      )}

      <div className="px-4 py-3 flex items-center justify-end gap-4">
        <Button type="default" className="!border-gray-300 !text-[#344054] hover:!opacity-75" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="primary" className="!bg-mainColor hover:!opacity-75" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
