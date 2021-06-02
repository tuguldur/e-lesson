import React, { useState, useContext } from "react";
import {
    Card,
    Row,
    Col,
    Form,
    Input,
    PageHeader,
    Button,
    Divider,
    message,
} from "antd";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import Errors from "@/components/errors";
import { Global } from "@/context/global";
const Forgot = () => {
    const history = useHistory();
    const [errors, setErrors] = useState(null);
    const [form] = Form.useForm();
    const { data } = useContext(Global);

    return (
        <div className="auth">
            {!data.props.auth.user ? (
                <Row justify="center" align="middle">
                    <Col xs={24} sm={16} md={12} lg={10} xl={8} xxl={6}>
                        <Card>
                            <PageHeader
                                onBack={() => history.push("/auth/login")}
                                title="Нууц үг сэргээх"
                                className="auth-header"
                            />
                            <Divider />
                            {errors && <Errors errors={errors} />}
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={(values) => {
                                    setErrors(null);
                                    axios
                                        .post("/forgot-password", { ...values })
                                        .then((response) => {
                                            if (response.data.status) {
                                                message.success(
                                                    "Нууц үг сэргээх холбоос илгээлээ та email хаягаа шалгана уу."
                                                );
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
                                    style={{
                                        marginBottom: 0,
                                    }}
                                >
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <Button block>
                                                <Link to="/auth/login">
                                                    Буцах
                                                </Link>
                                            </Button>
                                        </Col>
                                        <Col span={12}>
                                            <Button
                                                type="primary"
                                                block
                                                htmlType="submit"
                                            >
                                                Сэргээх
                                            </Button>
                                        </Col>
                                    </Row>
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
export default Forgot;
