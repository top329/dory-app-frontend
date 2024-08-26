'use client';

import { useRef, ChangeEvent, DragEvent, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button, Col, Divider, Form, FormListFieldData, Input, Row, Switch, UploadProps } from 'antd';

import Select from '../common/Select';
import { useAuth } from '..';
import { useLazyGetCandidateJobListQuery, useSetAddCandidateMutation } from '@/features/projects';
import { Option, PHONE_CODE } from '@/types/global';
import Dragger from 'antd/es/upload/Dragger';
import { Editor } from '@tinymce/tinymce-react';
import { CandidateParamType } from '@/types/candidate';

import { AlignLeftOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import IconUpload from '@/assets/icons/upload_3.svg';
import IconUser from '@/assets/icons/user_fill.svg';

const props: UploadProps = {
  name: 'file',
  multiple: false,
  maxCount: 1,
  accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf',
  beforeUpload: () => {
    return false;
  },
};

export default function Candidates({
  candidate,
  setCandidate,
  view,
}: {
  candidate: boolean;
  setCandidate: React.Dispatch<React.SetStateAction<boolean>>;
  view: string;
}) {
  const param = useParams();
  const [form] = Form.useForm();
  const { member } = useAuth();
  const [getJobList] = useLazyGetCandidateJobListQuery();
  const [setAddCandidate, { isLoading }] = useSetAddCandidateMutation();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [countryCode, setCountryCode] = useState<string>('+1');
  const [errorJob, setErrorJob] = useState<boolean[]>([false]);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [jobList, setJobList] = useState<Option[]>([]);
  const [isExistJob, setIsExistJob] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (candidate) {
        if (view === 'candidates') {
          const { data } = await getJobList({ companyId: Number(member?.companyId) }).unwrap();
          setJobList(data);
        }

        form.resetFields();

        setCountryCode('+1');
        setPhotoFile(null);
        setErrorJob([false]);
      }
    })();
  }, [candidate]);

  const normFile = (e: any, name: string) => {
    if (
      e?.fileList?.length !== 0 &&
      e?.fileList?.[0]?.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      e?.fileList?.[0]?.type !== 'application/vnd.ms-excel' &&
      e?.fileList?.[0]?.type !== 'text/csv' &&
      e?.fileList?.[0]?.type !== 'application/pdf'
    ) {
      return [];
    }

    if (name === 'cvFile') setCvFile(e?.fileList?.[0]?.originFileObj);
    if (name === 'coverLetterFile') setCoverLetterFile(e?.fileList?.[0]?.originFileObj);

    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handleFileBrowser = () => {
    fileRef?.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (
        e.target.files[0]?.type !== 'image/gif' &&
        e.target.files[0]?.type !== 'image/jpeg' &&
        e.target.files[0]?.type !== 'image/png' &&
        e.target.files[0]?.type !== 'image/jpg' &&
        e.target.files[0]?.type !== 'image/svg+xml'
      ) {
        return;
      }

      setPhotoFile(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));

      form.setFields([{ name: 'photoFile', errors: undefined, value: e.target.files[0] }]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) {
      if (
        e.dataTransfer.files[0]?.type !== 'image/gif' &&
        e.dataTransfer.files[0]?.type !== 'image/jpeg' &&
        e.dataTransfer.files[0]?.type !== 'image/png' &&
        e.dataTransfer.files[0]?.type !== 'image/jpg' &&
        e.dataTransfer.files[0]?.type !== 'image/svg+xml'
      ) {
        return;
      }

      setPhotoFile(e.dataTransfer.files[0]);
      setUrl(URL.createObjectURL(e.dataTransfer.files[0]));

      form.setFields([{ name: 'photoFile', errors: undefined, value: e.dataTransfer.files[0] }]);
    }
  };

  const handlePhoneCode = (item: Option) => {
    form.setFieldValue('phoneCode', item?.label);
    setCountryCode(item?.code as string);
  };

  const handleAddJobEvent = (addFun: Function) => {
    const values = form.getFieldsValue();
    if (isExistJob) return;

    if (!values?.jobIds?.[values?.jobIds?.length - 1] || values?.jobIds?.[values?.jobIds?.length - 1]?.id === '') {
      form.setFields([
        {
          name: ['jobIds', values?.jobIds?.length - 1, 'id'],
          errors: ['This is a required field.'],
          value: '',
        },
      ]);

      setErrorJob(prev => {
        const value = [...prev];
        value[values?.jobIds?.length - 1] = true;
        return value;
      });

      return;
    }

    if (!isExistJob) addFun();
  };

  const handleChangeJob = (item: Option, index: number) => {
    setIsExistJob(false);
    const values = form.getFieldsValue();
    const existJob = values?.jobIds?.find((rs: { id: string }, key: number) => rs?.id === item.label && key !== index);

    if (existJob) {
      form.setFields([
        {
          name: ['jobIds', values?.jobIds?.length - 1, 'id'],
          errors: ['The job is already selected.'],
        },
      ]);

      setErrorJob(prev => {
        const value = [...prev];
        value[values?.jobIds?.length - 1] = true;
        return value;
      });

      setIsExistJob(true);

      return;
    }

    form.setFields([{ name: ['jobIds', index, 'id'], errors: undefined, value: item.label }]);
    setErrorJob(prev => {
      const value = [...prev, (prev[index] = false)];
      value[index] = false;
      return value;
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    form.setFieldValue('inviteStatus', checked);
  };

  const handleSubmit = async (data: CandidateParamType) => {
    let isCheckJob = false;
    const values = form.getFieldsValue();

    values?.jobIds?.forEach((rs: { id: string }) => {
      if (!rs || rs?.id === '') {
        if (isExistJob) {
          form.setFields([
            {
              name: ['jobIds', values?.jobIds?.length - 1, 'id'],
              errors: ['The job is already selected.'],
            },
          ]);

          setErrorJob(prev => {
            const value = [...prev];
            value[values?.jobIds?.length - 1] = true;
            return value;
          });
        } else {
          form.setFields([
            {
              name: ['jobIds', values?.jobIds?.length - 1, 'id'],
              errors: ['This is a required field.'],
              value: '',
            },
          ]);

          setErrorJob(prev => {
            const value = [...prev];
            value[values?.jobIds?.length - 1] = true;
            return value;
          });
        }

        isCheckJob = true;
      }
    });

    if (isCheckJob) return;

    const submit: CandidateParamType = {
      userId: Number(member?.userId),
      companyId: Number(member?.companyId),
      jobIds: data?.jobIds ? data.jobIds : [Number(param?.id)],
      fullName: data.fullName,
      email: data.email,
      phoneCode: data.phoneCode,
      phoneNumber: data.phoneNumber,
      inviteStatus: data.inviteStatus ? 1 : 0,
      photoFile: data.photoFile,
      ...(data.cvFile ? { cvFile: cvFile as File } : {}),
      ...(data.coverLetterFile ? { coverLetterFile: coverLetterFile as File } : {}),
      ...(data.coverLetterText ? { coverLetterText: data.coverLetterText } : {}),
    };

    await setAddCandidate(submit);

    if (!isLoading) setCandidate(false);
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ phoneNumber: '', phoneCode: 'US', ...(view === 'candidates' ? { jobIds: [{ id: '' }] } : {}) }}
      >
        <div className="px-6 pt-6 pb-7">
          <div className="w-full border border-[#EAE7E6] p-4 rounded-lg mb-4">
            <Form.Item name="photoFile" rules={[{ message: 'This is a required field.', required: true }]}>
              <div className="flex items-center gap-4" onDragOver={handleDragOver} onDrop={handleDrop}>
                <input
                  ref={fileRef}
                  type="file"
                  className="!hidden"
                  onChange={handleFileChange}
                  accept=".png, .jpeg, .jpg, .gif, .svg"
                />

                {!photoFile && (
                  <div
                    className="w-[72px] h-[72px] rounded-full border border-[#B3B3B3] border-dashed flex items-center justify-center bg-[#F8F8F8] cursor-pointer"
                    onClick={handleFileBrowser}
                  >
                    <IconUser />
                  </div>
                )}

                {photoFile && (
                  <div className="w-[72px] h-[72px] rounded-full cursor-pointer" onClick={handleFileBrowser}>
                    <Image
                      src={url}
                      alt=""
                      width={72}
                      height={72}
                      className="!w-full !h-full !rounded-full !object-cover"
                    />
                  </div>
                )}

                <div>
                  <h3 className="text-[#050505] font-medium">Uplaod Candidate Profile</h3>
                  <p className="text-sm text-[#4D6670]">Photos help your teammates recognize you in Dory</p>
                </div>
              </div>
            </Form.Item>
            <Form.Item
              name="fullName"
              label={
                <>
                  Full name<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                </>
              }
              rules={[{ message: 'This is a required field.', required: true }]}
            >
              <Input placeholder="Full name" className="!h-10" />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  className="!mb-0"
                  name="email"
                  label={
                    <>
                      Email<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                    </>
                  }
                  rules={[{ message: 'This is a required field.', required: true }]}
                >
                  <Input placeholder="Email" className="!h-10" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <div className="absolute z-50 left-[90px] top-[41px]">
                  <span className="text-base text-[#101828] font-semibold">{countryCode}</span>
                </div>
                <Form.Item
                  className="!mb-0"
                  name="phoneNumber"
                  label={
                    <>
                      Phone number<span className="text-[#ff4d4f] mt-1">&nbsp;*</span>
                    </>
                  }
                  rules={[{ message: 'This is a required field.', required: true }]}
                >
                  <Input className="!pl-[120px]" placeholder="Phone number" />
                </Form.Item>
                <div className="absolute top-[32px]">
                  <Form.Item className="!mb-0" name="phoneCode">
                    <Select
                      className="w-[70px] h-[40px] !border-t-0 !border-l-0 !border-b-0 !rounded-r-none cursor-pointer"
                      form={form}
                      options={PHONE_CODE}
                      kind="phone"
                      searchable={true}
                      onChangeValue={handlePhoneCode}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </div>
          {view === 'candidates' && (
            <div className="w-full border border-[#EAE7E6] p-4 rounded-lg mb-4">
              <h3 className="text-base font-medium mb-2">Job names</h3>
              <Form.List name="jobIds">
                {(fields, { add, remove }) => {
                  return (
                    <>
                      {fields.map((field: FormListFieldData, key: number) => (
                        <Row gutter={24} key={field.key}>
                          <Col span={22}>
                            <Form.Item name={[field.name, 'id']}>
                              <Select
                                form={form}
                                options={jobList}
                                className="w-full h-10 cursor-pointer"
                                placeholder="Select job"
                                searchable={false}
                                error={errorJob[key]}
                                onChangeValue={(item: Option) => handleChangeJob(item, key)}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={2}>
                            {fields.length > 1 && (
                              <Button
                                type="link"
                                className="!text-[#344054]"
                                icon={<CloseOutlined />}
                                onClick={() => {
                                  remove(field.name);
                                  setIsExistJob(false);
                                  setErrorJob(prev => {
                                    const value = [...prev];
                                    value.splice(key, 1);
                                    return value;
                                  });
                                }}
                              />
                            )}
                          </Col>
                        </Row>
                      ))}

                      <Button
                        type="link"
                        className="!text-[#475467] mt-4 !pl-0 hover:!opacity-75"
                        icon={<PlusOutlined />}
                        onClick={() => handleAddJobEvent(add)}
                      >
                        Assign to Job
                      </Button>
                    </>
                  );
                }}
              </Form.List>
            </div>
          )}
          <Form.Item name="inviteStatus">
            <div className="flex items-start gap-4">
              <Switch onChange={handleSwitchChange} />
              <div>
                <p className="text-sm text-[#050505] font-medium leading-[20px]">
                  Invite the candidate to upload a video
                </p>
                <p className="text-sm text-[#404040] leading-[20px]">Save my login details for next time.</p>
              </div>
            </div>
          </Form.Item>
          <div className="w-full border border-[#EAE7E6] p-4 rounded-lg">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="cvFile"
                  label="Upload CV or Resume"
                  valuePropName="fileList"
                  getValueFromEvent={e => normFile(e, 'cvFile')}
                >
                  <Dragger {...props} className="group !bg-white">
                    <div className="flex items-center justify-center">
                      <IconUpload />
                    </div>
                    <p className="text-sm text-[#1A1A1A]">
                      <span className="text-[#0071CB] font-semibold">Click to upload</span>&nbsp;
                      <span>or drag and drop</span>
                      <br />
                      <span>DOC, DOCX, CSV, XLS, XLSX or PDF</span>
                    </p>
                  </Dragger>
                </Form.Item>
              </Col>
              <Col span={12}>
                {!showEditor && (
                  <>
                    <Form.Item
                      name="coverLetterFile"
                      label="Upload Cover Leter"
                      valuePropName="fileList"
                      getValueFromEvent={e => normFile(e, 'coverLetterFile')}
                    >
                      <Dragger {...props} className="group !bg-white">
                        <div className="flex items-center justify-center">
                          <IconUpload />
                        </div>
                        <p className="text-sm text-[#1A1A1A]">
                          <span className="text-[#0071CB] font-semibold">Click to upload</span>&nbsp;
                          <span>or drag and drop</span>
                          <br />
                          <span>DOC, DOCX, CSV, XLS, XLSX or PDF</span>
                        </p>
                      </Dragger>
                    </Form.Item>
                    <Divider plain>Or</Divider>
                    <Button
                      type="default"
                      className="!w-[344px] !h-9 !border-[#D0D5DD] hover:!bg-gray-50 hover:!opacity-75"
                      onClick={() => setShowEditor(true)}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-sm text-[#344054] font-semibold">Enter Text</p>
                        <AlignLeftOutlined className="!text-base !text-[#344054]" />
                      </div>
                    </Button>
                  </>
                )}

                {showEditor && (
                  <>
                    <Form.Item
                      name="coverLetterText"
                      label="Upload Cover Leter"
                      getValueFromEvent={(_, editor) => editor.getContent()}
                    >
                      <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                        init={{ menubar: false, branding: false, height: 250, placeholder: 'Enter a text...' }}
                      />
                    </Form.Item>
                    <Button
                      type="default"
                      className="!border-[#D0D5DD] hover:!bg-gray-50 hover:!opacity-75 !px-2 !py-1 !absolute !top-10 !right-5 !z-50"
                      onClick={() => setShowEditor(false)}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <CloseOutlined className="!text-[#344054]" />
                      </div>
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-6 border-t border-t-[#EDEFF1]">
          <Button
            type="default"
            className="!h-9 !border-gray-300 !text-[#344054] hover:!opacity-75"
            onClick={() => setCandidate(false)}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="!h-9 !bg-mainColor hover:!opacity-75" loading={isLoading}>
            Save Changes
          </Button>
        </div>
      </Form>
    </>
  );
}
