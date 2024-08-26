import React, { useState } from 'react';
import { Button, Modal, Typography, Input, AutoComplete } from 'antd';
import { PlusOutlined, } from '@ant-design/icons';

const { Text } = Typography

const NewTemplate: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const options = [
    { value: 'screening'},
  ]

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Button
    className=" text-base font-semibold leading-[24px] w-[215px] my-5 !h-10"
    onClick={showModal}
    // type="primary"
    >
        <div className="flex items-center justify-center gap-2">
        <p>New Templates</p>
        <PlusOutlined className="" />
        </div>
    </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'Create'}>
        <div className='flex justify-between flex-col p-3'>
            <div className="flex flex-col">
                <Text>Template name</Text>
                <Input />
            </div>
            <div className="flex flex-col">
                <Text>Template category</Text>
                <AutoComplete 
                    options={options}
                    bordered={true}
                    className='border-black'
                    filterOption={(inputValue, option) =>
                    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </div>
        </div>
      </Modal>
    </>
  );
};

export default NewTemplate;