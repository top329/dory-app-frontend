import React from 'react';
import { Typography, Row, Col, Button, Dropdown} from 'antd';
import type { MenuProps } from "antd";
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import { NewTemplate } from "@/components";

const { Text, Link } = Typography

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" href="#">
          Pre-defined answer
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" href="#">
          Multiple choice
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a rel="noopener noreferrer" href="#">
          Text box
        </a>
      ),
    },
    {
        key: '4',
        label: (
          <a rel="noopener noreferrer" href="#">
            Scale answer
          </a>
        ),
      },
  ];

const VideoQuestion: React.FC = () => {
    return<>
        <Row>
            <Col span={5} className='m-3'>
                <Typography.Title level={3} >Video Question</Typography.Title>
                <Text>Create tests or surveys, send them to candidates via email. Save responses in the candidate`s profile. </Text>
                <Link href='#' target='_blank'>Learn more</Link><br />
                <NewTemplate />
            </Col>
            <Col span={18} className='m-3'>
                <div className='flex justify-between'>
                    <div>
                        <Typography.Title level={3} >Introduction Template</Typography.Title>
                        <Text>Screening </Text><Text> Created by Phoenix</Text>
                    </div>
                    <div>
                        <Button className='!bg-gray-700 !text-white'>Save</Button>
                        <Button
                            className=" text-base font-semibold leading-[24px] w-[215px] m-5 "
                            // type="primary"
                            >
                                <div className="flex items-center justify-center gap-2">
                                <p>Preview</p>
                                <ExportOutlined />
                                </div>
                        </Button>
                    </div>
                </div>
                <Dropdown menu={{ items }} placement='bottomRight' className='w-full'>
                    <Button icon={ <PlusOutlined /> }>Add new question</Button>
                </Dropdown>
            </Col>
        </Row>
    </>   
}

export default VideoQuestion