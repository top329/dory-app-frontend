'use client';

import { useState, useEffect } from 'react';
import { Card, Col, DatePicker, type DatePickerProps, Form, Row, Segmented } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';

import { Select } from '@/components';
import InviteEmail from './notification/InviteEmail';
import InviteSms from './notification/InviteSms';
import ReminderEmails from './notification/ReminderEmails';
import ReminderSms from './notification/ReminderSms';

import type { InviteCandidatesProps } from '@/app/new_job/create/ShareJob';
import { COUNTRIES } from '@/types/global';

import Individual from './content/Individual';
import BulkUpload from './content/BulkUpload';
import DirectLink from './content/DirectLink';

export default function InviteContent({
  form,
  candidateKind,
  tabTxt,
  signRef,
  individualKind,
  setIndividualKind,
  activeTab,
  setActiveTab,
  errorCountry,
  setErrorCountry,
}: InviteCandidatesProps) {
  useEffect(() => {
    if (setIndividualKind) setIndividualKind('Invite Email');
  }, [tabTxt, candidateKind]);

  const handleChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    if (dateString !== '') {
      form?.setFields([{ name: 'jobDeadline', errors: undefined, value: date }]);
    } else {
      form?.setFields([{ name: 'jobDeadline', errors: ['This is a required field.'], value: '' }]);
    }
  };

  const handleChangeIndividual = (value: SegmentedValue) => {
    form?.setFieldValue('subjectEmail', '');
    form?.setFieldValue('bodyEmail', '');
    form?.setFieldValue('bodySms', '');
    form?.setFieldValue('inviteEmailSignFile', undefined);
    form?.setFieldValue('reminderEmail', [{ schedule: 'After Initial Invitation', scheduleTime: '1', reminderSubject: '', reminderBody: '' }]);
    form?.setFieldValue('reminderSms', [{ schedule: 'After Initial Invitation', scheduleTime: '1', reminderSubject: '', reminderBody: '' }]);

    if (setIndividualKind) setIndividualKind(value.toString());
  };

  return (
    <>
      <div className="mb-6">
        {candidateKind === 'Individual' && <Individual form={form} />}

        {candidateKind === 'Bulk Upload' && <BulkUpload form={form} />}

        {candidateKind === 'Direct Link' && <DirectLink form={form} />}
      </div>
      <Card className="!mb-6">
        <h3 className="text-lg text-black font-medium mb-4">Set a deadline for your candidates</h3>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              className="!mb-0"
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
          <Col span={12}>
            <Form.Item
              className="!mb-0"
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
                error={errorCountry}
                setError={setErrorCountry}
                errorMessage="This is a required field."
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card
        title={
          <>
            <h3 className="!text-lg text-black !font-medium">Send your candidates notifications</h3>
          </>
        }
        headStyle={{ borderBottom: 'none' }}
      >
        <Segmented
          className="!rounded-full !bg-[#EDECEA] !h-[37px] !p-1 !border !boder-[#EDEFF1]"
          value={individualKind}
          options={[
            {
              label: (
                <div className="h-[29px] w-[150px] flex items-center justify-center">
                  <p className="text-base font-medium">Invite Email</p>
                </div>
              ),
              value: 'Invite Email',
            },
            {
              label: (
                <div className="h-[29px] w-[150px] flex items-center justify-center">
                  <p className="text-base font-medium">Invite SMS</p>
                </div>
              ),
              value: 'Invite SMS',
            },
            {
              label: (
                <div className="h-[29px] w-[150px] flex items-center justify-center">
                  <p className="text-base font-medium">Reminder Emails</p>
                </div>
              ),
              value: 'Reminder Emails',
            },
            {
              label: (
                <div className="h-[29px] w-[150px] flex items-center justify-center">
                  <p className="text-base font-medium">Reminder SMS</p>
                </div>
              ),
              value: 'Reminder SMS',
            },
          ]}
          onChange={handleChangeIndividual}
        />

        {individualKind === 'Invite Email' && <InviteEmail form={form} signRef={signRef} activeTab={activeTab} setActiveTab={setActiveTab} />}

        {individualKind === 'Invite SMS' && <InviteSms form={form} />}

        {individualKind === 'Reminder Emails' && <ReminderEmails form={form} />}

        {individualKind === 'Reminder SMS' && <ReminderSms form={form} />}
      </Card>
    </>
  );
}
