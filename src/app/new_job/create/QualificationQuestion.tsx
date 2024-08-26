'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Card, Form, Row, Col, Input, Divider, Switch, Button, Modal } from 'antd';

import { Alert, DialogContent, DialogLeftMenu, NewJobQuestionContent, useNewJob } from '@/components';
import { NewJobsProps, QuestionKindEnum, QuestionTitleEnum, type QuestionAddContentType } from '@/types/new_job';

import { PlusOutlined } from '@ant-design/icons';
import IconSpeaker from '@/assets/icons/speaker.svg';
import IconClose from '@/assets/icons/circle_border_close.svg';
import IconQuestion from '@/assets/icons/question.svg';
import IconCheck from '@/assets/icons/check_broken.svg';
import IconTextBox from '@/assets/icons/align-left.svg';
import IconCircle from '@/assets/icons/circle.svg';
import IconUpload from '@/assets/icons/upload-cloud.svg';

export default function QualificationQuestion() {
  const {
    form,
    selectQuestModule,
    modal,
    setModal,
    questModule,
    nextStep,
    nextSubStep,
    prevStep,
    prevSubStep,
    onSubmit,
    answerContent,
    jobs,
    step,
    addAnswerContent,
  } = useNewJob();

  const [alert, setAlert] = useState<boolean>(true);
  const [checkQuestion, setCheckQuestion] = useState<boolean>(jobs?.checkQuestion ? jobs?.checkQuestion : false);

  useEffect(() => {
    const questionContent: QuestionAddContentType[] = jobs?.questionContent || [];

    const contents: QuestionAddContentType[] = questionContent?.map((rs: QuestionAddContentType, key: number) => {
      let title = QuestionTitleEnum.empty;
      let icon: ReactNode;

      switch (rs.kind) {
        case 'PRE_ANSWER':
          title = QuestionTitleEnum.pre_answer;
          icon = <IconQuestion />;
          break;
        case 'MULTI_CHOICE':
          title = QuestionTitleEnum.multi_choice;
          icon = <IconCheck />;
          break;
        case 'TEXT_BOX':
          title = QuestionTitleEnum.text_box;
          icon = <IconTextBox />;
          break;
        case 'SCALE_ANSWER':
          title = QuestionTitleEnum.scale_answer;
          icon = <IconCircle />;
          break;
        case 'UPLOAD_PORTFOLIO':
          title = QuestionTitleEnum.upload_portfolio;
          icon = <IconUpload />;
          break;
      }
      return { ...rs, title, show: false, icon, id: key };
    });

    addAnswerContent(contents);
    if (questionContent?.length !== 0) setCheckQuestion(true);
  }, [step, jobs]);

  const handleQuestionChange = (checked: boolean) => {
    setCheckQuestion(checked);

    if (!checked) {
      selectQuestModule({ kind: QuestionKindEnum.empty, show: false, title: QuestionTitleEnum.empty, icon: <></> });
      form.resetFields();
      addAnswerContent([]);
    }
  };

  const handleSubmit = () => {
    const emailRequired = '1';
    const nameRequired = '1';
    const phoneRequired = '1';

    if (answerContent?.length === 0 && checkQuestion) {
      form.setFields([{ name: 'answerContent', errors: ['This is a required'], value: '' }]);
      return;
    }

    const questionContent = answerContent?.map((rs: QuestionAddContentType) => {
      const answers = rs.answers?.map((ans: { answer: string; id: number }, key: number) => ({
        answer: ans.answer,
        id: key,
      }));

      return {
        question: rs.question,
        required: rs.required,
        answers,
        kind: rs.kind,
      };
    });

    const submit = {
      emailRequired,
      nameRequired,
      phoneRequired,
      questionContent,
      checkQuestion,
    };

    void onSubmit(submit as NewJobsProps, { ...submit, questionContent: answerContent });
    nextStep();
    nextSubStep();
  };

  return (
    <>
      <Modal
        className="!p-0"
        width={820}
        centered
        title={
          <>
            <span className="text-xl text-[#0E181C] font-semibold">Add question module</span>
          </>
        }
        open={modal}
        closeIcon={
          <>
            <div className="!w-[22px] !h-[22px]">
              <IconClose />
            </div>
          </>
        }
        footer={<></>}
        onCancel={() => {
          setModal(false);
          selectQuestModule({ kind: QuestionKindEnum.empty });
        }}
      >
        <div className="border-t border-t-[#EFF1F4]">
          <Row>
            <Col span={10}>
              <DialogLeftMenu />
            </Col>
            <Col span={14}>
              <DialogContent />
            </Col>
          </Row>
        </div>
      </Modal>
      <Form
        className="!mb-8"
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ answers: [{ answer: '' }] }}
        id="form"
      >
        <div className="px-16 py-8 border-b border-b-[#EDEFF1]">
          <h1 className="text-2xl font-medium text-center mb-8">Qualification Question</h1>
          <Alert
            className="bg-[#FCF1D4] bg-opacity-60 border border-[#FCF1D4] mb-9"
            show={alert}
            icon={<IconSpeaker className="!w-5" />}
            value={
              <p className="text-[#785623] text-base leading-[20px]">
                You can add questions and answer models such as long answers, short answers, multiple choice, etc. by
                selecting the <span className="text-[#503917] font-semibold">"+"</span> icon. You can also use the{' '}
                <span className="text-[#503917] font-semibold">"Move"</span> icon to move the order of questions
              </p>
            }
            onClose={() => setAlert(false)}
          />
          <Card>
            <Form.Item
              name="nameRequired"
              label={
                <>
                  Full name<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                </>
              }
            >
              <Input placeholder="Full name" className="!h-10" readOnly />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  className="!mb-0"
                  name="emailRequired"
                  label={
                    <>
                      Your email<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                    </>
                  }
                >
                  <Input placeholder="Email" className="!h-10" readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phoneRequired"
                  label={
                    <>
                      Phone number<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                    </>
                  }
                >
                  <Input className="!pl-[80px] !h-10" placeholder="Phone" readOnly />
                </Form.Item>
                <div className="absolute top-[32px] h-10 border-r w-[70px] flex items-center justify-center">
                  <span className="text-base text-[#101828]">US</span>
                </div>
              </Col>
            </Row>
          </Card>
          <Divider />
          <div className="flex items-center gap-4 mb-6">
            <Switch onChange={handleQuestionChange} checked={checkQuestion} />
            <div>
              <p className="text-sm text-[#344054] font-medium leading-[20px]">Would you like to add a question?</p>
              <p className="text-sm text-[#475467] leading-[20px]">
                Lorem ipsum is placeholder text commonly used in the graphic
              </p>
            </div>
          </div>

          {checkQuestion && (
            <>
              <h3 className="text-lg font-medium mb-4">Add your question</h3>
              <NewJobQuestionContent form={form} />

              {!questModule.show && (
                <Form.Item name="answerContent">
                  <Button
                    type="dashed"
                    className="!w-full !h-11 !text-start !border-[#D0D5DD] !bg-[#F8F8F8]"
                    icon={<PlusOutlined className="!text-[#050505]" />}
                    onClick={() => {
                      setModal(true);
                      selectQuestModule({
                        kind: QuestionKindEnum.pre_answer,
                        title: QuestionTitleEnum.pre_answer,
                        icon: <IconQuestion />,
                      });
                    }}
                  >
                    <span className="text-[#050505] text-base">Add new question model here...</span>
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </div>
        <div className="flex items-center justify-between px-4 py-6">
          <Button
            type="default"
            className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75"
            onClick={() => {
              prevSubStep();
              prevStep();
            }}
            disabled={questModule.show}
          >
            Back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className={`!h-9 ${questModule.show ? '!bg-[#0000000a]' : '!bg-mainColor'} hover:!opacity-75`}
            disabled={questModule.show}
          >
            Next
          </Button>
        </div>
      </Form>
    </>
  );
}
