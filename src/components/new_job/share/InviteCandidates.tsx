'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Tabs } from 'antd';

import { useSetCreateNewJobsMutation } from '@/features/projects';
import { useAuth, useNewJob } from '@/components';
import SignaturePad from 'react-signature-canvas';

import Candidates from './invite/Candidates';
import Status from './invite/Status';
import { blobToFile } from '@/utils';

import type { InviteCandidatesProps } from '@/app/new_job/create/ShareJob';
import { Option, SCHEDULE, SCHEDULE_TIME } from '@/types/global';
import { NewJobsProps } from '@/types/new_job';

const initialValues = {
  individualContent: [{ name: '', email: '', code: 'US', phone: '' }],
  reminderEmail: [{ schedule: '', scheduleTime: '', reminderSubject: '', reminderBody: '' }],
  reminderSms: [{ schedule: '', scheduleTime: '', reminderSubject: '', reminderBody: '' }],
};

export default function InviteCandidates({ shareOpen, shareJobKind, setShareOpen }: InviteCandidatesProps) {
  const router = useRouter();
  const { member } = useAuth();
  const { form, onSubmit, jobs } = useNewJob();
  const [setUpdateNewJobs, { isLoading }] = useSetCreateNewJobsMutation();

  const jobId = typeof window !== 'undefined' && window.localStorage.getItem('jobId');

  const signRef = useRef<SignaturePad | null>(null);
  const [tabTxt, setTabTxt] = useState<string>('Invite Candidates');
  const [candidateKind, setCandidateKind] = useState<string>('Individual');
  const [individualKind, setIndividualKind] = useState<string>('Invite Email');
  const [activeTab, setActiveTab] = useState<string>('Draw it in');
  const [errorCountry, setErrorCountry] = useState<boolean>(false);

  const tabList = [
    {
      key: 'Invite Candidates',
      label: <p className="text-base font-medium">Invite Candidates</p>,
      children: (
        <Candidates
          form={form}
          tabTxt={tabTxt}
          signRef={signRef}
          candidateKind={candidateKind}
          setCandidateKind={setCandidateKind}
          individualKind={individualKind}
          setIndividualKind={setIndividualKind}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          errorCountry={errorCountry}
          setErrorCountry={setErrorCountry}
        />
      ),
    },
    {
      key: 'Invite Status',
      label: <p className="text-base font-medium">Invite Status</p>,
      children: <Status />,
    },
  ];

  useEffect(() => {
    form.resetFields();
  }, [shareOpen, shareJobKind]);

  const handleChangeTab = (key: string) => {
    form.resetFields();
    setTabTxt(key);
  };

  const handleSubmit = async (data: any) => {
    let isValidate = false;
    let shareKind = '1';
    let shareNotificationKind = '1';
    let shareNotificationContent = [];

    if (candidateKind === 'Individual') {
      shareKind = '1';

      data?.individualContent?.filter((rs: { name: string; email: string; code: string; phone: string }, key: number) => {
        if (!rs.name || rs.name === '') {
          form.setFields([{ name: ['individualContent', key, 'name'], errors: ['This is a required field.'], value: '' }]);
          isValidate = true;
        }

        if (!rs.email || rs.email === '') {
          form.setFields([{ name: ['individualContent', key, 'email'], errors: ['This is a required field.'], value: '' }]);
          isValidate = true;
        }

        if (!rs.phone || rs.phone === '') {
          form.setFields([{ name: ['individualContent', key, 'phone'], errors: ['This is a required field.'], value: '' }]);
          isValidate = true;
        }
      });
    }

    if (candidateKind === 'Bulk Upload') {
      shareKind = '2';

      if (!data?.bulkUploadFile || data?.bulkUploadFile?.length === 0) {
        form.setFields([{ name: 'bulkUploadFile', errors: ['This is a required field.'], value: undefined }]);
        isValidate = true;
      }
    }

    if (candidateKind === 'Direct Link') {
      shareKind = '3';
    }

    if (!data?.jobDeadline || data?.jobDeadline === '') {
      form.setFields([{ name: 'jobDeadline', errors: ['This is a required field.'], value: '' }]);
      isValidate = true;
    }

    if (!data?.jobShareCountry || data?.jobShareCountry === '') {
      form.setFields([{ name: 'jobShareCountry', errors: ['This is a required field.'], value: '' }]);
      setErrorCountry(true);
      isValidate = true;
    }

    if (individualKind === 'Invite Email') {
      shareNotificationKind = '1';

      if (!data?.subjectEmail || data?.subjectEmail === '') {
        form.setFields([{ name: 'subjectEmail', errors: ['This is a required field.'], value: '' }]);
        isValidate = true;
      }

      if (!data?.bodyEmail || data?.bodyEmail === '') {
        form.setFields([{ name: 'bodyEmail', errors: ['This is a required field.'], value: '' }]);
        isValidate = true;
      }

      shareNotificationContent.push({ subjectEmail: data?.subjectEmail, bodyEmail: data?.bodyEmail });
    }

    if (individualKind === 'Invite SMS') {
      shareNotificationKind = '2';

      if (!data?.bodySms || data?.bodySms === '') {
        form.setFields([{ name: 'bodySms', errors: ['This is a required field.'], value: '' }]);
        isValidate = true;
      }

      shareNotificationContent.push({ bodySms: data?.bodySms });
    }

    if (individualKind === 'Reminder Emails') {
      shareNotificationKind = '3';

      data?.reminderEmail?.filter((rs: { schedule: string; scheduleTime: string; reminderSubject: string; reminderBody: string }, key: number) => {
        if (!rs.reminderSubject || rs.reminderSubject === '') {
          form.setFields([{ name: ['reminderEmail', key, 'reminderSubject'], errors: ['This is a required field.'], value: '' }]);
          isValidate = true;
        }

        if (!rs.reminderBody || rs.reminderBody === '') {
          form.setFields([{ name: ['reminderEmail', key, 'reminderBody'], errors: ['This is a required field.'], value: '' }]);
          isValidate = true;
        }

        const findSchedule = SCHEDULE.find((f: Option) => f.label === rs.schedule);
        const findScheduleTime = SCHEDULE_TIME.find((f: Option) => f.label === rs.scheduleTime);

        shareNotificationContent.push({
          schedule: findSchedule?.value,
          scheduleTime: findScheduleTime?.value,
          reminderSubject: rs.reminderSubject,
          reminderBody: rs.reminderBody,
        });
      });
    }

    if (individualKind === 'Reminder SMS') {
      shareNotificationKind = '4';

      data?.reminderSms?.filter((rs: { schedule: string; scheduleTime: string; reminderSubject: string; reminderBody: string }, key: number) => {
        if (!rs.reminderSubject || rs.reminderSubject === '') {
          form.setFields([{ name: ['reminderSms', key, 'reminderSubject'], errors: ['This is a required field.'], value: '' }]);
          isValidate = true;
        }

        if (!rs.reminderBody || rs.reminderBody === '') {
          form.setFields([{ name: ['reminderSms', key, 'reminderBody'], errors: ['This is a required field.'], value: '' }]);
          isValidate = true;
        }

        const findSchedule = SCHEDULE.find((f: Option) => f.label === rs.schedule);
        const findScheduleTime = SCHEDULE_TIME.find((f: Option) => f.label === rs.scheduleTime);

        shareNotificationContent.push({
          schedule: findSchedule?.value,
          scheduleTime: findScheduleTime?.value,
          reminderSubject: rs.reminderSubject,
          reminderBody: rs.reminderBody,
        });
      });
    }

    if (isValidate) return;

    const shareCandidateInfo = data?.individualContent?.map((rs: { name: string; email: string; code: string; phone: string }) => ({
      name: rs.name,
      email: rs.email,
      code: rs.code,
      phone: rs.phone,
    }));

    let submit: NewJobsProps = {
      jobDeadline: `${data?.jobDeadline?.$y}-${data?.jobDeadline?.$M + 1}-${data?.jobDeadline?.$D}`,
      jobShareCountry: data?.jobShareCountry,
      shareKind,
      shareNotificationKind,
      shareCandidateInfo: data?.individualContent ? JSON.stringify(shareCandidateInfo) : '',
      shareNotificationContent: JSON.stringify(shareNotificationContent),
      bulkUploadFile: data?.bulkUploadFile && data?.bulkUploadFile?.length !== 0 ? data?.bulkUploadFile?.[0]?.originFileObj : null,
    };

    if (individualKind === 'Invite Email' && activeTab === 'Draw it in') {
      signRef?.current?.getTrimmedCanvas().toBlob(async rs => {
        const signFile = blobToFile(rs as Blob, 'sign.png');

        submit = {
          ...submit,
          inviteEmailSignFile: signFile?.size > 81 ? signFile : null,
        };

        await onSubmit(submit);
        await setUpdateNewJobs({ ...jobs, ...submit, companyId: member?.companyId.toString(), jobId: jobId as string });

        if (!isLoading) {
          setTimeout(() => {
            router.replace('/jobs');
            if (setShareOpen) setShareOpen(false);
          }, 500);
        }
      }, 'image/png');
    } else {
      const signFile = data?.inviteEmailSignFile && data?.inviteEmailSignFile?.length !== 0 ? data?.inviteEmailSignFile?.[0]?.originFileObj : null;

      submit = {
        ...submit,
        inviteEmailSignFile: signFile ? signFile : null,
      };

      onSubmit(submit);
      await setUpdateNewJobs({ ...jobs, ...submit, companyId: member?.companyId.toString(), jobId: jobId as string });

      if (!isLoading) {
        setTimeout(() => {
          router.replace('/jobs');
          if (setShareOpen) setShareOpen(false);
        }, 500);
      }
    }
  };

  return (
    <>
      <div className="w-full mb-6">
        <h3 className="text-xl text-black font-medium mb-2">Invite Candidates</h3>
        <p className="text-base text-[#4D6670]">Lorem ipsum is placeholder text commonly used in the graphic</p>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit} id="form" initialValues={initialValues}>
        <Tabs defaultActiveKey="1" items={tabList} onChange={handleChangeTab} />

        {tabTxt === 'Invite Candidates' && (
          <Button type="primary" htmlType="submit" loading={isLoading} className={`!h-9 !bg-mainColor hover:!opacity-75 mt-6 w-full`}>
            Save And Send Invitation
          </Button>
        )}
      </Form>
    </>
  );
}
