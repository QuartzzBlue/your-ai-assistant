import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Layout, List, Input, Button, Row, Col, Avatar, Dropdown } from "antd";
import { BulbOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import savedState from '../atoms/savedState'
import sessionKeyState from '../atoms/sessionKeyState' 
import iconImage from '../img/ai_icon.png'
import "../css/chat.css";
const { Content } = Layout;
const { TextArea } = Input;


export default function Chat() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  //* [TODO] 챗 가이드 제공하기 */
  // const guides = [{
  //   key: '1',
  //   label: '구글이 제공하는 검색 서비스의 장점은 무엇인가요?'
  // },
  // {
  //   key: '2',
  //   label: '구글 드라이브는 어떤 서비스이며 어떤 기능을 제공하나요?'
  // },
  // {
  //   key: '3',
  //   label: 'Google Cloud Platform은 어떤 서비스를 제공하며 누구에게 유용한가요?'
  // }];

  const initMessages = [
    { content: "안녕하세요, 무엇을 도와드릴까요?", position: "left" }
    // { content: "null", position: "left" },
    // ... 기타 메시지
  ];

  const [messages, setMessages] = useState(() => {
    return initMessages;
  });
  const [inputMessage, setInputMessage] = useState("");
  const saved = useRecoilValue(savedState);
  const sessionKey = useRecoilValue(sessionKeyState);
  const textAreaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(()=> {
    if(saved) {
      setInputMessage("");
      setMessages(initMessages);
      textAreaRef.current.focus();
    } else {
      setInputMessage("먼저 Text Source를 저장해주세요.")
      setMessages([]);
    }
  }, [saved])
  


  const handleSendMessage = async (event) => {
    event.preventDefault();
    setInputMessage("");
    setMessages(prevMessages => [...prevMessages, {content: inputMessage, position: "right" }]);
    await getAIResponse();
  };

  const getAIResponse = () => {
    return new Promise((resolve, reject) => {
      const data = {
        question: inputMessage,
        sessionKey
      };
      setMessages(prevMessages => [...prevMessages, {content: "null", position: "left" }]);
      axios.post(baseUrl + '/completion', data)
        .then(response => {
          setMessages(prevMessages => {
            prevMessages.pop();
            return [...prevMessages, {content: response.data.response.content, position: "left" }]});
          scrollToBottom();
          resolve();
        })
        .catch(error => {
          console.log(error);
          reject(error)
        });
    })
  }

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
                  <div className={["message-bubble", item.position === "right" ? "right" : "left"].join(" ")}> 
                    { item.content === 'null' ? <div className="loader"/> : item.content }
                  </div>
                </Col>
              </Row>
            )}
          />
          <div ref={messagesEndRef}></div>
          
        </Content>
        {/* <Dropdown menu={{ guides, }} placement="topRight" arrow  style={{ position: 'absolute' }}> */}
          {/* <Button type="primary" shape="circle" icon={<BulbOutlined />} size='large' style={{ position: 'absolute', bottom: '20px', right: '20px'}}/>
        </Dropdown> */}
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
