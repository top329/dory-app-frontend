'use client'

import React from "react"
import { Col, Row } from "antd"
import { Card, Space } from "antd";

import { NavigationMenu } from "@/components";
import { VideoQuestion } from "@/components";

const EditingTemplatePage: React.FC = () => {
    return <>
        <Row>
            <Col span={4} className="mb-0 mt-0">
                <NavigationMenu />
            </Col>
            <Col span={20}>
                <Card className="my-5">
                    <VideoQuestion />
                </Card>
            </Col>
        </Row>
    </>
  }

export default EditingTemplatePage
