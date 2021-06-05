import React, { useState, useEffect } from "react";
import {
    Table,
    Row,
    Col,
    Spin,
    Card,
    message,
    Tag,
    Space,
    Button,
    Popconfirm,
    Modal,
    Form,
    Input,
    Select,
} from "antd";
import axios from "axios";
import moment from "moment";
import Errors from "@/components/errors";

const { Option } = Select;
const { Search } = Input;
const Users = () => {
    const [state, setState] = useState(null);
    const [edit, setEdit] = useState(null);
    const [errors, setErrors] = useState(null);
    const [search, setSearch] = useState(null);
    const [add_modal, setAddModal] = useState(null);
    const [form] = Form.useForm();
    const [add] = Form.useForm();
    const get = () => {
        setState(null);
        axios
            .get("/admin/users")
            .then((response) => {
                if (response.data.status) {
                    setState(response.data.data);
                }
            })
            .catch((err) => {
                message.error(
                    err.response.data.msg
                        ? err.response.data.msg
                        : "Хүсэлт амжилтгүй"
                );
            });
    };
    useEffect(() => {
        if (!edit) {
            form.resetFields();
        }
        form.setFieldsValue(edit);
    }, [form, edit]);
    const columns = [
        {
            title: "Имэйл",
            dataIndex: "email",
        },
        {
            title: "Нэр",
            dataIndex: "name",
        },

        {
            title: "Утасны дугаар",
            dataIndex: "phone",
        },
        {
            title: "Эрх",
            dataIndex: "role",
            render: (text) =>
                text === "admin" ? (
                    <Tag color="green">Админ</Tag>
                ) : text === "teacher" ? (
                    <Tag color="#108ee9">Багш</Tag>
                ) : (
                    <Tag color="blue">Сурагч</Tag>
                ),
        },
        {
            title: "Бүртгүүлсэн огноо",
            dataIndex: "created_at",
            render: (text) => moment(text).fromNow(),
        },
        {
            title: "Үйлдэл",
            render: (text, record) => (
                <Space>
                    <Button type="link" onClick={() => setEdit(record)}>
                        Засах
                    </Button>
                    <Popconfirm
                        title={record.name + " устгах уу?"}
                        onConfirm={() => {
                            axios.delete("/admin/users/" + record.id);
                            get();
                        }}
                        okText="Tийм"
                        cancelText="Буцах"
                    >
                        <Button type="link" danger>
                            Устгах
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    useEffect(() => get(), []);
    return (
        <>
            <div className="users">
                <Row justify="center">
                    <Col xs={23} md={20} xl={18} xxl={16}>
                        <Card
                            title={`Нийт хэрэглэгч (${
                                state ? state.length : 0
                            })`}
                            extra={
                                <Space>
                                    <Search
                                        placeholder="Өгөгдөл хайх"
                                        onSearch={(data) => {
                                            if (data) {
                                                setSearch(
                                                    state.filter(
                                                        (user) =>
                                                            user.name
                                                                .toLowerCase()
                                                                .includes(
                                                                    data.toLowerCase()
                                                                ) ||
                                                            user.email
                                                                .toLowerCase()
                                                                .includes(
                                                                    data.toLowerCase()
                                                                ) ||
                                                            user.phone
                                                                ?.toLowerCase()
                                                                .includes(
                                                                    data.toLowerCase()
                                                                )
                                                    )
                                                );
                                            } else {
                                                setSearch(state);
                                            }
                                        }}
                                    />
                                    <Select
                                        defaultValue="all"
                                        onChange={(type) => {
                                            if (type === "all") {
                                                setSearch(state);
                                            } else {
                                                setSearch(
                                                    state.filter((user) =>
                                                        user.role.includes(type)
                                                    )
                                                );
                                            }
                                        }}
                                    >
                                        <Option value="all">Бүгд</Option>
                                        <Option value="student">Сурагч</Option>
                                        <Option value="teacher">Багш</Option>
                                    </Select>
                                    <Button
                                        type="primary"
                                        onClick={() => setAddModal(true)}
                                    >
                                        Хэрэглэгч нэмэх
                                    </Button>
                                </Space>
                            }
                        >
                            {!state ? (
                                <div className="loading">
                                    <Spin />
                                </div>
                            ) : (
                                <Table
                                    dataSource={search ? search : state}
                                    columns={columns}
                                    rowKey={(record) => record.id}
                                />
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
            <Modal
                visible={Boolean(edit)}
                title="Хэрэглэгчийн мэдээлэл засах"
                onCancel={() => setEdit(null)}
                onOk={() => form.submit()}
                forceRender
            >
                {errors && <Errors errors={errors} />}
                <Form
                    initialValues={edit}
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        setErrors(null);
                        axios
                            .post(`/admin/users/${edit.id}`, { ...values })
                            .then((response) => {
                                if (response.data.status) {
                                    message.success("Амжилттай");
                                    setEdit(null);
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
                    <Form.Item
                        label="Нэр"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "нэр оруулна уу!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Утасны дугаар"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Утасны дугаар оруулна уу!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Эрх"
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: "Эрх сонгоно уу!",
                            },
                        ]}
                    >
                        <Select>
                            <Option value="student">Сурагч</Option>
                            <Option value="teacher">Багш</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            {/* хэрэглэгч нэмэх */}
            <Modal
                visible={add_modal}
                title="Хэрэглэгч нэмэх"
                onCancel={() => setAddModal(false)}
                onOk={() => add.submit()}
            >
                {errors && <Errors errors={errors} />}
                <Form
                    layout="vertical"
                    form={add}
                    onFinish={(values) => {
                        setErrors(null);
                        axios
                            .post("/admin/users/add", { ...values })
                            .then((response) => {
                                if (response.data.status) {
                                    message.success("Амжилттай");
                                    setAddModal(null);
                                    add.resetFields();
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
                    <Form.Item
                        label="Нэр"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "нэр оруулна уу!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Утасны дугаар"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Утасны дугаар оруулна уу!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Email оруулна уу!",
                            },
                        ]}
                    >
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item
                        label="Эрх"
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: "Эрх сонгоно уу!",
                            },
                        ]}
                    >
                        <Select>
                            <Option value="student">Сурагч</Option>
                            <Option value="teacher">Багш</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Нууц үг"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Нууц үг оруулна уу!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Нууц үг давтах"
                        name="password_confirmation"
                        rules={[
                            {
                                required: true,
                                message: "Нууц үг оруулна уу!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default Users;
