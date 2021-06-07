import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Card,
    PageHeader,
    message,
    Divider,
    Menu,
    Avatar,
    Popover,
    Button,
} from "antd";
import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
const View = (props) => {
    const history = useHistory();
    const { id } = props.match.params;
    const [state, setState] = useState(null);
    const [episodes, setEpisodes] = useState(null);
    const [current, setCurrent] = useState(0);
    const get = () => {
        axios
            .get("/lessons/" + id)
            .then((response) => {
                if (response.data.status) {
                    setState(response.data.data);
                    setEpisodes(response.data.episode);
                }
            })
            .catch(() => message.error("Tа энэ хичээлд хандах эрхгүй байна."));
    };
    useEffect(() => get(), []);
    return (
        <div className="view">
            <Row justify="center">
                <Col xs={23} xxl={20}>
                    <Card className="has-header">
                        {state ? (
                            <PageHeader
                                onBack={() => history.push("/")}
                                title={state.name}
                                subTitle={state.description}
                                className="page-header"
                                extra={
                                    <Popover
                                        content={
                                            <div>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Avatar
                                                        size={64}
                                                        src={
                                                            "/" +
                                                            state.owner.avatar
                                                        }
                                                    />
                                                </div>
                                                <Divider />
                                                <p>
                                                    Нэр:{" "}
                                                    <b>{state.owner.name} </b>
                                                </p>
                                                <p>
                                                    Утасны дугаар:{" "}
                                                    <b> {state.owner.phone}</b>
                                                </p>
                                                <p>
                                                    Email:{" "}
                                                    <b> {state.owner.email} </b>
                                                </p>
                                            </div>
                                        }
                                        title="Багш"
                                    >
                                        <Button>
                                            Багш: {state.owner.name}
                                        </Button>
                                    </Popover>
                                }
                            />
                        ) : null}
                        <Divider />
                        <Row gutter={[10, 10]}>
                            {state && episodes?.length > 0 && (
                                <>
                                    <Col xs={24} xl={18}>
                                        <video
                                            id="player"
                                            src={"/" + episodes[current].video}
                                            controls
                                        />
                                    </Col>
                                    <Col xs={24} xl={6}>
                                        <Menu
                                            defaultSelectedKeys={[
                                                current.toString(),
                                            ]}
                                            onClick={(e) =>
                                                setCurrent(Number(e.key))
                                            }
                                            mode="vertical"
                                        >
                                            {episodes.map((episode, index) => (
                                                <Menu.Item
                                                    key={index}
                                                    icon={
                                                        current === index ? (
                                                            <PauseCircleOutlined />
                                                        ) : (
                                                            <PlayCircleOutlined />
                                                        )
                                                    }
                                                >
                                                    Хичээл {index + 1}{" "}
                                                    {episode.name}
                                                </Menu.Item>
                                            ))}
                                        </Menu>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default View;
