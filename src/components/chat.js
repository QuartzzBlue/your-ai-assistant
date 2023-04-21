import React, { useState, useEffect, useRef } from "react";
import { Layout, List, Input, Button, Row, Col, Avatar } from "antd";
import { useRecoilValue } from 'recoil';
import savedState from '../atoms/savedState'
import iconImage from '../img/ai_icon.png'
import "../css/chat.css";
const { Content } = Layout;
const { TextArea } = Input;


export default function Chat() {
  const initMessages = [
    { content: "안녕하세요, 무엇을 도와드릴까요?", position: "left" },
    { content: "안녕하세요! 잘 지내셨나요?", position: "right" },
    // { content: "null", position: "left" },
    // ... 기타 메시지
  ];

  const [messages, setMessages] = useState(() => {
    return initMessages;
  });
  
  const saved = useRecoilValue(savedState);
  const textAreaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(()=> {
    if(saved) {
      setInputMessage("")
      textAreaRef.current.focus();
    } else {
      setInputMessage("먼저 Text Source를 저장해주세요.")
    }
  }, [saved])
  
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    const prevMessages = messages;
    // [TO-DO] 메시지 전송 로직 구현
    setMessages([...prevMessages, {content: "null", position: "left" }]);
    setTimeout(() => {
      setMessages([...prevMessages, {content: "네 잘 지냈어요!", position: "left" }]);
    }, 3000);
    scrollToBottom();
  };

  return (
    <>
      <Layout className="chat-layout">
        <Content className="chat-content" style={{ height: '600px' }}>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(item) => (
              <Row
                justify={item.position === "right" ? "end" : "start"}
                align="middle"
                style={{ marginBottom: 8 }}
              >
                <Col style={{display: 'flex', alignItems: 'center'}}>
                { item.position === "left" && <Avatar src={iconImage } style={{marginRight: '10px'}}/> }
                
                  <div
                    className={["message-bubble",
                      item.position === "right"
                        ? "right"
                        : "left"
                    ].join(" ")}
                  > 
                    { item.content === 'null' ? <div className="loader"/> : item.content }
                  </div>
                </Col>
              </Row>
            )}
          />
          <div ref={messagesEndRef}></div>
        </Content>
        
      </Layout>
      <Row gutter={[8, 0]} className="chat-input-container">
          <Col flex={6}>
            <TextArea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onPressEnter={handleSendMessage}
              autoSize={{ minRows: 2, maxRows: 2 }}
              disabled={!saved}
              ref={textAreaRef}
            />
          </Col>
          <Col flex={1}>
            <Button onClick={handleSendMessage} className="blue-6 send-button" disabled={!saved}>SEND</Button> 
          </Col>
        </Row>
    </>
  );
}
