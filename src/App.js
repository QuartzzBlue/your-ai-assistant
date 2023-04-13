import './css/App.css';
import './css/common.css';
import { Layout, Menu, theme, Avatar, Row, Col } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import React from 'react';
import Textbox from './components/textbox'
import Chatarea from './components/chat'
const { Header, Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'white', fontSize: '1.5rem' }}>
          AI Chatbot 🧐
        </div>
      <Menu theme="dark" mode="horizontal" selectable={false}>
        <Menu.Item key="1" icon={<Avatar icon={<UserOutlined />} />}>
          User
        </Menu.Item>
        {/* <Menu.Item key="1" icon={<Avatar icon={<LogoutOutlined />} />}>
          로그아웃
        </Menu.Item> */}
      </Menu>
    </Header>
      <Content style={{ padding: '50px 50px 20px 50px'}}>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col flex="1 1 400px"><Textbox /></Col>
            <Col flex="1 1 400px"><Chatarea /></Col>
          </Row>
        </div>
      </Content>
      <Footer
        style={{ textAlign: 'center' }}>
        Your Customizing AI Chatbot<br/>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
