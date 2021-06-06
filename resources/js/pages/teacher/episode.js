import React from "react";
import { Row, Col, Card, PageHeader, Divider } from "antd";
import { useHistory } from "react-router-dom";
const Episode = (props) => {
    const history = useHistory();
    return (
        <>
            <div className="lesson">
                <Row justify="center">
                    <Col xs={23} md={20} xl={18} xxl={16}>
                        <Card className="has-header">
                            <PageHeader
                                onBack={() => history.push("/teacher/lesson")}
                                title="Хичээлийн дэлгэрэнгүй мэдээлэл"
                                className="page-header"
                            />
                            <Divider />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};
export default Episode;
