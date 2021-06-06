import React, { useState, useContext } from "react";
import {
    Card,
    Row,
    Col,
    Form,
    Input,
    Button,
    Divider,
    message,
    Upload,
    Avatar,
    Space,
} from "antd";
import { Global } from "@/context/global";
import Errors from "@/components/errors";
import axios from "axios";
import moment from "moment";
import ImgCrop from "antd-img-crop";
const Settings = () => {
    const [tab, setTab] = useState("information");
    const { data } = useContext(Global);
    const [errors, setErrors] = useState(null);
    const [password] = Form.useForm();
    const setFileValue = (info, field) => {
        if (info.file.status === "done") {
            message.success(`Зураг солигдлоо.`);
        } else if (info.file.status === "error") {
            message.error(`Хүсэлт амжилтгүй.`);
        }
    };
    const contents = {
        teacher: (
            <>
                {errors && <Errors errors={errors} />}
                <Form
                    layout="vertical"
                    onFinish={(values) => {
                        setErrors(null);
                        axios
                            .post("/account/teacher", { ...values })
                            .then((response) => {
                                if (response.data.status) {
                                    message.success("Амжилттай");
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
                        label="Tовч танилцуулга"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Tовч танилцуулга оруулна уу!",
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            block
                            htmlType="submit"
                            type="primary"
                            size="large"
                            shape="round"
                        >
                            Хадгалах
                        </Button>
                    </Form.Item>
                </Form>
            </>
        ),
        information: (
            <>
                {errors && <Errors errors={errors} />}
                <div className="settings-avatar">
                    <Space>
                        <img src={"storage/" + data.props.auth.user.avatar} />
                        <ImgCrop aspect={3 / 4}>
                            <Upload
                                action="/account/avatar"
                                maxCount={1}
                                accept="image/*"
                                name="avatar"
                                headers={{
                                    "X-CSRF-Token": document.head.querySelector(
                                        'meta[name="csrf-token"]'
                                    ).content,
                                }}
                                onChange={(info) =>
                                    setFileValue(info, "avatar")
                                }
                            >
                                <Button>Зураг солих</Button>
                            </Upload>
                        </ImgCrop>
                    </Space>
                </div>

                <Form
                    initialValues={data.props.auth.user}
                    layout="vertical"
                    hideRequiredMark
                    onFinish={(values) => {
                        setErrors(null);
                        axios
                            .post("/account/information", { ...values })
                            .then((response) => {
                                if (response.data.status) {
                                    message.success("Амжилттай");
                                }
                            })
                            .catch((err) => {
                                if (err.response.data.errors) {
                                    setErrors(err.response.data.errors);
                                }
                            });
                    }}
                >
                    <Form.Item label="Email" name="email">
                        <Input size="large" placeholder="Email" disabled />
                    </Form.Item>
                    <Form.Item
                        label="Нэр"
                        name="name"
                        rules={[
                            { required: true, message: "Нэрээ оруулна уу!" },
                        ]}
                    >
                        <Input size="large" placeholder="Нэр" />
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
                        <Input size="large" placeholder="Утасны дугаар" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            block
                            htmlType="submit"
                            type="primary"
                            size="large"
                            shape="round"
                        >
                            Хадгалах
                        </Button>
                    </Form.Item>
                </Form>
            </>
        ),
        security: (
            <>
                <h3>Нууц үг солих хэсэг</h3>
                <Divider />
                <Form
                    form={password}
                    layout="vertical"
                    hideRequiredMark
                    onFinish={(values) => {
                        setErrors(null);
                        if (values.new_password === values.confirm_password) {
                            axios
                                .post("/account/password", { ...values })
                                .then((response) => {
                                    if (response.data.status) {
                                        message.success("Амжилттай");
                                    } else {
                                        message.error(response.data.msg);
                                    }
                                    password.resetFields();
                                })
                                .catch((err) => {
                                    if (err.response.data.errors) {
                                        setErrors(err.response.data.errors);
                                    }
                                });
                        } else {
                            message.error("Давтах нууц үгээ зөв оруулна уу.");
                            password.resetFields();
                        }
                    }}
                >
                    <Form.Item
                        label="Одоо ашиглаж буй нууц үг"
                        name="current_password"
                        rules={[
                            {
                                required: true,
                                message: "Одоо ашиглаж буй нууц үг оруулна уу!",
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            placeholder="Одоо ашиглаж буй нууц үг"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Шинэ нууц үг"
                        name="new_password"
                        rules={[
                            {
                                required: true,
                                message: "Шинэ нууц үг оруулна уу!",
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            placeholder="Шинэ нууц үг"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Шинэ нууц үг давтах"
                        name="confirm_password"
                        rules={[
                            {
                                required: true,
                                message: "Шинэ нууц үг давтаж оруулна уу!",
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            placeholder="Шинэ нууц үг давтах"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            block
                            htmlType="submit"
                            type="primary"
                            size="large"
                            shape="round"
                        >
                            Хадгалах
                        </Button>
                    </Form.Item>
                </Form>
            </>
        ),
    };

    return (
        <div className="settings">
            <Row justify="center" align="middle">
                <Col xs={23} md={16} xl={12} xxl={12}>
                    <Card
                        tabList={
                            data.props.auth.user.role === "teacher"
                                ? [
                                      {
                                          key: "information",
                                          tab: "Mэдээлэл",
                                      },
                                      {
                                          key: "teacher",
                                          tab: "Багшийн мэдээлэл",
                                      },
                                      {
                                          key: "security",
                                          tab: "Аюулгүй байдал",
                                      },
                                  ]
                                : [
                                      {
                                          key: "information",
                                          tab: "Mэдээлэл",
                                      },
                                      {
                                          key: "security",
                                          tab: "Аюулгүй байдал",
                                      },
                                  ]
                        }
                        activeTabKey={tab}
                        onTabChange={(key) => setTab(key)}
                        tabBarExtraContent={
                            <span>
                                {moment(
                                    data.props.auth.user.updated_at
                                ).fromNow()}{" "}
                                зассан
                            </span>
                        }
                    >
                        {data.props.auth.user && contents[tab]}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default Settings;
