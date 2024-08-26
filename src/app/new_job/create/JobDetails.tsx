'use client';

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Card, Form, Button, Row, Col, Input } from 'antd';

import { useSelector } from '@/features/store';

import { Select, useNewJob } from '@/components';

import { Option } from '@/types/global';
import { NewJobsProps } from '@/types/new_job';

type formProps = {
  employeeTypeId: string;
  jobCategoryId: string;
  requiredEducationId: string;
  salaryPeriodId: string;
  salaryMin: string;
  salaryMax: string;
  currencyId: string;
};

export default function JobDetails() {
  const { form, jobs, onSubmit, nextStep, prevSubStep, nextSubStep } = useNewJob();
  const { jobInit } = useSelector(state => state.newJob);

  const [errorEmployeeType, setErrorEmployeeType] = useState<boolean>(false);
  const [errorCategory, setErrorCategory] = useState<boolean>(false);
  const [errorEducation, setErrorEducation] = useState<boolean>(false);
  const [errorSalaryPeriod, setErrorSalaryPeriod] = useState<boolean>(false);

  const initialValues: formProps = useMemo(() => {
    const findEmployeeType = jobInit?.employeeTypes.find((rs: Option) => rs.id === jobs?.employeeTypeId);
    const findCategory = jobInit?.categories.find((rs: Option) => rs.id === jobs?.jobCategoryId);
    const findEducation = jobInit?.requiredEducations.find((rs: Option) => rs.id === jobs?.requiredEducationId);
    const findSalaryPeriod = jobInit?.salaryPeriods?.find((rs: Option) => rs.id === jobs?.salaryPeriodId);
    const findCurrency = jobInit?.currencies.find((rs: Option) => rs.id === jobs?.currencyId);

    return {
      employeeTypeId: findEmployeeType?.label || '',
      jobCategoryId: findCategory?.label || '',
      requiredEducationId: findEducation?.label || '',
      salaryPeriodId: findSalaryPeriod?.label || '',
      salaryMin: jobs?.salaryMin || '',
      salaryMax: jobs?.salaryMax || '',
      currencyId: findCurrency?.value || 'USD',
    };
  }, [jobs]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');

    if (value !== '') {
      form.setFields([{ name: e.target.id, errors: undefined, value }]);
    } else {
      form.setFields([{ name: e.target.id, errors: ['This is a required field.'], value }]);
    }
  };

  const handleSubmit = (data: NewJobsProps) => {
    let isValidate = false;

    if (!data?.employeeTypeId || data?.employeeTypeId === '') {
      setErrorEmployeeType(true);
      form.setFields([{ name: 'employeeTypeId', errors: ['This is a required field.'] }]);
      isValidate = true;
    }

    if (!data?.jobCategoryId || data?.jobCategoryId === '') {
      setErrorCategory(true);
      form.setFields([{ name: 'jobCategoryId', errors: ['This is a required field.'] }]);
      isValidate = true;
    }

    if (!data?.requiredEducationId || data?.requiredEducationId === '') {
      setErrorEducation(true);
      form.setFields([{ name: 'requiredEducationId', errors: ['This is a required field.'] }]);
      isValidate = true;
    }

    if (!data?.salaryPeriodId || data?.salaryPeriodId === '') {
      setErrorSalaryPeriod(true);
      form.setFields([{ name: 'salaryPeriodId', errors: ['This is a required field.'] }]);
      isValidate = true;
    }

    if (!data?.salaryMin || data?.salaryMin === '') {
      form.setFields([{ name: 'salaryMin', errors: ['This is a required field.'] }]);
      isValidate = true;
    }

    if (!data?.salaryMax || data?.salaryMax === '') {
      form.setFields([{ name: 'salaryMax', errors: ['This is a required field.'] }]);
      isValidate = true;
    }

    if (isValidate) return;

    const findEmployeeType = jobInit?.employeeTypes.find((rs: Option) => rs.label === data?.employeeTypeId);
    const findCategory = jobInit?.categories.find((rs: Option) => rs.label === data?.jobCategoryId);
    const findEducation = jobInit?.requiredEducations.find((rs: Option) => rs.label === data?.requiredEducationId);
    const findSalaryPeriod = jobInit?.salaryPeriods?.find((rs: Option) => rs.label === data?.salaryPeriodId);
    const findCurrency = jobInit?.currencies.find((rs: Option) => rs.value === data?.currencyId);

    const employeeTypeId = findEmployeeType?.id || '0';
    const jobCategoryId = findCategory?.id || '0';
    const requiredEducationId = findEducation?.id || '0';
    const salaryPeriodId = findSalaryPeriod?.id || '0';
    const currencyId = findCurrency?.id || '0';

    const submit = { ...data, employeeTypeId, jobCategoryId, requiredEducationId, salaryPeriodId, currencyId };

    void onSubmit(submit as NewJobsProps, data);
    nextStep();
    nextSubStep();
  };

  return (
    <Form className="!mb-8" form={form} layout="vertical" onFinish={handleSubmit} initialValues={initialValues} id="form">
      <div className="px-6 pt-8 pb-[84px] border-b border-b-[#EDEFF1]">
        <h1 className="text-2xl font-medium mb-8">Job Details</h1>
        <Card className="!mb-4">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="employeeTypeId"
                label={
                  <>
                    Employee type<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                  </>
                }
              >
                <Select
                  form={form}
                  options={jobInit?.employeeTypes as Option[]}
                  className="w-full h-10 cursor-pointer"
                  placeholder="Select employee type"
                  searchable={false}
                  error={errorEmployeeType}
                  setError={setErrorEmployeeType}
                  errorMessage="This is a required field."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="jobCategoryId"
                label={
                  <>
                    Category<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                  </>
                }
              >
                <Select
                  form={form}
                  options={jobInit?.categories as Option[]}
                  className="w-full h-10 cursor-pointer"
                  placeholder="Select category"
                  searchable={false}
                  error={errorCategory}
                  setError={setErrorCategory}
                  errorMessage="This is a required field."
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="requiredEducationId"
            label={
              <>
                Education<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
              </>
            }
          >
            <Select
              form={form}
              options={jobInit?.requiredEducations as Option[]}
              className="w-full h-10 cursor-pointer"
              placeholder="Select education"
              searchable={false}
              error={errorEducation}
              setError={setErrorEducation}
              errorMessage="This is a required field."
            />
          </Form.Item>
        </Card>
        <Card>
          <Form.Item
            name="salaryPeriodId"
            label={
              <>
                Salary Period<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
              </>
            }
          >
            <Select
              form={form}
              options={jobInit?.salaryPeriods as Option[]}
              className="w-full h-10 cursor-pointer"
              placeholder="Select period"
              searchable={false}
              error={errorSalaryPeriod}
              setError={setErrorSalaryPeriod}
              errorMessage="This is a required field."
            />
          </Form.Item>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item
                name="salaryMin"
                label={
                  <>
                    Min price<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                  </>
                }
              >
                <Input className="!h-10" placeholder="$ Min" onChange={handleChangeInput} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="salaryMax"
                label={
                  <>
                    Max price<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                  </>
                }
              >
                <Input className="!h-10" placeholder="$ Max" onChange={handleChangeInput} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="currencyId" label="Currency">
                <Select
                  form={form}
                  options={jobInit?.currencies as Option[]}
                  kind="currency"
                  searchable={true}
                  className="w-full h-10 cursor-pointer"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </div>
      <div className="flex items-center justify-between px-4 py-6">
        <Button type="default" className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75" onClick={prevSubStep}>
          Back
        </Button>
        <Button type="primary" htmlType="submit" className="!h-9 !bg-mainColor hover:!opacity-75">
          Next
        </Button>
      </div>
    </Form>
  );
}
