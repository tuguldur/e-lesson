import React, { useContext } from "react";
import { Row, Col, Menu, Button, Popconfirm } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { Global } from "@/context/global";
import axios from "axios";
const Header = () => {
    const location = useLocation();
    const { data } = useContext(Global);

    return (
        <header id="header">
            <Row justify="space-between">
                <Col>
                    <h1>
                        <div className="logo">
                            <Link to="/">Нүүр</Link>
                        </div>
                    </h1>
                </Col>
                <Col className="header-row">
                    <div className="menu-item">
                        {!data.props.auth.user ? (
                            <Menu
                                mode="horizontal"
                                activeKey={location.pathname}
                            >
                                <Menu.Item key="/auth/login">
                                    <Link to="/auth/login">Нэвтрэх</Link>
                                </Menu.Item>
                                <Menu.Item key="/auth/signup">
                                    <Link to="/auth/signup">Бүртгүүлэх</Link>
                                </Menu.Item>
                            </Menu>
                        ) : (
                            <>
                                <Menu
                                    mode="horizontal"
                                    activeKey={location.pathname}
                                >
                                    <Menu.Item key="/settings">
                                        <Link to="/settings">
                                            {data.props.auth.user.name}
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                                <div className="user-action">
                                    <Popconfirm
                                        title="Системээс гарахдаа итгэлтэй байна уу?"
                                        onConfirm={() => {
                                            axios
                                                .post("/logout")
                                                .then(() =>
                                                    window.location.reload()
                                                );
                                        }}
                                        okText="Tийм"
                                        cancelText="Үгүй"
                                    >
                                        <Button
                                            className="logout"
                                            shape="circle"
                                            icon={<PoweroffOutlined />}
                                        />
                                    </Popconfirm>
                                </div>
                            </>
                        )}
                    </div>
                </Col>
            </Row>
        </header>
    );
};
export default Header;
