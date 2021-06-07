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
    Popconfirm,
    Empty,
    List,
    Avatar,
    Select,
} from "antd";
import { InboxOutlined, EditOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Errors from "@/components/errors";

const Episode = (props) => {
    const { Dragger } = Upload;
    const { Meta } = Card;
    const { Option } = Select;

    const [state, setState] = useState(null);
    const [episode, setEpisode] = useState(null);
    const [student, setStudent] = useState(null);
    const [errors, setErrors] = useState(null);
    const [edit_episode, setEditEpisode] = useState(null);
    const [modalEpisode, setModalEpisode] = useState(false);
    const [modalStudent, setModalStudent] = useState(false);
    const [episode_form] = Form.useForm();
    const [users, setUsers] = useState(null);
    // episode
    const setFileValue = (info, field) => {
        if (info.file.status === "done") {
            message.success(`Хичээлийн бичлэг амжилттай байршлаа.`);
            episode_form.setFieldsValue({
                video: info.file.response.path,
            });
        } else if (info.file.status === "error") {
            message.error(`Хүсэлт амжилтгүй.`);
        }
    };
    useEffect(() => {
        if (!edit_episode) {
            episode_form.resetFields();
        }
        episode_form.setFieldsValue(edit_episode);
    }, [episode_form, edit_episode]);
    const get_student = () => {
        setStudent(null);
        axios
            .get(`/teacher/enroll/${props.match.params.id}`)
            .then((response) => {
                if (response.data.status) {
                    setStudent(response.data.data);
                }
            })
            .catch(() => message.error("Алдаа гарлаа"));
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
        axios
            .get("/teacher/episode/" + props.match.params.id)
            .then((response) => {
                if (response.data.status) {
                    setEpisode(response.data.data);
                }
            })
            .catch(() =>
                message.error(
                    "Tа энэ хэсэгт хандах эрхгүй эсвэл хичээл олдсонгүй"
                )
            );
        get_student();
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
                                        <Button
                                            key="student"
                                            onClick={() => {
                                                setModalStudent(true);
                                                if (!users) {
                                                    axios
                                                        .get("/teacher/users")
                                                        .then((response) => {
                                                            if (
                                                                response.data
                                                                    .status
                                                            ) {
                                                                setUsers(
                                                                    response
                                                                        .data
                                                                        .data
                                                                );
                                                            }
                                                        });
                                                }
                                            }}
                                        >
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
                                            {episode?.length}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Нийт сурагч">
                                            {student?.length}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </PageHeader>
                            ) : null}
                            <Divider />
                            <Row gutter={[16, 16]}>
                                {episode?.length > 0 ? (
                                    episode.map((item, index) => (
                                        <Col span={12} key={item.id}>
                                            <Card
                                                cover={
                                                    <video
                                                        src={`/` + item.video}
                                                        controls
                                                    />
                                                }
                                                actions={[
                                                    <EditOutlined
                                                        key="edit"
                                                        onClick={() =>
                                                            setEditEpisode(item)
                                                        }
                                                    />,
                                                ]}
                                            >
                                                <Meta
                                                    title={item.name}
                                                    description={
                                                        index + 1 + "-р хичээл"
                                                    }
                                                />
                                            </Card>
                                        </Col>
                                    ))
                                ) : (
                                    <Col span="24">
                                        <Empty />
                                    </Col>
                                )}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Modal
                title={`Хичээл ${edit_episode ? "засах" : "нэмэх"}`}
                visible={modalEpisode || edit_episode}
                onCancel={() => {
                    setModalEpisode(false);
                    setEditEpisode(null);
                }}
                onOk={() => episode_form.submit()}
                forceRender
            >
                {errors && <Errors errors={errors} />}
                <Form
                    form={episode_form}
                    layout="vertical"
                    onFinish={(values) => {
                        setErrors(null);
                        axios
                            .post(
                                `/teacher/episode/${
                                    edit_episode ? edit_episode.id : "add"
                                }`,
                                {
                                    ...values,
                                    id: props.match.params.id,
                                }
                            )
                            .then((response) => {
                                if (response.data.status) {
                                    message.success("Амжилттай");
                                    setModalEpisode(false);
                                    episode_form.resetFields();
                                    setEditEpisode(null);
                                    get();
                                }
                            })
                            .catch((err) => {
                                if (err.response.data.errors) {
                                    setErrors(err.response.data.errors);
                                }
                            });
                    }}
                >
                    <Form.Item name="name" label="Хичээлийн нэр" required>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="video"
                        valuePropName="file"
                        rules={[
                            {
                                required: true,
                                message: "Хичээлийн бичлэг байршуулна уу.",
                            },
                        ]}
                    >
                        <Dragger
                            action="/teacher/episode/video"
                            name="video"
                            accept="video/*"
                            maxCount={1}
                            headers={{
                                "X-CSRF-Token": document.head.querySelector(
                                    'meta[name="csrf-token"]'
                                ).content,
                            }}
                            onChange={(info) => setFileValue(info, "video")}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Хичээлийн бичлэгээ байршуулна уу
                            </p>
                            <p className="ant-upload-hint">
                                Хичээлийн бичлэг нь дээд тал нь 1 гигабайт
                                хэмжээтэй байна. Хэрвээ засвар оруулж байгаа бол
                                зөвхөн шинэ хичээлийн бичлэгийг хавсаргана
                            </p>
                        </Dragger>
                    </Form.Item>
                </Form>
                {edit_episode && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Popconfirm
                            title="Энэ хичээлийг устгахдаа итгэлтэй байна уу?"
                            onConfirm={() => {
                                axios
                                    .delete(
                                        "/teacher/episode/" + edit_episode.id
                                    )
                                    .then((response) => {
                                        if (response.data.status) {
                                            get();
                                            setErrors(null);
                                            setEditEpisode(null);
                                            setModalEpisode(false);
                                            message.success(
                                                "Амжилттай устгалаа."
                                            );
                                        }
                                    });
                            }}
                        >
                            <Button type="link" danger>
                                Устгах
                            </Button>
                        </Popconfirm>
                    </div>
                )}
            </Modal>
            <Modal
                visible={modalStudent}
                title="Энэ хичээлийн сурагчид"
                footer={null}
                onCancel={() => setModalStudent(false)}
                className="modal-student"
            >
                <Form
                    onFinish={(values) => {
                        axios
                            .post(
                                `/teacher/lessons/${props.match.params.id}/enroll/${values.id}`,
                                { values }
                            )
                            .then((response) => {
                                if (response.data.status) {
                                    message.success("🔥");
                                    get_student();
                                } else message.warning("Нэмэгдсэн сурагч");
                            });
                    }}
                >
                    <Row gutter={16}>
                        <Col span={18}>
                            <Form.Item
                                name="id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Сурагчын email сонгоно уу.",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Сурагчын email сонгоно уу."
                                    optionFilterProp="children"
                                    loading={users ? false : true}
                                    filterOption={(input, option) =>
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {users?.map((user) => (
                                        <Option value={user.id} key={user.id}>
                                            {user.email}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Нэмэх
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Divider />
                {student ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={student}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Popconfirm
                                        title={`${item.student.name} хичээлээс хасах уу?`}
                                        onConfirm={() => {
                                            axios
                                                .delete(
                                                    "/teacher/enroll/" + item.id
                                                )
                                                .then((response) => {
                                                    if (response.data.status) {
                                                        message.success("🔥🔥");
                                                        get_student();
                                                    }
                                                });
                                        }}
                                    >
                                        <a>Хасах</a>
                                    </Popconfirm>,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            src={"/" + item.student.avatar}
                                        />
                                    }
                                    title={
                                        <a
                                            href={`mailto:${item.student.email}`}
                                        >
                                            {item.student.email}
                                        </a>
                                    }
                                    description={item.student.name}
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    <Empty />
                )}
            </Modal>
        </>
    );
};
export default Episode;
