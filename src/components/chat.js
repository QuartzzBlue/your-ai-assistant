import React, { useState } from "react";
import { Card, Layout, List, Input, Button, Row, Col } from "antd";
import "../css/chat.css";
const { Content } = Layout;
const { TextArea } = Input;

const messages = [
  { id: 1, content: "안녕하세요?", position: "right" },
  { id: 2, content: "안녕하세요! 잘 지내셨나요?", position: "left" },
  // ... 기타 메시지
];

export default function Chat() {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    // 메시지 전송 로직 구현
  };

  return (
    <Card title="Customized Chatbot">
    <Layout className="chat-container">
      <Content className="chat-content">
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <Row
              justify={item.position === "right" ? "end" : "start"}
              style={{ marginBottom: 8 }}
            >
              <Col>
                <div
                  className={["message-bubble",
                    item.position === "right"
                      ? "right"
                      : "left"
                  ].join(" ")}
                >
                  {item.content}
                </div>
              </Col>
            </Row>
          )}
        />
      </Content>
      <Row gutter={[8, 0]} className="chat-input-container">
        <Col flex={6}>
          <TextArea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onPressEnter={handleSendMessage}
            autoSize={{ minRows: 2, maxRows: 2 }}
          />
        </Col>
        <Col flex={1}>
          <Button onClick={handleSendMessage} className="blue-6 send-button">SEND</Button>
        </Col>
      </Row>
    </Layout>
    </Card>
  );
}
