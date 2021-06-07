import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Card,
    PageHeader,
    Divider,
    Button,
    message,
    Descriptions,
    Popover,
    Modal,
    Form,
    Input,
    Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
const Episode = (props) => {
    const { Dragger } = Upload;
    const [state, setState] = useState(null);
    const [modalEpisode, setModalEpisode] = useState(false);
    const [modalStudent, setModalStudent] = useState(false);
    const [episode_form] = Form.useForm();
    // episode
    const setFileValue = (info, field) => {
        if (info.file.status === "done") {
            message.success(`Хичээлийн бичлэг амжилттай байршлаа.`);
        } else if (info.file.status === "error") {
            message.error(`Хүсэлт амжилтгүй.`);
        }
    };
    const get = () => {
        axios
            .get("/teacher/lessons/" + props.match.params.id)
            .then((response) => {
                if (response.data.status) {
                    setState(response.data.data);
                }
            })
            .catch(() =>
                message.error(
                    "Tа энэ хэсэгт хандах эрхгүй эсвэл хичээл олдсонгүй"
                )
            );
    };
    const history = useHistory();
    useEffect(() => get(), []);
    return (
        <>
            <div className="lesson">
                <Row justify="center">
                    <Col xs={23} md={20} xl={18} xxl={16}>
                        <Card className="has-header">
                            {state ? (
                                <PageHeader
                                    onBack={() =>
                                        history.push("/teacher/lesson")
                                    }
                                    title={state.name}
                                    subTitle={state.description}
                                    className="page-header"
                                    extra={[
                                        <Button key="student">
                                            Сурагч нэмэх
                                        </Button>,
                                        <Button
                                            key="lesson"
                                            type="primary"
                                            onClick={() =>
                                                setModalEpisode(true)
                                            }
                                        >
                                            Хичээл нэмэх
                                        </Button>,
                                    ]}
                                >
                                    <Descriptions size="small" column={3}>
                                        <Descriptions.Item label="Үүсгэсэн багш">
                                            <Popover
                                                content={
                                                    <div>
                                                        <p>
                                                            Нэр:{" "}
                                                            <b>
                                                                {
                                                                    state.owner
                                                                        .name
                                                                }{" "}
                                                            </b>
                                                        </p>
                                                        <p>
                                                            Утасны дугаар:{" "}
                                                            <b>
                                                                {" "}
                                                                {
                                                                    state.owner
                                                                        .phone
                                                                }
                                                            </b>
                                                        </p>
                                                        <p>
                                                            Email:{" "}
                                                            <b>
                                                                {" "}
                                                                {
                                                                    state.owner
                                                                        .email
                                                                }{" "}
                                                            </b>
                                                        </p>
                                                    </div>
                                                }
                                                title="Багш"
                                            >
                                                <a>{state.owner.name}</a>
                                            </Popover>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Үүсгэсэн огноо">
                                            {moment(state.created_at).fromNow()}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Зассан огноо">
                                            {moment(state.updated_at).fromNow()}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Нийт хичээлүүд">
                                            {1}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Нийт сурагч">
                                            {1}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </PageHeader>
                            ) : null}
                            <Divider />
                        </Card>
                    </Col>
                </Row>
            </div>
            <Modal
                title={`Хичээл нэмэх`}
                visible={modalEpisode}
                onCancel={() => setModalEpisode(false)}
            >
                <Form form={episode_form} layout="vertical">
                    <Form.Item name="name" label="Хичээлийн нэр">
                        <Input />
                    </Form.Item>
                    <Form.Item name="video">
                        <Dragger
                            action="/teacher/episode/video"
                            name="video"
                            multiple={false}
                            headers={{
                                "X-CSRF-Token": document.head.querySelector(
                                    'meta[name="csrf-token"]'
                                ).content,
                            }}
                            onChange={(info) => setFileValue(info, "avatar")}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly
                                prohibit from uploading company data or other
                                band files
                            </p>
                        </Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default Episode;
