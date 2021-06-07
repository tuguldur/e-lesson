import React, { useEffect, useState } from "react";
import { Row, Col, message, Card, Empty } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
    const { Meta } = Card;
    const [state, setState] = useState(null);
    const get = () => {
        axios
            .get("/lessons")
            .then((response) => {
                if (response.data.status) {
                    setState(response.data.data);
                }
            })
            .catch(() => message.error("Алдаа гарлаа"));
    };
    useEffect(() => get(), []);
    return (
        <div className="home">
            <Row gutter={[16, 16]}>
                {state?.length > 0 ? (
                    state.map((lesson) => (
                        <Col span={5} key={lesson.id}>
                            <Link to={"/view/" + lesson.id}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt="lesson cover"
                                            src={"/" + lesson.owner.avatar}
                                        />
                                    }
                                >
                                    <Meta
                                        title={lesson.name}
                                        description={lesson.description}
                                    />
                                </Card>
                            </Link>
                        </Col>
                    ))
                ) : (
                    <Col span={24}>
                        <Empty />
                    </Col>
                )}
            </Row>
        </div>
    );
};
export default Home;
