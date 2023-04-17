import './css/App.css';
import './css/common.css';
import { Layout, Menu, theme, Avatar, Row, Col, Typography, Alert } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import React from 'react';
import Textbox from './components/textbox'
import Chatarea from './components/chat'
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Typography>
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
      <Alert
        style={{ margin : '30px 50px 0 50px'}}
        message="Informational Notes"
        description="Additional description and information about copywriting."
        type="info"
        showIcon closable
      />
      <Content style={{ padding: '30px 50px 20px 50px', height: '100%'}}>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
            height: '100%'
          }}
        >
          <Row flex="1" justify="center"> 
            <Col flex="1 1 400px" style={{ padding: '0 30px 30px 30px' }}>
              <Title level={3}>Text Source</Title>
              <Textbox />
            </Col>
            <Col flex="1 1 400px" style={{ padding: '0 30px 30px 30px' }}>
              <Title level={3}>AI Chatbot</Title>
              <Chatarea />
            </Col>
          </Row>
        </div>
      </Content>
      <Footer
        style={{ textAlign: 'center' }}>
        Your Customizing AI Chatbot<br/>
        Ant Design ©2023 Created by Ant UED
      </Footer>
      </Typography>
    </Layout>
  );
}

export default App;
