'use client';

import { Input, Form } from 'antd';

export default function DialogTextBox() {
  return (
    <>
      <h3 className="text-base font-medium leading-6 mb-3">Which of the following software tools do you primarily use for UI design?</h3>
      <div className="pr-3 py-2">
        <Form.Item>
          <Input.TextArea placeholder="Fill your answer ..." readOnly />
        </Form.Item>
      </div>
    </>
  );
}
