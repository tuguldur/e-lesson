import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Card,
    message,
    Table,
    Spin,
    Modal,
    Button,
    Input,
    Space,
    Form,
    Popconfirm,
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Errors from "@/components/errors";
const { Search } = Input;
const Lesson = () => {
    const [state, setState] = useState(null);
    const [edit, setEdit] = useState(null);
    const [search, setSearch] = useState(null);
    const [errors, setErrors] = useState(null);
    const [modal, setModal] = useState(false);
    const [form] = Form.useForm();
    const get = () => {
        setState(null);
        setSearch(null);
        axios
            .get("/teacher/lessons")
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
    const columns = [
        {
            title: "Нэр",
            dataIndex: "name",
        },

        {
            title: "Tайлбар",
            dataIndex: "description",
        },
        {
            title: "Огноо",
            dataIndex: "created_at",
            render: (text) => moment(text).fromNow(),
        },
        {
            title: "",
            render: (text, record) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => {
                            setEdit(record);
                            setModal(true);
                        }}
                    >
                        Засах
                    </Button>
                    <Popconfirm
                        title="Энэ хичээлийг устгах уу?"
                        onConfirm={() => {
                            axios.delete("/teacher/lessons/" + record.id);
                            get();
                        }}
                    >
                        <Button type="link" danger>
                            Устгах
                        </Button>
                    </Popconfirm>
                    <Link to={"/teacher/lesson/" + record.id}>Үзэх </Link>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        if (!edit) {
            form.resetFields();
        }
        form.setFieldsValue(edit);
    }, [form, edit]);
    useEffect(() => get(), []);
    return (
        <>
            <div className="lesson">
                <Row justify="center">
                    <Col xs={23} md={20} xl={18} xxl={16}>
                        <Card
                            title="Хичээлүүд"
                            extra={
                                <Space>
                                    <Search
                                        placeholder="Өгөгдөл хайх"
                                        onSearch={(data) => {
                                            if (data) {
                                                setSearch(
                                                    state.filter(
                                                        (lesson) =>
                                                            lesson.name
                                                                .toLowerCase()
                                                                .includes(
                                                                    data.toLowerCase()
                                                                ) ||
                                                            lesson.description
                                                                .toLowerCase()
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

                                    {state && (
                                        <Button
                                            type="primary"
                                            onClick={() => setModal(true)}
                                        >
                                            Хичээл нэмэх
                                        </Button>
                                    )}
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
                visible={modal}
                onCancel={() => setModal(false)}
                onOk={() => form.submit()}
                title={`Хичээл ${edit ? "засах" : "нэмэх"}`}
                forceRender
            >
                {errors && <Errors errors={errors} />}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        setErrors(null);
                        axios
                            .post(
                                `/teacher/lessons/${edit ? edit.id : "add"}`,
                                { ...values }
                            )
                            .then((response) => {
                                if (response.data.status) {
                                    message.success("Амжилттай");
                                    setModal(null);
                                    form.resetFields();
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
                        label="Tайлбар"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "тайлбар оруулна уу!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default Lesson;
