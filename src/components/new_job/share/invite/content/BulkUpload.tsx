import Link from 'next/link';
import { Card, Form, UploadFile, UploadProps } from 'antd';
import type { InviteCandidatesProps } from '@/app/new_job/create/ShareJob';
import Dragger from 'antd/es/upload/Dragger';

import IconUpload from '@/assets/icons/upload_1.svg';

const props: UploadProps = {
  name: 'file',
  multiple: false,
  maxCount: 1,
  accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
  beforeUpload: () => {
    return false;
  },
};

export default function BulkUpload({ form }: InviteCandidatesProps) {
  const normFile = (e: any) => {
    if (
      e?.fileList?.length !== 0 &&
      e?.fileList?.[0]?.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      e?.fileList?.[0]?.type !== 'application/vnd.ms-excel'
    ) {
      return [];
    }

    form?.setFields([{ name: 'bulkUploadFile', errors: undefined, value: e?.fileList }]);

    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  return (
    <Card>
      <p className="text-base text-[#0E181C] leading-6 mb-6">
        Use bulk uploads to invite <span className="font-semibold">up to 200 candidates</span> at a time!Simply drag and
        drop an Excel or CSV file here.Your file must contain 4 headers with this exact wording:{' '}
        <span className="font-semibold">First Name, Last Name, e-mail and Phone.</span>
      </p>
      <p className="text-base text-[#0E181C] leading-6 mb-4">
        Please download and use this{' '}
        <Link href="#" className="text-[#EF9575] underline hover:text-[#EF9575] hover:underline hover:opacity-75">
          template here
        </Link>
        . If you add the "Phone" column, your candidates will receive an SMS invitation along with their email invite.
        Remember to include the country code, for example: United States +1, 001 or 1.
      </p>
      <Form.Item className="!mb-0" name="bulkUploadFile" valuePropName="fileList" getValueFromEvent={normFile}>
        <Dragger {...props} className="group !bg-white !border-none">
          <div className="flex items-center justify-center">
            <IconUpload />
          </div>
          <p className="text-sm text-[#4D6670]">
            <span className="text-[#EF9575] font-semibold">Click to upload</span>&nbsp;
            <span>or drag and drop</span>
            <br />
            <span>Excel/CSV file to load the candidates.We recommend inviting up to 200 candidates at a time.</span>
          </p>
        </Dragger>
      </Form.Item>
    </Card>
  );
}
