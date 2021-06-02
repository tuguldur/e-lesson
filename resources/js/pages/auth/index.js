import React, { useState, useContext } from "react";
import { Card, Row, Col, Form, Input, Checkbox, Button } from "antd";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import Errors from "@/components/errors";
import { Global } from "@/context/global";
const Auth = () => {
    const history = useHistory();
    const [errors, setErrors] = useState(null);
    const [form] = Form.useForm();
    const { data } = useContext(Global);
    return (
        <div className="auth">
            {!data.props.auth.user ? (
                <Row justify="center" align="middle">
                    <Col xs={24} sm={16} md={12} lg={10} xl={8} xxl={6}>
                        <Card title="Нэвтрэх">
                            {errors && <Errors errors={errors} />}
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={(values) => {
                                    setErrors(null);
                                    axios
                                        .post("/login", { ...values })
                                        .then((response) => {
                                            if (response.data.status) {
                                                window.location.href = "/";
                                            }
                                        })
                                        .catch((err) => {
                                            if (err.response.data.errors) {
                                                setErrors(
                                                    err.response.data.errors
                                                );
                                            }
                                        });
                                }}
                                requiredMark={false}
                            >
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
                                    <Input
                                        placeholder="Email"
                                        size="large"
                                        type="email"
                                    />
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
                                    <Input.Password
                                        placeholder="Нууц үг"
                                        size="large"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                >
                                    <Row justify="space-between">
                                        <Checkbox>Сануулах</Checkbox>
                                        <Link to="/auth/forgot">
                                            Нууц үг сэргээх
                                        </Link>
                                    </Row>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        block
                                        htmlType="submit"
                                    >
                                        Нэвтрэх
                                    </Button>
                                </Form.Item>
                                <Form.Item
                                    style={{
                                        textAlign: "center",
                                        marginBottom: 0,
                                    }}
                                >
                                    <Link to="/auth/signup">Бүртгүүлэх</Link>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Redirect to="/" />
            )}
        </div>
    );
};
export default Auth;
